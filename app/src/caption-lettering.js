// Renders bold condensed caption lettering with letter-spacing, shadows and outlines
export function renderCaption(ctx, w, h, captionText, options = {}) {
  const {
    fontSize = h * 0.115,
    textColor = '#ffffff',
    outlineColor = '#0a0614',
    posY = h * 0.89,
    letterSpacing = -1.5
  } = options;

  const text = (captionText || 'SUNSET HEIST').trim().toUpperCase();
  if (!text) return;

  ctx.save();
  ctx.font = `bold ${fontSize}px 'Anton', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const chars = text.split('');
  let totalWidth = 0;
  const metrics = chars.map(ch => {
    const m = ctx.measureText(ch);
    const width = m.width + letterSpacing;
    totalWidth += width;
    return width;
  });
  totalWidth -= letterSpacing;

  let startX = (w - totalWidth) / 2;
  
  // Enhanced drop shadow and glow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = fontSize * 0.35;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 7;

  let currentX = startX;
  chars.forEach((ch, i) => {
    const charWidth = metrics[i];
    const x = currentX + charWidth / 2;
    
    // Outline
    ctx.lineWidth = fontSize * 0.13;
    ctx.strokeStyle = outlineColor;
    ctx.strokeText(ch, x, posY);

    // Fill
    ctx.fillStyle = textColor;
    ctx.fillText(ch, x, posY);

    currentX += charWidth;
  });

  ctx.restore();
}
