// Fixed scenes for screenshots: ?shot=cover, editor, caption, export
export async function runShot(shot, query, load) {
  const canvas = document.getElementById('cover');
  if (shot === 'cover') {
    document.body.classList.add('shot-cover');
    if (canvas) {
      canvas.width = 1920;
      canvas.height = 1080;
    }
  } else if (shot === 'editor') {
    document.body.classList.add('shot-editor');
    const layoutSelect = document.getElementById('layout-select');
    if (layoutSelect) layoutSelect.value = '3-panel-split';
  } else if (shot === 'caption') {
    document.body.classList.add('shot-caption');
    const captionInput = document.getElementById('caption');
    if (captionInput) {
      captionInput.value = 'VICE CITY 2026';
    }
  } else if (shot === 'export') {
    document.body.classList.add('shot-export');
    const exportBtn = document.getElementById('export-landscape');
    if (exportBtn) {
      exportBtn.style.border = '2px solid #00f0ff';
      exportBtn.style.boxShadow = '0 0 15px rgba(0,240,255,0.6)';
    }
  }
  await load(`assets/demo-photo.jpg`, query.get('caption') ?? (shot === 'caption' ? 'VICE CITY 2026' : 'VICE CITY STORIES'));
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.__shotReady = true;
    });
  });
}

