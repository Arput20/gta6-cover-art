// poster-layout.js: Panel geometry and layout templates (Classic 4-Panel Grid, Diag Split, Trio Panels)

export const LAYOUTS = {
  grid4: {
    name: '4-Panel Classic',
    panels: [
      { x: 0.02, y: 0.02, w: 0.58, h: 0.54, angle: -0.02 },
      { x: 0.62, y: 0.02, w: 0.36, h: 0.44, angle: 0.01 },
      { x: 0.02, y: 0.58, w: 0.38, h: 0.34, angle: 0.015 },
      { x: 0.42, y: 0.58, w: 0.56, h: 0.34, angle: -0.01 }
    ]
  },
  trio: {
    name: 'Dynamic Trio',
    panels: [
      { x: 0.03, y: 0.03, w: 0.94, h: 0.50, angle: 0 },
      { x: 0.03, y: 0.56, w: 0.45, h: 0.36, angle: -0.01 },
      { x: 0.51, y: 0.56, w: 0.46, h: 0.36, angle: 0.01 }
    ]
  },
  solo: {
    name: 'Hero Single',
    panels: [
      { x: 0.02, y: 0.02, w: 0.96, h: 0.90, angle: 0 }
    ]
  }
};

export function drawPanelBorder(ctx, x, y, w, h, angle) {
  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6;
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 12;
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
}
