// UI controller wiring inputs, controls, canvas rendering and events
import { LAYOUTS } from './poster-layout.js';
import { renderPanels } from './panel-crop.js';
import { applyColourGrade } from './colour-grade.js';
import { renderCaption } from './caption-lettering.js';
import { exportCoverImage } from './png-export.js';
import { PRESETS } from './presets.js';
import { runShot } from './shots.js';

export function initUI() {
  const canvas = document.getElementById('cover');
  const captionInput = document.getElementById('caption');
  const layoutSelect = document.getElementById('layout-select');
  const presetSelect = document.getElementById('preset-select');
  const gradeSlider = document.getElementById('grade-slider');
  const zoomSlider = document.getElementById('zoom-slider');
  const statusEl = document.getElementById('status');
  const photoInput = document.getElementById('photo-input');
  const demoBtn = document.getElementById('demo-btn');
  const exportSquareBtn = document.getElementById('export-square');
  const exportStoryBtn = document.getElementById('export-story');
  const exportLandscapeBtn = document.getElementById('export-landscape');

  let currentPhoto = new Image();
  currentPhoto.onload = () => redraw();
  currentPhoto.src = 'assets/demo-photo.jpg';

  let currentLayout = LAYOUTS['4-panel-grid'];
  let currentGrade = 'sunset';
  let gradeIntensity = 0.8;
  let zoomLevel = 1.0;

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  function render(targetCtx = canvas.getContext('2d'), w = canvas.width, h = canvas.height) {
    targetCtx.fillStyle = '#0f0a1a';
    targetCtx.fillRect(0, 0, w, h);

    if (!currentPhoto || !currentPhoto.complete || currentPhoto.naturalWidth === 0) {
      const skyGrad = targetCtx.createLinearGradient(0, 0, 0, h * 0.72);
      skyGrad.addColorStop(0, '#2d0c44');
      skyGrad.addColorStop(0.5, '#ff2a85');
      skyGrad.addColorStop(1, '#ff8c00');
      targetCtx.fillStyle = skyGrad;
      targetCtx.fillRect(0, 0, w, h * 0.72);

      targetCtx.fillStyle = '#ffebaa';
      targetCtx.beginPath();
      targetCtx.arc(w / 2, h * 0.35, h * 0.15, 0, Math.PI * 2);
      targetCtx.fill();
    }

    renderPanels(targetCtx, w, h, currentPhoto && currentPhoto.complete && currentPhoto.naturalWidth > 0 ? currentPhoto : null, currentLayout, zoomLevel, 0, 0);
    applyColourGrade(targetCtx, w, h, gradeIntensity, currentGrade);

    // Bottom title band with slight skew
    targetCtx.save();
    targetCtx.fillStyle = 'rgba(15, 10, 26, 0.85)';
    targetCtx.fillRect(0, h * 0.78, w, h * 0.22);
    targetCtx.fillStyle = '#00f0ff';
    targetCtx.fillRect(0, h * 0.78, w, 4);
    targetCtx.fillStyle = '#ff2a85';
    targetCtx.fillRect(0, h * 0.78 + 4, w, 2);
    targetCtx.restore();

    // Render caption with slight skew and tight tracking
    targetCtx.save();
    targetCtx.transform(1, 0, -0.04, 1, 0, 0);
    renderCaption(targetCtx, w, h, captionInput.value, {
      fontSize: h * 0.115,
      posY: h * 0.89,
      letterSpacing: -1
    });
    targetCtx.restore();

    // Thin inner frame
    targetCtx.save();
    targetCtx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    targetCtx.lineWidth = 6;
    targetCtx.strokeRect(12, 12, w - 24, h - 24);
    targetCtx.strokeStyle = '#00f0ff';
    targetCtx.lineWidth = 2;
    targetCtx.strokeRect(16, 16, w - 32, h - 32);
    targetCtx.restore();

    // Film grain overlay
    targetCtx.save();
    targetCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < (w * h) / 120; i++) {
      const gx = Math.random() * w;
      const gy = Math.random() * h;
      targetCtx.fillRect(gx, gy, 1.5, 1.5);
    }
    targetCtx.restore();
  }

  function redraw() {
    render();
  }

  // Event Listeners
  captionInput.addEventListener('input', redraw);
  
  layoutSelect.addEventListener('change', (e) => {
    currentLayout = LAYOUTS[e.target.value] || LAYOUTS['3-panel-split'];
    redraw();
  });

  presetSelect.addEventListener('change', (e) => {
    const pKey = e.target.value;
    const p = PRESETS[pKey];
    if (p) {
      currentGrade = p.gradePreset;
      gradeIntensity = p.intensity;
      currentLayout = LAYOUTS[p.layout] || currentLayout;
      layoutSelect.value = p.layout;
      gradeSlider.value = gradeIntensity;
      captionInput.value = p.caption;
      redraw();
    }
  });

  gradeSlider.addEventListener('input', (e) => {
    gradeIntensity = parseFloat(e.target.value);
    redraw();
  });

  zoomSlider.addEventListener('input', (e) => {
    zoomLevel = parseFloat(e.target.value);
    redraw();
  });

  photoInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      currentPhoto = await loadImage(URL.createObjectURL(file));
      statusEl.textContent = 'Photo loaded successfully.';
      redraw();
    } catch (err) {
      statusEl.textContent = 'Failed to load photo.';
    }
  });

  demoBtn.addEventListener('click', async () => {
    try {
      currentPhoto = await loadImage('assets/demo-photo.jpg');
      statusEl.textContent = 'Demo photo loaded.';
      redraw();
    } catch (err) {
      statusEl.textContent = 'Failed to load demo photo.';
    }
  });

  exportSquareBtn.addEventListener('click', () => {
    exportCoverImage(render, 1080, 1080, 'cover-1080x1080.png');
    statusEl.textContent = 'Exported 1080x1080 PNG';
  });

  exportStoryBtn.addEventListener('click', () => {
    exportCoverImage(render, 1080, 1350, 'cover-1080x1350.png');
    statusEl.textContent = 'Exported 1080x1350 PNG';
  });

  exportLandscapeBtn.addEventListener('click', () => {
    exportCoverImage(render, 1920, 1080, 'cover-1920x1080.png');
    statusEl.textContent = 'Exported 1920x1080 PNG';
  });

  // Handle URL screenshot query / shots
  const params = new URLSearchParams(location.search);
  const shot = params.get('shot');
  if (shot) {
    runShot(shot, params, async (sample, text) => {
      try {
        currentPhoto = await loadImage(sample);
        captionInput.value = text;
        redraw();
      } catch (e) {
        redraw();
      }
    });
  } else {
    // Load demo by default
    loadImage('assets/demo-photo.jpg').then(img => {
      currentPhoto = img;
      redraw();
    }).catch(() => redraw());
  }
}
