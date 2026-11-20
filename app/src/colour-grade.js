// Applies Vice City sunset / neon duotone colour grading and dual-pass lighting overlays
export function applyColourGrade(ctx, w, h, intensity = 0.8, preset = 'sunset') {
  ctx.save();
  
  // Enhanced gradient sky overlay
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  if (preset === 'sunset') {
    skyGrad.addColorStop(0, `rgba(255, 42, 133, ${0.32 * intensity})`);
    skyGrad.addColorStop(0.45, `rgba(255, 119, 0, ${0.22 * intensity})`);
    skyGrad.addColorStop(1, `rgba(0, 240, 255, ${0.42 * intensity})`);
  } else if (preset === 'neon') {
    skyGrad.addColorStop(0, `rgba(0, 240, 255, ${0.38 * intensity})`);
    skyGrad.addColorStop(0.5, `rgba(139, 30, 79, ${0.22 * intensity})`);
    skyGrad.addColorStop(1, `rgba(255, 42, 133, ${0.52 * intensity})`);
  } else {
    // golden coast
    skyGrad.addColorStop(0, `rgba(255, 210, 0, ${0.32 * intensity})`);
    skyGrad.addColorStop(0.55, `rgba(255, 90, 0, ${0.22 * intensity})`);
    skyGrad.addColorStop(1, `rgba(110, 25, 90, ${0.48 * intensity})`);
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Dual-pass vignette and chromatic edge
  const vig = ctx.createRadialGradient(w/2, h/2, w*0.25, w/2, h/2, w*0.8);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, `rgba(10, 6, 20, ${0.75 * intensity})`);
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  ctx.restore();
}
