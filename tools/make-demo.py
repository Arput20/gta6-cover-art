import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter

def make_demo():
    width, height = 1920, 1200
    img = Image.new("RGB", (width, height), (15, 8, 30))
    draw = ImageDraw.Draw(img)

    # 1. Layered gradient sky (deep indigo -> violet -> hot orange)
    for y in range(int(height * 0.7)):
        factor = y / (height * 0.7)
        if factor < 0.35:
            t = factor / 0.35
            r = int(10 + t * (60 - 10))
            g = int(5 + t * (20 - 5))
            b = int(40 + t * (90 - 40))
        elif factor < 0.7:
            t = (factor - 0.35) / 0.35
            r = int(60 + t * (160 - 60))
            g = int(20 + t * (50 - 20))
            b = int(90 + t * (40 - 90))
        else:
            t = (factor - 0.7) / 0.3
            r = int(160 + t * (245 - 160))
            g = int(50 + t * (110 - 50))
            b = int(40 + t * (30 - 40))
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # 2. Big sun disc with glow rings and light rays
    sun_center = (int(width * 0.5), int(height * 0.42))
    sun_radius = 180

    # Glow rings
    for r in range(sun_radius + 220, sun_radius, -12):
        progress = (r - sun_radius) / 220.0
        alpha = int(70 * (1.0 - progress))
        draw.ellipse([sun_center[0] - r, sun_center[1] - r, sun_center[0] + r, sun_center[1] + r], 
                      fill=(255, int(120 + 80 * (1-progress)), int(30 * (1-progress))))

    # Sun bright core
    draw.ellipse([sun_center[0] - sun_radius, sun_center[1] - sun_radius, 
                  sun_center[0] + sun_radius, sun_center[1] + sun_radius], fill=(255, 240, 140))

    # Retro horizontal scanlines on sun
    for sy in range(sun_center[1] - sun_radius, sun_center[1] + sun_radius, 10):
        draw.rectangle([sun_center[0] - sun_radius - 30, sy, sun_center[0] + sun_radius + 30, sy + 4], fill=(200, 60, 40))

    # 3. Cumulus clouds with rim light
    random.seed(101)
    for _ in range(8):
        cx = random.randint(100, width - 100)
        cy = random.randint(150, int(height * 0.5))
        cw = random.randint(200, 500)
        ch = random.randint(50, 120)
        cloud_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        c_draw = ImageDraw.Draw(cloud_img)
        c_draw.ellipse([cx - cw//2, cy - ch//2, cx + cw//2, cy + ch//2], fill=(255, 180, 140, 50))
        # Rim light on top
        c_draw.arc([cx - cw//2, cy - ch//2, cx + cw//2, cy + ch//2], start=180, end=360, fill=(255, 255, 220, 120), width=4)
        img.paste(Image.alpha_composite(img.convert("RGBA"), cloud_img).convert("RGB"))

    # 4. City skyline with lit windows
    skyline_y = int(height * 0.62)
    draw.rectangle([0, skyline_y, width, int(height * 0.72)], fill=(20, 10, 35))
    bx = 0
    while bx < width:
        bw = random.randint(50, 130)
        bh = random.randint(90, 260)
        by = skyline_y - bh
        draw.rectangle([bx, by, bx + bw, skyline_y], fill=(15, 8, 30))
        # Lit windows
        for wy in range(by + 15, skyline_y - 10, 18):
            for wx in range(bx + 10, bx + bw - 10, 14):
                if random.random() > 0.35:
                    draw.rectangle([wx, wy, wx + 6, wy + 10], fill=(255, 220, 130))
        bx += bw - random.randint(0, 15)

    # 5. Wet road with reflections (bottom 28%)
    road_y = int(height * 0.72)
    for y in range(road_y, height):
        factor = (y - road_y) / (height - road_y)
        # Gradient darkening towards bottom, with bright streaks reflecting sunset
        r = int(25 + factor * 15)
        g = int(12 + factor * 8)
        b = int(35 + factor * 20)
        if (y // 6) % 2 == 0 and (y % 13 == 0):
            r = min(255, r + 120)
            g = min(255, g + 80)
            b = min(255, b + 40)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Road perspective lines / median
    draw.polygon([(width*0.48, road_y), (width*0.52, road_y), (width*0.56, height), (width*0.44, height)], fill=(40, 20, 60))

    # 6. Palm trees swaying
    def draw_palm(base_x, base_y, scale=1.0):
        top_y = base_y - int(750 * scale)
        pts = [
            (base_x, base_y),
            (base_x + int(20 * scale), base_y - int(250 * scale)),
            (base_x + int(60 * scale), base_y - int(500 * scale)),
            (base_x + int(110 * scale), top_y)
        ]
        for i in range(len(pts) - 1):
            draw.line([pts[i], pts[i+1]], fill=(12, 6, 22), width=int(26 * scale))
        
        top = pts[-1]
        for a in range(-6, 7):
            angle = a * 0.25
            fx = top[0] + math.cos(angle) * int(240 * scale)
            fy = top[1] + math.sin(angle) * int(140 * scale) - int(30 * scale)
            draw.arc([top[0] - int(240 * scale), top[1] - int(240 * scale), top[0] + int(240 * scale), top[1] + int(150 * scale)],
                     start=0, end=180, fill=(12, 6, 22), width=int(14 * scale))

    draw_palm(180, height + 50, 1.3)
    draw_palm(90, height + 80, 1.6)
    draw_palm(width - 220, height + 40, 1.2)
    draw_palm(width - 110, height + 70, 1.5)

    # 7. THREE distinct large character silhouettes with rim lighting & colour accents:
    # (a) Woman with sunglasses leaning on convertible (left)
    ax = int(width * 0.25)
    ay = int(height * 0.60)
    # Convertible car body hint
    draw.polygon([(ax - 220, ay + 180), (ax + 50, ay + 180), (ax + 30, ay + 260), (ax - 240, ay + 260)], fill=(120, 30, 40))
    # Woman silhouette
    draw.ellipse([ax - 40, ay, ax + 20, ay + 80], fill=(10, 5, 20)) # head / hair
    draw.rectangle([ax - 45, ay + 75, ax + 35, ay + 190], fill=(10, 5, 20)) # torso in red jacket accent
    draw.rectangle([ax - 35, ay + 80, ax + 25, ay + 180], fill=(180, 40, 50)) # red jacket accent
    # Rim light on left edge
    draw.line([(ax - 42, ay + 75), (ax - 42, ay + 190)], fill=(255, 200, 150), width=3)

    # (b) Man in a fedora facing away (center, larger)
    bx = int(width * 0.52)
    by = int(height * 0.55)
    # Cream coat accent
    draw.polygon([(bx - 70, by + 130), (bx - 90, by + 380), (bx + 90, by + 380), (bx + 70, by + 130)], fill=(210, 190, 150))
    draw.polygon([(bx - 60, by + 140), (bx - 80, by + 370), (bx + 80, by + 370), (bx + 60, by + 140)], fill=(15, 8, 25)) # core
    # Fedora & head
    draw.ellipse([bx - 35, by + 10, bx + 35, by + 90], fill=(15, 8, 25))
    draw.ellipse([bx - 60, by + 40, bx + 60, by + 60], fill=(15, 8, 25)) # brim
    # Warm rim light
    draw.line([(bx - 62, by + 40), (bx - 91, by + 370)], fill=(255, 220, 160), width=4)

    # (c) Bearded man in a bucket hat (right) with teal shirt accent
    cx = int(width * 0.78)
    cy = int(height * 0.58)
    draw.ellipse([cx - 30, cy, cx + 30, cy + 75], fill=(12, 6, 20)) # head + bucket hat
    draw.ellipse([cx - 45, cy + 15, cx + 45, cy + 30], fill=(12, 6, 20)) # brim
    draw.rectangle([cx - 50, cy + 70, cx + 50, cy + 220], fill=(12, 6, 20)) # torso
    draw.rectangle([cx - 40, cy + 80, cx + 40, cy + 180], fill=(20, 120, 130)) # teal shirt accent
    # Rim light
    draw.line([(cx + 48, cy + 70), (cx + 48, cy + 220)], fill=(100, 240, 220), width=3)

    # 8. Subtle canvas texture & per-region stats verification
    pixels = img.load()
    r_sum, g_sum, b_sum = 0, 0, 0
    sample_count = 0
    for y in range(0, height, 10):
        for x in range(0, width, 10):
            r, g, b = pixels[x, y]
            r_sum += r; g_sum += g; b_sum += b
            sample_count += 1
            if (x + y * 3) % 13 == 0:
                noise = random.randint(-18, 18)
                pixels[x, y] = (max(0, min(255, r + noise)),
                                max(0, min(255, g + noise)),
                                max(0, min(255, b + noise))
            )

    print(f"Demo photo generated successfully at 1920x1200. Average color stats: R={r_sum//sample_count}, G={g_sum//sample_count}, B={b_sum//sample_count}")

    os.makedirs("app/assets", exist_ok=True)
    img.save("app/assets/demo-photo.jpg", "JPEG", quality=95)

if __name__ == "__main__":
    make_demo()
