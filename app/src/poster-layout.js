// poster-layout.js: Panel geometry and layout templates (Key-Art 5-Panel, 4-Panel Grid, Dynamic Trio, Hero Single)

export const LAYOUTS = {
  keyArt: {
    name: 'Key-Art Poster',
    panels: [
      { x: 0.03, y: 0.08, w: 0.31, h: 0.44, angle: -0.015, label: 'THE DRIVER', treatment: 'duotone1' },
      { x: 0.36, y: 0.06, w: 0.30, h: 0.47, angle: 0.0, label: 'THE MECHANIC', treatment: 'halftone' },
      { x: 0.68, y: 0.08, w: 0.29, h: 0.44, angle: 0.015, label: 'THE CAPTAIN', treatment: 'duotone2' },
      { x: 0.03, y: 0.54, w: 0.44, h: 0.26, angle: 0.01, label: 'THE RIDER', treatment: 'ink' },
      { x: 0.49, y: 0.54, w: 0.48, h: 0.26, angle: -0.01, label: 'THE FIXER', treatment: 'duotone1' }
    ]
  },
  grid4: {
    name: '4-Panel Classic',
    panels: [
      { x: 0.02, y: 0.02, w: 0.58, h: 0.54, angle: -0.02, label: 'PANEL 1', treatment: 'duotone1' },
      { x: 0.62, y: 0.02, w: 0.36, h: 0.44, angle: 0.01, label: 'PANEL 2', treatment: 'duotone2' },
      { x: 0.02, y: 0.58, w: 0.38, h: 0.34, angle: 0.015, label: 'PANEL 3', treatment: 'ink' },
      { x: 0.42, y: 0.58, w: 0.56, h: 0.34, angle: -0.01, label: 'PANEL 4', treatment: 'halftone' }
    ]
  },
  trio: {
    name: 'Dynamic Trio',
    panels: [
      { x: 0.03, y: 0.03, w: 0.94, h: 0.50, angle: 0, label: 'HERO', treatment: 'duotone1' },
      { x: 0.03, y: 0.56, w: 0.45, h: 0.36, angle: -0.01, label: 'LEFT', treatment: 'duotone2' },
      { x: 0.51, y: 0.56, w: 0.46, h: 0.36, angle: 0.01, label: 'RIGHT', treatment: 'ink' }
    ]
  },
  solo: {
    name: 'Hero Single',
    panels: [
      { x: 0.02, y: 0.02, w: 0.96, h: 0.90, angle: 0, label: 'SOLO', treatment: 'duotone1' }
    ]
  }
};

export function drawPanelBorder(ctx, x, y, w, h, angle) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  if (angle) ctx.rotate(angle);
  ctx.translate(-(x + w / 2), -(y + h / 2));

  // Warm cream double border
  ctx.strokeStyle = '#e8c08a';
  ctx.lineWidth = 5;
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 12;
  ctx.strokeRect(x, y, w, h);

  ctx.strokeStyle = '#1a0c2e';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 4, y + 4, w - 8, h - 8);

  ctx.restore();
}

export function drawPanelLabel(ctx, x, y, w, h, angle, label) {
  if (!label) return;
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  if (angle) ctx.rotate(angle);
  ctx.translate(-(x + w / 2), -(y + h / 2));

  ctx.font = '700 11px Impact, Arial Black, sans-serif';
  const padX = 6;
  const tw = ctx.measureText(label).width;
  
  ctx.fillStyle = 'rgba(12, 6, 22, 0.95)';
  ctx.strokeStyle = '#e8c08a';
  ctx.lineWidth = 1.5;
  ctx.fillRect(x + 10, y + h - 28, tw + padX * 2, 20);
  ctx.strokeRect(x + 10, y + h - 28, tw + padX * 2, 20);

  ctx.fillStyle = '#ffffff';
  ctx.fillText(label, x + 10 + padX, y + h - 14);
  ctx.restore();
}
