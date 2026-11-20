// Computes and draws multi-panel poster layouts (3-5 angled panels) with precision weights
export const LAYOUTS = {
  '3-panel-split': [
    { points: [[0,0], [0.66,0], [0.54,1], [0,1]], weight: 1.1 },
    { points: [[0.69,0], [1,0], [1,0.66], [0.57,0.66]], weight: 0.65 },
    { points: [[0.60,0.69], [1,0.69], [1,1], [0.54,1]], weight: 0.45 }
  ],
  '4-panel-grid': [
    { points: [[0,0], [0.48,0], [0.45,0.52], [0,0.48]], weight: 0.5 },
    { points: [[0.52,0], [1,0], [1,0.48], [0.55,0.52]], weight: 0.5 },
    { points: [[0,0.52], [0.45,0.52], [0.42,1], [0,1]], weight: 0.5 },
    { points: [[0.55,0.52], [1,0.48], [1,1], [0.48,1]], weight: 0.5 }
  ],
  '3-panel-slant': [
    { points: [[0,0], [0.39,0], [0.27,1], [0,1]], weight: 0.38 },
    { points: [[0.42,0], [0.73,0], [0.61,1], [0.30,1]], weight: 0.38 },
    { points: [[0.76,0], [1,0], [1,1], [0.64,1]], weight: 0.32 }
  ],
  'single': [
    { points: [[0,0], [1,0], [1,1], [0,1]], weight: 1.0 }
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
