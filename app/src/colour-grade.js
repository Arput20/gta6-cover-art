// colour-grade.js: Duotone mapping, sunset tint, halftone dots, and film grain

export function applyColorGrading(ctx, width, height, preset) {
  // 1. Sunset gradient overlay
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, preset.skyColor1 || 'rgba(120, 20, 100, 0.35)');
  grad.addColorStop(0.5, preset.skyColor2 || 'rgba(230, 80, 40, 0.25)');
  grad.addColorStop(1, preset.skyColor3 || 'rgba(255, 180, 50, 0.4)');
  ctx.save();
  ctx.fillStyle = grad;
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  // 2. Halftone dot pattern
  if (preset.halftone) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    const spacing = 12;
    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  // 3. Film grain
  if (preset.grain > 0) {
    ctx.save();
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const intensity = preset.grain * 25;
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < 0.25) {
        const noise = (Math.random() - 0.5) * intensity;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
        data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
      }
    }
    ctx.putImageData(imgData, 0, 0);
    ctx.restore();
  }
}
