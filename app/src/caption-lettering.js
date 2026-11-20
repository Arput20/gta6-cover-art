// caption-lettering.js: Bold GTA-style title band lettering with tight tracking, skew, and outline

export function drawCaption(ctx, width, height, text, options = {}) {
  if (!text) text = 'SUNSET HEIST';
  const fontSize = options.fontSize || Math.round(width * 0.12);
  const x = options.x || width * 0.08;
  const y = options.y || height * 0.88;
  const skew = options.skew || -0.08;

  ctx.save();
  ctx.translate(x, y);
  ctx.transform(1, 0, skew, 1, 0, 0);

  ctx.font = `900 ${fontSize}px Impact, 'Arial Black', sans-serif`;
  ctx.textBaseline = 'alphabetic';

  // Draw thick dark outline / shadow
  ctx.lineWidth = Math.max(6, fontSize * 0.12);
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#ffffff';

  // Multi-pass stroke for solid GTA outline
  ctx.strokeText(text, 0, 0);
  ctx.fillText(text, 0, 0);

  // Inner gradient fill or bright yellow/white highlight
  const grad = ctx.createLinearGradient(0, -fontSize, 0, 0);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.5, '#ffee55');
  grad.addColorStop(1, '#ff8822');
  ctx.fillStyle = grad;
  ctx.fillText(text, 0, 0);

  ctx.restore();
}
