// Draws the cover: the photo filling the square, a sunset tint rising from the bottom, and SUNSET HEIST in bold white capitals along the foot.

/** Draws `photo` (an image, or null) and `caption` onto the canvas's 2D context, at the canvas's own size. */
export function drawCover(canvas, photo, caption) {
  const ctx = canvas.getContext('2d');
  const { width: w, height: h } = canvas;
  ctx.fillStyle = '#1e1438';
  ctx.fillRect(0, 0, w, h);
  if (photo) {
    const scale = Math.max(w / photo.naturalWidth, h / photo.naturalHeight);
    const pw = photo.naturalWidth * scale;
    const ph = photo.naturalHeight * scale;
    ctx.drawImage(photo, (w - pw) / 2, (h - ph) / 2, pw, ph);
  }
  const tint = ctx.createLinearGradient(0, h * 0.35, 0, h);
  tint.addColorStop(0, 'rgba(255, 120, 80, 0)');
  tint.addColorStop(1, 'rgba(255, 42, 133, 0.7)');
  ctx.fillStyle = tint;
  ctx.fillRect(0, 0, w, h);
  const text = (caption || 'SUNSET HEIST').trim().toUpperCase();
  if (!text) return;
  let size = h * 0.12;
  ctx.font = `bold ${size}px sans-serif`;
  while (ctx.measureText(text).width > w * 0.9 && size > 12) {
    size -= 2;
    ctx.font = `bold ${size}px sans-serif`;
  }
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = size * 0.25;
  ctx.fillText(text, w / 2, h - h * 0.08);
  ctx.shadowBlur = 0;
}
