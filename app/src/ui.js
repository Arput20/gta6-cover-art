// ui.js: UI wiring, controls, drag and drop, size switcher, sliders

export function setupUI(appState, renderCallback) {
  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const tabId = btn.dataset.tab;
      const pane = document.getElementById(`pane-${tabId}`);
      if (pane) pane.classList.add('active');
      appState.activeTab = tabId;
    });
  });

  // Layout selection
  document.querySelectorAll('.layout-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.layout-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      appState.layout = card.dataset.layout;
      renderCallback();
    });
  });

  // Preset selection
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.preset = btn.dataset.preset;
      renderCallback();
    });
  });

  // Caption input (must always default or contain SUNSET HEIST)
  const captionInput = document.getElementById('caption-input');
  if (captionInput) {
    captionInput.value = appState.caption;
    captionInput.addEventListener('input', (e) => {
      appState.caption = e.target.value || 'SUNSET HEIST';
      renderCallback();
    });
  }

  // Sliders
  const zoomSlider = document.getElementById('zoom-slider');
  if (zoomSlider) {
    zoomSlider.addEventListener('input', (e) => {
      const pIdx = appState.selectedPanel || 0;
      if (!appState.transforms[pIdx]) appState.transforms[pIdx] = { zoom: 1, offsetX: 0, offsetY: 0 };
      appState.transforms[pIdx].zoom = parseFloat(e.target.value);
      renderCallback();
    });
  }

  // File upload & Drag/Drop
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) loadImageFile(file, appState, renderCallback);
    });

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file) loadImageFile(file, appState, renderCallback);
    });
  }

  // Export buttons
  document.querySelectorAll('.export-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const w = parseInt(btn.dataset.w, 10);
      const h = parseInt(btn.dataset.h, 10);
      if (appState.onExport) appState.onExport(w, h);
    });
  });
}

function loadImageFile(file, appState, callback) {
  const reader = new FileReader();
  reader.onload = (evt) => {
    const img = new Image();
    img.onload = () => {
      appState.sourceImage = img;
      callback();
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}
