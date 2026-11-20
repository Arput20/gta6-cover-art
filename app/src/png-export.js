// Handles exporting cover art in multiple resolutions (1080x1080, 1080x1350, 1920x1080) with robust error handling
export function exportCoverImage(renderFunc, targetWidth = 1080, targetHeight = 1080, filename = 'sunset-heist-cover.png') {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = targetWidth;
  exportCanvas.height = targetHeight;
  const ctx = exportCanvas.getContext('2d');

  try {
    renderFunc(ctx, targetWidth, targetHeight);
    exportCanvas.toBlob((blob) => {
      if (!blob) throw new Error('Canvas blob generation failed');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      URL.revokeObjectURL(a.href);
    }, 'image/png');
  } catch (err) {
    console.error('Export error:', err);
  }
}
