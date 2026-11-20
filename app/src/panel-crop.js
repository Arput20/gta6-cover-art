// Handles per-panel photo rendering, cropping, zoom and distinct treatments (halftone dots, ink-outline sketch, duotone flat, clean photo with vignette)
import { drawPanelPolygon } from './poster-layout.js';

export function renderPanels(ctx, w, h, photo, panels, zoom = 1, offsetX = 0, offsetY = 0) {
  panels.forEach((panel, idx) => {
    ctx.save();
    drawPanelPolygon(ctx, w, h, panel.points);
    ctx.clip();

    if (photo) {
      // Different crop region per panel from natural dimensions
      const nw = photo.naturalWidth;
      const nh = photo.naturalHeight;
      const cropW = nw * 0.6;
      const cropH = nh * 0.6;
      const cropX = ((idx % 2) * 0.2) * nw;
      const cropY = (Math.floor(idx / 2) * 0.2) * nh;

      const scale = Math.max(w / cropW, h / cropH) * zoom;
      const pw = cropW * scale;
      const ph = cropH * scale;
      const px = (w - pw) / 2 + offsetX - cropX * (scale / (nw / w));
      const py = (h - ph) / 2 + offsetY - cropY * (scale / (nh / h));

      ctx.drawImage(photo, px, py, pw, ph);

      // Distinct treatments per panel (halftone dots / ink-outline sketch / duotone flat / clean photo with vignette)
      if (idx === 0) {
        // Halftone dots treatment
        ctx.fillStyle = 'rgba(255, 42, 133, 0.25)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
        for (let gx = 0; gx < w; gx += 8) {
          for (let gy = 0; gy < h; gy += 8) {
            ctx.beginPath();
            ctx.arc(gx, gy, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (idx === 1) {
        // Ink-outline sketch treatment
        ctx.fillStyle = 'rgba(255, 180, 0, 0.35)';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = '#100818';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
      } else if (idx === 2) {
        // Duotone flat treatment
        const duotone = ctx.createLinearGradient(0, 0, w, h);
        duotone.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
        duotone.addColorStop(1, 'rgba(255, 42, 133, 0.5)');
        ctx.fillStyle = duotone;
        ctx.fillRect(0, 0, w, h);
      } else {
        // Clean photo with vignette
        const vig = ctx.createRadialGradient(w/2, h/2, w*0.2, w/2, h/2, w*0.75);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, 'rgba(15, 10, 26, 0.65)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, w, h);
      }
    } else {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, idx % 2 === 0 ? '#2b1838' : '#1a2638');
      grad.addColorStop(1, '#0f0a1a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    ctx.restore();

    // Draw crisp split lines / borders around panel
    ctx.save();
    drawPanelPolygon(ctx, w, h, panel.points);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#0f0a1a';
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ff2a85';
    ctx.stroke();
    ctx.restore();
  });
}
