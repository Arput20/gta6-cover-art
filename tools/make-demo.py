#!/usr/bin/env python3
import math
import random
import os
from PIL import Image, ImageDraw, ImageFilter

def create_demo_photo():
    width, height = 1600, 1200
    img = Image.new("RGB", (width, height), (0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Layered Sky: Deep Violet (top) -> Hot Orange/Pink (horizon ~ 72% height) -> Deep Purple-Blue (bottom)
    sky_height = int(height * 0.72)
    top_col = (45, 12, 68)     # Deep Violet
    mid_col = (255, 42, 133)   # Hot Magenta/Pink
    horizon_col = (255, 140, 0) # Hot Orange/Yellow

    for y in range(sky_height):
        t = y / float(sky_height)
        if t < 0.5:
            factor = t / 0.5
            r = int(top_col[0] * (1 - factor) + mid_col[0] * factor)
            g = int(top_col[1] * (1 - factor) + mid_col[1] * factor)
            b = int(top_col[2] * (1 - factor) + mid_col[2] * factor)
        else:
            factor = (t - 0.5) / 0.5
            r = int(mid_col[0] * (1 - factor) + horizon_col[0] * factor)
            g = int(mid_col[1] * (1 - factor) + horizon_col[1] * factor)
            b = int(mid_col[2] * (1 - factor) + horizon_col[2] * factor)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Water / Lower gradient
    water_height = height - sky_height
    water_top = (120, 30, 80)
    water_bot = (20, 10, 35)
    for y in range(water_height):
        t = y / float(water_height)
        r = int(water_top[0] * (1 - t) + water_bot[0] * t)
        g = int(water_top[1] * (1 - t) + water_bot[1] * t)
        b = int(water_top[2] * (1 - t) + water_bot[2] * t)
        draw.line([(0, sky_height + y), (width, sky_height + y)], fill=(r, g, b))

    # 2. Big Sun Disc with Glow
    sun_cx, sun_cy = width // 2, int(sky_height * 0.75)
    sun_r = 140
    
    glow_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_img)
    for r in range(sun_r + 120, sun_r, -5):
        alpha = int(255 * (1 - (r - sun_r) / 120.0) * 0.4)
        glow_draw.ellipse([sun_cx - r, sun_cy - r, sun_cx + r, sun_cy + r], fill=(255, 180, 50, alpha))
    glow_img = glow_img.filter(ImageFilter.GaussianBlur(15))
    img.paste(glow_img, (0, 0), glow_img)

    draw = ImageDraw.Draw(img)
    draw.ellipse([sun_cx - sun_r, sun_cy - sun_r, sun_cx + sun_r, sun_cy + sun_r], fill=(255, 235, 170))

    # Sun Rays / Banded sun lines
    for line_y in range(sun_cy + 10, sun_cy + sun_r, 14):
        thickness = int(3 + (line_y - sun_cy) * 0.05)
        draw.rectangle([sun_cx - sun_r - 20, line_y, sun_cx + sun_r + 20, line_y + thickness], fill=(255, 120, 20))

    # 3. City Skyline Band along horizon
    skyline_y = sky_height
    buildings = [
        (50, 180), (120, 240), (180, 150), (250, 320), (340, 220), (410, 380),
        (500, 200), (580, 450), (670, 280), (740, 390), (830, 260), (910, 420),
        (1000, 310), (1090, 230), (1170, 360), (1260, 210), (1340, 340), (1430, 190), (1510, 270)
    ]
    for bx, bh in buildings:
        bw = random.randint(50, 90)
        draw.rectangle([bx, skyline_y - bh, bx + bw, skyline_y], fill=(15, 8, 25))
        for wy in range(skyline_y - bh + 20, skyline_y - 20, 25):
            for wx in range(bx + 8, bx + bw - 12, 16):
                if random.random() > 0.4:
                    win_col = (255, 220, 100) if random.random() > 0.3 else (0, 240, 255)
                    draw.rectangle([wx, wy, wx + 6, wy + 10], fill=win_col)

    # 4. Foreground Figure Silhouette
    fig_cx = int(width * 0.52)
    fig_base = height - 80
    draw.ellipse([fig_cx - 35, fig_base - 380, fig_cx + 35, fig_base - 310], fill=(10, 5, 18))
    draw.polygon([
        (fig_cx - 90, fig_base - 300),
        (fig_cx + 90, fig_base - 300),
        (fig_cx + 110, fig_base - 180),
        (fig_cx + 70, fig_base),
        (fig_cx - 70, fig_base),
        (fig_cx - 110, fig_base - 180)
    ], fill=(10, 5, 18))

    # 5. Palm Trees
    def draw_palm(x, base_y, scale=1.0, direction=1):
        trunk_pts = []
        for i in range(25):
            t = i / 24.0
            tx = x + direction * math.sin(t * math.pi * 0.5) * 80 * scale
            ty = base_y - t * 500 * scale
            trunk_pts.append((tx, ty))
        
        for i in range(len(trunk_pts) - 1):
            w_start = int((28 - i * 0.8) * scale)
            draw.line([trunk_pts[i], trunk_pts[i+1]], fill=(12, 6, 20), width=max(4, w_start))

        top_x, top_y = trunk_pts[-1]
        num_fronds = 9
        for f in range(num_fronds):
            angle = (f / float(num_fronds - 1) - 0.5) * math.pi * 0.85 - (0.2 if direction < 0 else -0.2)
            length = random.randint(180, 260) * scale
            fx = top_x + math.cos(angle) * length
            fy = top_y + math.sin(angle) * length * 0.7
            mid_x = (top_x + fx) / 2 + (15 if direction > 0 else -15)
            mid_y = min(top_y, fy) - 40 * scale
            draw.line([(top_x, top_y), (mid_x, mid_y), (fx, fy)], fill=(12, 6, 20), width=int(6 * scale))

    draw_palm(120, height + 50, scale=1.25, direction=1)
    draw_palm(280, height + 100, scale=0.9, direction=1)
    draw_palm(width - 140, height + 50, scale=1.3, direction=-1)
    draw_palm(width - 300, height + 100, scale=0.85, direction=-1)

    # 6. Grain / Noise Overlay using PIL
    pixels = img.load()
    for y in range(height):
        for x in range(width):
            if random.random() < 0.15:
                noise = random.randint(-15, 15)
                r, g, b = pixels[x, y]
                pixels[x, y] = (
                    max(0, min(255, r + noise)),
                    max(0, min(255, g + noise)),
                    max(0, min(255, b + noise))
                )

    os.makedirs("app/assets", exist_ok=True)
    out_path = "app/assets/demo-photo.jpg"
    img.save(out_path, quality=92)
    print(f"Generated {out_path} at {width}x{height}")

    # Verification
    top_pixel = img.getpixel((width // 2, 100))
    mid_pixel = img.getpixel((width // 2, sky_height // 2))
    bot_pixel = img.getpixel((width // 2, height - 100))
    print(f"Top sky color: {top_pixel}")
    print(f"Mid sky color: {mid_pixel}")
    print(f"Bottom color: {bot_pixel}")
    assert sum(top_pixel) > 30, "Top is too dark!"
    assert sum(mid_pixel) > 50, "Mid is too dark!"
    print("Verification passed! Image is rich and colorful.")

if __name__ == "__main__":
    create_demo_photo()
