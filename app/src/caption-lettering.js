// caption-lettering.js: Chrome-gradient title lettering, subtitle, banners, badges, and credits strip

function drawStar(ctx, cx, cy, r) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = '#ffcc44';
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function drawCaption(ctx, width, height, text, options = {}) {
  if (!text) text = 'SUNSET HEIST';
  const fontSize = options.fontSize || Math.round(width * 0.11);
  const x = options.x || width * 0.05;
  const y = options.y || height * 0.70;
  const skew = options.skew || -0.04;

  ctx.save();

  // 1. Top Strip (Stars, Review Quote, VOL. 1 badge)
  ctx.save();
  // Draw 5 stars using vector paths
  const starStartX = width * 0.05;
  const starY = height * 0.045;
  for (let i = 0; i < 5; i++) {
    drawStar(ctx, starStartX + i * 16, starY, 6);
  }
  
  ctx.font = '700 12px Arial, sans-serif';
  ctx.fillStyle = '#f0e6ff';
  ctx.fillText('"THE HOTTEST RIDE OF THE YEAR" — SUNSET GAZETTE', width * 0.16, starY + 4);

  // VOL. 1 badge top-right
  ctx.font = '900 14px Impact, Arial Black, sans-serif';
  ctx.fillStyle = '#e8c08a';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  const volText = 'VOL. 1';
  const vw = ctx.measureText(volText).width;
  ctx.strokeText(volText, width - vw - 35, starY + 6);
  ctx.fillText(volText, width - vw - 35, starY + 6);
  ctx.restore();

  // 2. Centered Red Ribbon Banner ("EVERYONE WANTS A CUT OF THE SUNSET")
  ctx.save();
  const bannerY = height * 0.82;
  const bannerW = width * 0.68;
  const bannerX = (width - bannerW) / 2;
  const bannerH = 28;

  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#cc2233';
  ctx.fillRect(bannerX, bannerY, bannerW, bannerH);

  ctx.strokeStyle = '#e8c08a';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(bannerX, bannerY, bannerW, bannerH);

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#100514';
  ctx.font = '900 12px Impact, Arial Black, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('* EVERYONE WANTS A CUT OF THE SUNSET *', width / 2, bannerY + 19);
  ctx.restore();

  // 3. Main Chrome Gradient Title ("SUNSET HEIST") spanning ~80% width across lower third
  ctx.save();
  ctx.translate(x, y);
  ctx.transform(1, 0, skew, 1, 0, 0);

  ctx.font = `900 ${fontSize}px Impact, 'Arial Black', sans-serif`;
  ctx.textBaseline = 'alphabetic';

  // Thick dark outline & drop shadow
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.lineWidth = Math.max(8, fontSize * 0.14);
  ctx.strokeStyle = '#000000';
  ctx.strokeText(text, 0, 0);

  // Chrome vertical gradient (Cream -> Gold -> Orange)
  const grad = ctx.createLinearGradient(0, -fontSize, 0, 0);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.25, '#fbe8a6');
  grad.addColorStop(0.65, '#f5af19');
  grad.addColorStop(1.0, '#d24812');
  ctx.fillStyle = grad;
  ctx.fillText(text, 0, 0);
  ctx.restore();

  // 4. Script-style Subtitle Line ("Paid in Sunsets") with neon glow
  ctx.save();
  ctx.translate(x + 10, y + 40);
  ctx.font = 'italic 700 24px Georgia, serif';
  ctx.shadowColor = '#ff3399';
  ctx.shadowBlur = 16;
  ctx.fillStyle = '#ff66b2';
  ctx.fillText('Paid in Sunsets', 0, 0);
  ctx.restore();

  // 5. Laurel Badge Circle ("BEST CAST") bottom-right
  ctx.save();
  const badgeX = width - 95;
  const badgeY = height - 135;
  const badgeR = 38;
  ctx.beginPath();
  ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15, 8, 25, 0.9)';
  ctx.fill();
  ctx.strokeStyle = '#e8c08a';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.font = '900 10px Impact, sans-serif';
  ctx.fillStyle = '#e8c08a';
  ctx.textAlign = 'center';
  ctx.fillText('★ BEST ★', badgeX, badgeY - 6);
  ctx.font = '700 9px Impact, sans-serif';
  ctx.fillText('CAST', badgeX, badgeY + 10);
  ctx.restore();

  // 6. Bottom Credits Strip & Barcode
  ctx.save();
  const credY = height - 36;
  ctx.fillStyle = 'rgba(10, 5, 20, 0.95)';
  ctx.fillRect(0, credY - 6, width, 42);

  // Coming Soon bottom-left
  ctx.font = '900 12px Impact, sans-serif';
  ctx.fillStyle = '#ff9933';
  ctx.fillText('COMING SOON TO SELECT THEATRES', 22, credY + 17);

  // Credits center
  ctx.font = '700 8.5px Arial, sans-serif';
  ctx.fillStyle = '#c0a8e0';
  ctx.textAlign = 'center';
  ctx.fillText('A SUNSET PICTURES PRODUCTION IN ASSOCIATION WITH PALM & PISTOL — SUNSET HEIST — MUSIC BY THE NIGHT SHIFT ORCHESTRA', width * 0.50, credY + 17);

  // Fake Barcode bottom-right
  const bx = width - 145;
  const by = credY - 2;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(bx, by, 105, 22);
  ctx.fillStyle = '#000000';
  const barWidths = [2,1,3,1,2,4,1,2,1,3,2,1,2,4,1,3,2,1,1,3,2,4,1,2];
  let curX = bx + 4;
  for (let bw of barWidths) {
    if (curX > bx + 98) break;
    ctx.fillRect(curX, by + 3, bw, 16);
    curX += bw + 2;
  }
  ctx.restore();

  ctx.restore();
}
