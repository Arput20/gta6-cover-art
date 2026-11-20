// panel-crop.js: Per-panel crop, zoom, and pan transformation helper

export function drawCroppedImage(ctx, img, panel, transform) {
  if (!img) return;
  const { x, y, w, h } = panel;
  const zoom = transform.zoom || 1.0;
  const offsetX = transform.offsetX || 0; // -1 to 1
  const offsetY = transform.offsetY || 0;

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  // Draw background shadow / fill
  ctx.fillStyle = '#111';
  ctx.fillRect(x, y, w, h);

  const imgAspect = img.width / img.height;
  const panelAspect = w / h;

  let drawW, drawH, drawX, drawY;
  if (imgAspect > panelAspect) {
    drawH = h * zoom;
    drawW = drawH * imgAspect;
  } else {
    drawW = w * zoom;
    drawH = drawW / imgAspect;
  }

  drawX = x + (w - drawW) / 2 + offsetX * w;
  drawY = y + (h - drawH) / 2 + offsetY * h;

  ctx.drawImage(img, drawX, drawY, drawW, drawH);
  ctx.restore();
}
