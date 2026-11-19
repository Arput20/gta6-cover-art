// Handles per-panel photo rendering, cropping, zoom and sketch/halftone treatments
import { drawPanelPolygon } from './poster-layout.js';

export function renderPanels(ctx, w, h, photo, panels, zoom = 1, offsetX = 0, offsetY = 0) {
  panels.forEach((panel, idx) => {
    ctx.save();
    drawPanelPolygon(ctx, w, h, panel.points);
    ctx.clip();

    if (photo) {
      // Calculate cover/contain scaling for each panel
      const scale = Math.max(w / photo.naturalWidth, h / photo.naturalHeight) * zoom;
      const pw = photo.naturalWidth * scale;
      const ph = photo.naturalHeight * scale;
      const px = (w - pw) / 2 + offsetX + (idx * 30);
      const py = (h - ph) / 2 + offsetY + (idx * 20);

      ctx.drawImage(photo, px, py, pw, ph);

      // Inner panel shading/halftone effect
      ctx.fillStyle = 'rgba(15, 10, 26, 0.25)';
      ctx.fillRect(0, 0, w, h);
    } else {
      // Fallback gradient fill if no photo
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, idx % 2 === 0 ? '#2b1838' : '#1a2638');
      grad.addColorStop(1, '#0f0a1a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    ctx.restore();

    // Draw crisp border around panel
    ctx.save();
    drawPanelPolygon(ctx, w, h, panel.points);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ff2a85';
    ctx.stroke();
    ctx.restore();
  });
}
