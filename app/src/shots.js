// shots.js: Handles ?shot=cover|editor|caption|export for automated screenshot staging

export function handleShotParam(appState) {
  const params = new URLSearchParams(window.location.search);
  const shot = params.get('shot');
  if (!shot) return;

  // Seed demo state
  appState.caption = 'SUNSET HEIST';
  
  if (shot === 'cover') {
    // Cover staging
    appState.activeTab = 'preview';
  } else if (shot === 'editor') {
    appState.activeTab = 'layout';
  } else if (shot === 'caption') {
    appState.activeTab = 'caption';
  } else if (shot === 'export') {
    appState.activeTab = 'export';
  }
}
