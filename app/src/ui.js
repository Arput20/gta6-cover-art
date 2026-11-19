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

  let currentPhoto = null;
  let currentLayout = LAYOUTS['3-panel-split'];
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

    renderPanels(targetCtx, w, h, currentPhoto, currentLayout, zoomLevel, 0, 0);
    applyColourGrade(targetCtx, w, h, gradeIntensity, currentGrade);
    renderCaption(targetCtx, w, h, captionInput.value, {
      fontSize: h * 0.11,
      posY: h * 0.9,
      letterSpacing: 2
    });
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
