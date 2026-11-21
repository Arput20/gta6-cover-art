// main.js: Wiring up Cover Studio

import { LAYOUTS, drawPanelBorder, drawPanelLabel } from './poster-layout.js';
import { drawCroppedImage } from './panel-crop.js';
import { applyColorGrading } from './colour-grade.js';
import { drawCaption } from './caption-lettering.js';
import { exportPoster } from './png-export.js';
import { PRESETS } from './presets.js';
import { setupUI } from './ui.js';
import { handleShotParam } from './shots.js';

const appState = {
  layout: 'keyArt',
  preset: 'sunsetVice',
  caption: 'SUNSET HEIST',
  activeTab: 'preview',
  sourceImage: null,
  selectedPanel: 0,
  transforms: {
    0: { zoom: 1.0, offsetX: 0, offsetY: 0 },
    1: { zoom: 1.0, offsetX: 0, offsetY: 0 },
    2: { zoom: 1.0, offsetX: 0, offsetY: 0 },
    3: { zoom: 1.0, offsetX: 0, offsetY: 0 },
    4: { zoom: 1.0, offsetX: 0, offsetY: 0 }
  },
  onExport: (w, h) => {
    const canvas = document.getElementById('poster-canvas');
    if (canvas) exportPoster(canvas, w, h, 'sunset-heist-cover.png');
  }
};

function render() {
  const canvas = document.getElementById('poster-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Clear background
  ctx.fillStyle = '#0f081c';
  ctx.fillRect(0, 0, width, height);

  // Get layout panels
  const layoutDef = LAYOUTS[appState.layout] || LAYOUTS.keyArt;
  const presetDef = PRESETS[appState.preset] || PRESETS.sunsetVice;

  // Draw panels
  layoutDef.panels.forEach((pDef, idx) => {
    const panel = {
      x: pDef.x * width,
      y: pDef.y * height,
      w: pDef.w * width,
      h: pDef.h * height,
      angle: pDef.angle || 0
    };
    const transform = appState.transforms[idx] || { zoom: 1, offsetX: 0, offsetY: 0 };
    
    if (appState.sourceImage) {
      drawCroppedImage(ctx, appState.sourceImage, panel, transform);
    } else {
      ctx.fillStyle = '#1e1433';
      ctx.fillRect(panel.x, panel.y, panel.w, panel.h);
    }

    // Apply optional per-panel treatment tint if specified
    if (pDef.treatment === 'duotone1' || pDef.treatment === 'duotone2') {
      ctx.save();
      ctx.translate(panel.x + panel.w / 2, panel.y + panel.h / 2);
      if (panel.angle) ctx.rotate(panel.angle);
      ctx.translate(-(panel.x + panel.w / 2), -(panel.y + panel.h / 2));
      ctx.beginPath();
      ctx.rect(panel.x, panel.y, panel.w, panel.h);
      ctx.clip();
      ctx.fillStyle = pDef.treatment === 'duotone1' ? 'rgba(240, 90, 40, 0.18)' : 'rgba(100, 40, 150, 0.22)';
      ctx.globalCompositeOperation = 'color';
      ctx.fillRect(panel.x, panel.y, panel.w, panel.h);
      ctx.restore();
    }

    drawPanelBorder(ctx, panel.x, panel.y, panel.w, panel.h, panel.angle);

    if (pDef.label) {
      drawPanelLabel(ctx, panel.x, panel.y, panel.w, panel.h, panel.angle, pDef.label);
    }
  });

  // Apply color grading & effects
  applyColorGrading(ctx, width, height, presetDef);

  // Draw title banner / caption / top strip / credits
  drawCaption(ctx, width, height, appState.caption, {
    fontSize: Math.round(width * 0.11),
    x: width * 0.05,
    y: height * 0.70
  });
}

function init() {
  // Handle ?shot= params
  handleShotParam(appState, render);

  // Load default demo photo
  const img = new Image();
  img.onload = () => {
    appState.sourceImage = img;
    render();
  };
  img.src = 'assets/demo-photo.jpg';

  // Setup UI event listeners
  setupUI(appState, render);

  // Initial render
  render();
}

window.addEventListener('DOMContentLoaded', init);
