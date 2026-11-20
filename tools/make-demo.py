import os
from PIL import Image, ImageDraw, ImageFilter
import random

def make_demo():
    width, height = 1600, 1200
    img = Image.new("RGB", (width, height), (20, 10, 40))
    draw = ImageDraw.Draw(img)

    # 1. Sunset gradient sky (deep violet / purple at top to hot orange / magenta at bottom)
    for y in range(height):
        factor = y / height
        # lerp colors: (25, 10, 50) -> (120, 30, 80) -> (230, 90, 40) -> (250, 180, 80)
        if factor < 0.4:
            t = factor / 0.4
            r = int(25 + t * (100 - 25))
            g = int(10 + t * (25 - 10))
            b = int(50 + t * (90 - 50))
        elif factor < 0.75:
            t = (factor - 0.4) / 0.35
            r = int(100 + t * (220 - 100))
            g = int(25 + t * (80 - 25))
            b = int(90 + t * (30 - 90))
        else:
            t = (factor - 0.75) / 0.25
            r = int(220 + t * (255 - 220))
            g = int(80 + t * (160 - 80))
            b = int(30 + t * (60 - 30))
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # 2. Big sun disc with glow
    sun_center = (width // 2, int(height * 0.48))
    sun_radius = 220
    # Glow / rays
    for r in range(sun_radius + 180, sun_radius, -15):
        alpha_factor = (1.0 - (r - sun_radius) / 180.0) * 80
        glow_color = (255, int(150 + 80 * alpha_factor/80), int(50 * alpha_factor/80))
        draw.ellipse([sun_center[0] - r, sun_center[1] - r, sun_center[0] + r, sun_center[1] + r], fill=(250, 140, 40))

    # Sun bright core
    draw.ellipse([sun_center[0] - sun_radius, sun_center[1] - sun_radius, 
                  sun_center[0] + sun_radius, sun_center[1] + sun_radius], fill=(255, 235, 120))

    # Horizontal scanlines across the sun for retro aesthetic
    for sy in range(sun_center[1] - sun_radius, sun_center[1] + sun_radius, 12):
        draw.rectangle([sun_center[0] - sun_radius - 20, sy, sun_center[0] + sun_radius + 20, sy + 4], fill=(180, 50, 40))

    # 3. City skyline band
    skyline_y = int(height * 0.65)
    draw.rectangle([0, skyline_y, width, height], fill=(15, 8, 30))
    # Add some building shapes
    building_colors = [(20, 10, 35), (30, 15, 50), (10, 5, 25)]
    bx = 0
    random.seed(42)
    while bx < width:
        bw = random.randint(40, 110)
        bh = random.randint(80, 250)
        by = skyline_y - bh
        color = building_colors[random.randint(0, len(building_colors) - 1)]
        draw.rectangle([bx, by, bx + bw, height], fill=color)
        # Windows
        for wy in range(by + 15, skyline_y - 10, 20):
            for wx in range(bx + 10, bx + bw - 10, 15):
                if random.random() > 0.4:
                    draw.rectangle([wx, wy, wx + 6, wy + 10], fill=(255, 220, 120))
        bx += bw - random.randint(0, 15)

    # 4. Palm silhouettes on both sides
    def draw_palm(base_x, base_y, scale=1.0):
        trunk_pts = [
            (base_x, base_y),
            (base_x + 10 * scale, base_y - 200 * scale),
            (base_x + 35 * scale, base_y - 450 * scale),
            (base_x + 70 * scale, base_y - 700 * scale)
        ]
        # Draw trunk curve or lines
        for i in range(len(trunk_pts) - 1):
            draw.line([trunk_pts[i], trunk_pts[i+1]], fill=(10, 5, 20), width=int(24 * scale))
        
        # Fronds
        top = trunk_pts[-1]
        for angle_offset in [-1.2, -0.8, -0.4, 0.0, 0.4, 0.8, 1.2]:
            fx = top[0] + math.cos(angle_offset) * 220 * scale
            fy = top[1] + math.sin(angle_offset) * 120 * scale - 40
            # Draw frond arc
            draw.arc([top[0] - 220 * scale, top[1] - 220 * scale, top[0] + 220 * scale, top[1] + 120 * scale], 
                     start=0, end=180, fill=(10, 5, 20), width=int(12 * scale))

    import math
    draw_palm(150, height, 1.2)
    draw_palm(80, height + 50, 1.5)
    draw_palm(width - 180, height, 1.1)
    draw_palm(width - 100, height + 30, 1.4)

    # 5. One foreground figure silhouette (e.g., gangster with hat / jacket holding a briefcase or leaning)
    fig_x, fig_y = int(width * 0.72), int(height * 0.75)
    # Body / trench coat
    draw.polygon([
        (fig_x - 50, fig_y + 300),
        (fig_x - 30, fig_y + 100),
        (fig_x + 40, fig_y + 100),
        (fig_x + 60, fig_y + 300)
    ], fill=(5, 2, 10))
    # Shoulders / arms
    draw.rectangle([fig_x - 65, fig_y + 90, fig_x + 55, fig_y + 160], fill=(5, 2, 10))
    # Head & fedora hat
    draw.ellipse([fig_x - 25, fig_y + 20, fig_x + 25, fig_y + 85], fill=(5, 2, 10))
    # Fedora brim
    draw.ellipse([fig_x - 45, fig_y + 35, fig_x + 45, fig_y + 50], fill=(5, 2, 10))

    # 6. Film grain / noise overlay
    pixels = img.load()
    for y in range(height):
        for x in range(width):
            if (x + y * 7) % 11 == 0:
                noise = random.randint(-25, 25)
                r, g, b = pixels[x, y]
                pixels[x, y] = (
                    max(0, min(255, r + noise)),
                    max(0, min(255, g + noise)),
                    max(0, min(255, b + noise))
                )

    os.makedirs("app/assets", exist_ok=True)
    output_path = "app/assets/demo-photo.jpg"
    img.save(output_path, "JPEG", quality=90)
    print(f"Generated demo photo at {output_path}")

if __name__ == "__main__":
    make_demo()
