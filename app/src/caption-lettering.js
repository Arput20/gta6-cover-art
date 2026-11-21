// caption-lettering.js: Chrome-gradient title lettering, subtitle, banners, badges, and credits strip

export function drawCaption(ctx, width, height, text, options = {}) {
  if (!text) text = 'SUNSET HEIST';
  const fontSize = options.fontSize || Math.round(width * 0.10);
  const x = options.x || width * 0.05;
  const y = options.y || height * 0.82;
  const skew = options.skew || -0.05;

  ctx.save();

  // 1. Top Strip (Stars, Review Quote, VOL. 1 badge)
  ctx.save();
  ctx.font = '700 14px Impact, Arial Black, sans-serif';
  ctx.fillStyle = '#ffcc44';
  ctx.fillText('★★★★★', width * 0.05, height * 0.045);
  
  ctx.font = '700 12px Arial, sans-serif';
  ctx.fillStyle = '#f0e6ff';
  ctx.fillText('"THE HOTTEST RIDE OF THE YEAR" — SUNSET GAZETTE', width * 0.18, height * 0.044);

  // VOL. 1 badge top-right
  ctx.font = '900 14px Impact, Arial Black, sans-serif';
  ctx.fillStyle = '#e8c08a';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  const volText = 'VOL. 1';
  const vw = ctx.measureText(volText).width;
  ctx.strokeText(volText, width - vw - 35, height * 0.048);
  ctx.fillText(volText, width - vw - 35, height * 0.048);
  ctx.restore();

  // 2. Red Banner Strip ("EVERYONE WANTS A CUT OF THE SUNSET")
  ctx.save();
  const bannerY = height * 0.77;
  const bannerH = 26;
  ctx.fillStyle = '#cc2233';
  ctx.fillRect(0, bannerY, width, bannerH);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 13px Impact, Arial Black, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚡ EVERYONE WANTS A CUT OF THE SUNSET ⚡', width / 2, bannerY + 18);
  ctx.restore();

  // 3. Main Chrome Gradient Title ("SUNSET HEIST")
  ctx.save();
  ctx.translate(x, y);
  ctx.transform(1, 0, skew, 1, 0, 0);

  ctx.font = `900 ${fontSize}px Impact, 'Arial Black', sans-serif`;
  ctx.textBaseline = 'alphabetic';

  // Thick dark outline / drop shadow
  ctx.lineWidth = Math.max(8, fontSize * 0.14);
  ctx.strokeStyle = '#000000';
  ctx.strokeText(text, 0, 0);

  // Chrome vertical gradient (Cream -> Gold -> Orange)
  const grad = ctx.createLinearGradient(0, -fontSize, 0, 0);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.3, '#fbe8a6');
  grad.addColorStop(0.7, '#f5af19');
  grad.addColorStop(1.0, '#e25822');
  ctx.fillStyle = grad;
  ctx.fillText(text, 0, 0);
  ctx.restore();

  // 4. Script-style Subtitle Line ("Paid in Sunsets")
  ctx.save();
  ctx.translate(x + 10, y + 36);
  ctx.font = 'italic 700 24px Georgia, serif';
  ctx.shadowColor = '#ff3399';
  ctx.shadowBlur = 15;
  ctx.fillStyle = '#ff66b2';
  ctx.fillText('Paid in Sunsets', 0, 0);
  ctx.restore();

  // 5. Laurel Badge Circle ("BEST CAST") bottom-right
  ctx.save();
  const badgeX = width - 110;
  const badgeY = height - 125;
  const badgeR = 42;
  ctx.beginPath();
  ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(20, 10, 35, 0.85)';
  ctx.fill();
  ctx.strokeStyle = '#e8c08a';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Laurel wreath arcs & text
  ctx.font = '900 11px Impact, sans-serif';
  ctx.fillStyle = '#e8c08a';
  ctx.textAlign = 'center';
  ctx.fillText('★ BEST ★', badgeX, badgeY - 8);
  ctx.font = '700 10px Impact, sans-serif';
  ctx.fillText('CAST', badgeX, badgeY + 10);
  ctx.restore();

  // 6. Bottom Credits Strip & Barcode
  ctx.save();
  const credY = height - 38;
  ctx.fillStyle = 'rgba(10, 5, 20, 0.95)';
  ctx.fillRect(0, credY - 6, width, 44);

  // Coming Soon bottom-left
  ctx.font = '900 13px Impact, sans-serif';
  ctx.fillStyle = '#ff9933';
  ctx.fillText('COMING SOON TO SELECT THEATRES', 25, credY + 18);

  // Credits center
  ctx.font = '700 9px Arial, sans-serif';
  ctx.fillStyle = '#c0a8e0';
  ctx.textAlign = 'center';
  ctx.fillText('A SUNSET PICTURES PRODUCTION IN ASSOCIATION WITH PALM & PISTOL — SUNSET HEIST — MUSIC BY THE NIGHT SHIFT ORCHESTRA', width * 0.52, credY + 18);

  // Fake Barcode bottom-right
  const bx = width - 150;
  const by = credY - 2;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(bx, by, 110, 24);
  ctx.fillStyle = '#000000';
  const barWidths = [2,1,3,1,2,4,1,2,1,3,2,1,2,4,1,3,2,1,1,3,2,4,1,2];
  let curX = bx + 4;
  for (let bw of barWidths) {
    if (curX > bx + 102) break;
    ctx.fillRect(curX, by + 3, bw, 18);
    curX += bw + 2;
  }
  ctx.restore();

  ctx.restore();
}
