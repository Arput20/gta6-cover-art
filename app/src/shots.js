// shots.js: Handles ?shot=cover|editor|caption|export for automated screenshot staging

export function handleShotParam(appState, renderCallback) {
  const params = new URLSearchParams(window.location.search);
  const shot = params.get('shot');
  if (!shot) return;

  // Seed demo state
  appState.caption = 'SUNSET HEIST';
  appState.layout = 'keyArt';
  appState.preset = 'sunsetVice';
  
  if (shot === 'cover') {
    appState.activeTab = 'preview';
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.style.display = 'none';
    const canvas = document.getElementById('poster-canvas');
    if (canvas) {
      canvas.width = 1280;
      canvas.height = 720;
    }
  } else if (shot === 'editor') {
    appState.activeTab = 'layout';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    const btn = document.querySelector('[data-tab="layout"]');
    const pane = document.getElementById('pane-layout');
    if (btn) btn.classList.add('active');
    if (pane) pane.classList.add('active');
  } else if (shot === 'caption') {
    appState.activeTab = 'caption';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    const btn = document.querySelector('[data-tab="caption"]');
    const pane = document.getElementById('pane-caption');
    if (btn) btn.classList.add('active');
    if (pane) pane.classList.add('active');
  } else if (shot === 'export') {
    appState.activeTab = 'export';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    const btn = document.querySelector('[data-tab="export"]');
    const pane = document.getElementById('pane-export');
    if (btn) btn.classList.add('active');
    if (pane) pane.classList.add('active');
  }
}
