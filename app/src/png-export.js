// png-export.js: Export canvas to PNG in different aspect ratios (1080x1080, 1080x1350, 1920x1080)

export function exportPoster(sourceCanvas, targetWidth, targetHeight, filename = 'sunset-heist-cover.png') {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = targetWidth;
  exportCanvas.height = targetHeight;
  const eCtx = exportCanvas.getContext('2d');

  eCtx.fillStyle = '#0a0515';
  eCtx.fillRect(0, 0, targetWidth, targetHeight);

  // Draw source canvas scaled to target
  eCtx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, 0, targetWidth, targetHeight);

  const dataUrl = exportCanvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
  return dataUrl;
}
