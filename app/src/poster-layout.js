// Computes and draws multi-panel poster layouts (3-5 angled panels)
export const LAYOUTS = {
  '3-panel-split': [
    { points: [[0,0], [0.65,0], [0.55,1], [0,1]], weight: 1 },
    { points: [[0.68,0], [1,0], [1,0.65], [0.58,0.65]], weight: 0.6 },
    { points: [[0.61,0.68], [1,0.68], [1,1], [0.55,1]], weight: 0.4 }
  ],
  '4-panel-grid': [
    { points: [[0,0], [0.48,0], [0.45,0.52], [0,0.48]], weight: 0.5 },
    { points: [[0.52,0], [1,0], [1,0.48], [0.55,0.52]], weight: 0.5 },
    { points: [[0,0.52], [0.45,0.52], [0.42,1], [0,1]], weight: 0.5 },
    { points: [[0.55,0.52], [1,0.48], [1,1], [0.48,1]], weight: 0.5 }
  ],
  '3-panel-slant': [
    { points: [[0,0], [0.38,0], [0.28,1], [0,1]], weight: 0.35 },
    { points: [[0.41,0], [0.72,0], [0.62,1], [0.31,1]], weight: 0.35 },
    { points: [[0.75,0], [1,0], [1,1], [0.65,1]], weight: 0.3 }
  ],
  'single': [
    { points: [[0,0], [1,0], [1,1], [0,1]], weight: 1 }
  ]
};

export function drawPanelPolygon(ctx, w, h, normPoints) {
  ctx.beginPath();
  const first = normPoints[0];
  ctx.moveTo(first[0] * w, first[1] * h);
  for (let i = 1; i < normPoints.length; i++) {
    const p = normPoints[i];
    ctx.lineTo(p[0] * w, p[1] * h);
  }
  ctx.closePath();
}
