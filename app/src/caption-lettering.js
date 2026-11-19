// Renders bold condensed caption lettering with letter-spacing, shadows and outlines
export function renderCaption(ctx, w, h, captionText, options = {}) {
  const {
    fontSize = h * 0.11,
    textColor = '#ffffff',
    outlineColor = '#000000',
    posY = h * 0.9,
    letterSpacing = 2
  } = options;

  const text = (captionText || '').trim().toUpperCase();
  if (!text) return;

  ctx.save();
  ctx.font = `bold ${fontSize}px 'Anton', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Handle letter spacing via char measurement if needed or basic positioning
  const chars = text.split('');
  let totalWidth = 0;
  const metrics = chars.map(ch => {
    const m = ctx.measureText(ch);
    const width = m.width + letterSpacing;
    totalWidth += width;
    return width;
  });
  totalWidth -= letterSpacing; // remove trailing spacing

  let startX = (w - totalWidth) / 2;
  
  // Draw with outline and drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = fontSize * 0.3;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 6;

  let currentX = startX;
  chars.forEach((ch, i) => {
    const charWidth = metrics[i];
    const x = currentX + charWidth / 2;
    
    // Outline
    ctx.lineWidth = fontSize * 0.12;
    ctx.strokeStyle = outlineColor;
    ctx.strokeText(ch, x, posY);

    // Fill
    ctx.fillStyle = textColor;
    ctx.fillText(ch, x, posY);

    currentX += charWidth;
  });

  ctx.restore();
}
