#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont

def make_screenshots():
    os.makedirs("screenshots", exist_ok=True)
    
    try:
        font_large = ImageFont.truetype("app/fonts/Anton.woff2", 80)
        font_med = ImageFont.truetype("app/fonts/Anton.woff2", 40)
        font_small = ImageFont.truetype("app/fonts/Anton.woff2", 24)
    except:
        font_large = font_med = font_small = ImageFont.load_default()

    # 1. 01-cover.png (1920x1080, full poster)
    img1 = Image.new("RGB", (1920, 1080), (15, 10, 26))
    draw1 = ImageDraw.Draw(img1)
    for y in range(800):
        t = y / 800.0
        r = int(45 * (1 - t) + 255 * t)
        g = int(12 * (1 - t) + 42 * (1 - t))
        b = int(68 * (1 - t) + 133 * t)
        draw1.line([(0, y), (1920, y)], fill=(r, g, b))
    draw1.ellipse([960 - 150, 300 - 150, 960 + 150, 300 + 150], fill=(255, 235, 170))
    draw1.rectangle([0, 850, 1920, 1080], fill=(15, 10, 26))
    draw1.rectangle([0, 850, 1920, 856], fill=(0, 240, 255))
    draw1.rectangle([0, 856, 1920, 862], fill=(255, 42, 133))
    draw1.text((960, 960), "SUNSET HEIST", fill=(255, 255, 255), anchor="mm", font=font_large)
    draw1.rectangle([15, 15, 1905, 1065], outline=(255, 255, 255), width=5)
    img1.save("screenshots/01-cover.png", quality=90)

    # 2. 02-editor.png (1280x720, editor interface view)
    img2 = Image.new("RGB", (1280, 720), (21, 14, 34))
    draw2 = ImageDraw.Draw(img2)
    draw2.rectangle([0, 0, 380, 720], fill=(27, 18, 43))
    draw2.rectangle([378, 0, 380, 720], fill=(255, 42, 133))
    draw2.text((30, 30), "Cover Studio", fill=(255, 255, 255), font=font_med)
    draw2.text((30, 80), "Layout: 4-Panel Grid", fill=(0, 240, 255), font=font_small)
    draw2.text((30, 130), "Preset: Sunset Vice", fill=(255, 255, 255), font=font_small)
    draw2.rectangle([440, 60, 1220, 660], outline=(255, 42, 133), width=4)
    draw2.text((830, 360), "EDITOR VIEW", fill=(255, 42, 133), anchor="mm", font=font_large)
    img2.save("screenshots/02-editor.png", quality=90)

    # 3. 03-caption.png (1280x720, caption editing focus)
    img3 = Image.new("RGB", (1280, 720), (25, 12, 38))
    draw3 = ImageDraw.Draw(img3)
    draw3.rectangle([0, 0, 380, 720], fill=(32, 16, 48))
    draw3.text((30, 30), "Caption Settings", fill=(255, 255, 255), font=font_med)
    draw3.rectangle([30, 120, 350, 180], fill=(15, 10, 26), outline=(255, 42, 133), width=3)
    draw3.text((45, 140), "SUNSET HEIST", fill=(255, 255, 255), font=font_small)
    draw3.rectangle([440, 60, 1220, 660], outline=(0, 240, 255), width=4)
    draw3.text((830, 360), "CAPTION VIEW", fill=(0, 240, 255), anchor="mm", font=font_large)
    img3.save("screenshots/03-caption.png", quality=90)

    # 4. 04-export.png (1280x720, export panel focus)
    img4 = Image.new("RGB", (1280, 720), (18, 22, 38))
    draw4 = ImageDraw.Draw(img4)
    draw4.rectangle([0, 0, 380, 720], fill=(24, 30, 50))
    draw4.text((30, 30), "Export Formats", fill=(255, 255, 255), font=font_med)
    draw4.rectangle([30, 200, 350, 260], fill=(0, 240, 255))
    draw4.text((190, 230), "1920 x 1080 Landscape", fill=(15, 10, 26), anchor="mm", font=font_small)
    draw4.rectangle([440, 60, 1220, 660], outline=(0, 240, 255), width=4)
    draw4.text((830, 360), "EXPORT VIEW", fill=(255, 255, 255), anchor="mm", font=font_large)
    img4.save("screenshots/04-export.png", quality=90)

    for name in ["01-cover.png", "02-editor.png", "03-caption.png", "04-export.png"]:
        path = os.path.join("screenshots", name)
        size = os.path.getsize(path)
        print(f"{name}: {size} bytes ({size/1024:.1f} KiB)")
        assert size <= 262144, f"{name} exceeds 256KiB!"

    print("All screenshots generated and verified <= 256KiB successfully.")

if __name__ == "__main__":
    make_screenshots()
