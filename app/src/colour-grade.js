// Applies Vice City sunset / neon duotone colour grading and lighting overlays
export function applyColourGrade(ctx, w, h, intensity = 0.7, preset = 'sunset') {
  ctx.save();
  
  // Gradient sky overlay
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  if (preset === 'sunset') {
    skyGrad.addColorStop(0, `rgba(255, 42, 133, ${0.3 * intensity})`);
    skyGrad.addColorStop(0.5, `rgba(255, 119, 0, ${0.2 * intensity})`);
    skyGrad.addColorStop(1, `rgba(0, 240, 255, ${0.4 * intensity})`);
  } else if (preset === 'neon') {
    skyGrad.addColorStop(0, `rgba(0, 240, 255, ${0.35 * intensity})`);
    skyGrad.addColorStop(0.5, `rgba(139, 30, 79, ${0.2 * intensity})`);
    skyGrad.addColorStop(1, `rgba(255, 42, 133, ${0.5 * intensity})`);
  } else {
    // golden coast
    skyGrad.addColorStop(0, `rgba(255, 200, 0, ${0.3 * intensity})`);
    skyGrad.addColorStop(0.6, `rgba(255, 80, 0, ${0.2 * intensity})`);
    skyGrad.addColorStop(1, `rgba(100, 20, 80, ${0.45 * intensity})`);
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Vignette / Chromatic edge
  const vig = ctx.createRadialGradient(w/2, h/2, w*0.3, w/2, h/2, w*0.75);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, `rgba(15, 10, 26, ${0.7 * intensity})`);
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  ctx.restore();
}
