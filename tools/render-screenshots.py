import os
from PIL import Image, ImageDraw

def render_poster(width=1280, height=720):
    img = Image.new("RGB", (width, height), (15, 8, 30))
    draw = ImageDraw.Draw(img)

    for y in range(height):
        factor = y / height
        r = int(25 + factor * 180)
        g = int(10 + factor * 60)
        b = int(50 - factor * 20)
        draw.line([(0, y), (width, y)], fill=(max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b))))

    if os.path.exists("app/assets/demo-photo.jpg"):
        photo = Image.open("app/assets/demo-photo.jpg").resize((width, height))
        img = Image.blend(img, photo, 0.75)
        draw = ImageDraw.Draw(img)

    draw.rectangle([12, 12, width-12, height-12], outline="#e8c08a", width=4)
    draw.rectangle([18, 18, width-18, height-18], outline="#e8c08a", width=2)

    draw.rectangle([18, 18, width-18, 48], fill=(12, 6, 22))
    draw.text((30, 24), "★★★★★  \"THE HOTTEST RIDE OF THE YEAR\" — SUNSET GAZETTE", fill="#ffcc44")
    draw.text((width - 95, 24), "VOL. 1", fill="#e8c08a")

    banner_y = int(height * 0.73)
    draw.rectangle([18, banner_y, width-18, banner_y + 28], fill="#cc2233")
    draw.text((width//2 - 170, banner_y + 6), "⚡ EVERYONE WANTS A CUT OF THE SUNSET ⚡", fill="#ffffff")

    title_y = int(height * 0.58)
    draw.text((36, title_y - 2), "SUNSET HEIST", fill="#000000")
    draw.text((32, title_y), "SUNSET HEIST", fill="#fbe8a6")

    draw.text((45, title_y + 65), "Paid in Sunsets", fill="#ff66b2")

    badge_x, badge_y = width - 100, int(height * 0.83)
    draw.ellipse([badge_x - 35, badge_y - 35, badge_x + 35, badge_y + 35], fill=(15, 8, 25), outline="#e8c08a", width=3)
    draw.text((badge_x - 24, badge_y - 12), "★ BEST ★", fill="#e8c08a")
    draw.text((badge_x - 14, badge_y + 4), "CAST", fill="#e8c08a")

    cred_y = height - 42
    draw.rectangle([18, cred_y, width-18, height-18], fill=(10, 5, 20))
    draw.text((30, cred_y + 10), "COMING SOON TO SELECT THEATRES", fill="#ff9933")
    draw.text((width * 0.38, cred_y + 10), "A SUNSET PICTURES PRODUCTION — SUNSET HEIST", fill="#c0a8e0")

    bx = width - 210
    by = cred_y + 6
    draw.rectangle([bx, by, bx + 90, by + 20], fill="#ffffff")
    for b_off in [4, 8, 12, 16, 22, 28, 34, 40, 48, 54, 60, 68, 74, 82]:
        draw.rectangle([bx + b_off, by + 2, bx + b_off + 2, by + 18], fill="#000000")

    return img

def render_ui(active_tab="preview"):
    width, height = 1280, 720
    img = Image.new("RGB", (width, height), (11, 5, 20))
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, 380, height], fill=(20, 9, 36))
    draw.line([(380, 0), (380, height)], fill=(47, 24, 80), width=2)

    draw.rectangle([0, 0, 380, 80], fill=(36, 14, 68))
    draw.text((20, 18), "COVER STUDIO", fill="#ff9933")
    draw.text((20, 44), "KEY-ART POSTER & COVER STUDIO", fill="#bfa8e6")

    tabs = [("preview", "Studio"), ("layout", "Layout"), ("caption", "Caption"), ("export", "Export")]
    tx = 0
    for t_key, t_name in tabs:
        t_w = 380 // 4
        is_active = (t_key == active_tab)
        bg = (31, 15, 56) if is_active else (25, 12, 46)
        draw.rectangle([tx, 80, tx + t_w, 120], fill=bg)
        if is_active:
            draw.rectangle([tx, 117, tx + t_w, 120], fill="#ffaa33")
        draw.text((tx + 18, 93), t_name, fill="#ffaa33" if is_active else "#a085cc")
        tx += t_w

    if active_tab == "preview":
        draw.text((25, 150), "Source Photo", fill="#d1b3ff")
        draw.rectangle([25, 180, 355, 260], outline="#593399", width=2)
        draw.text((70, 215), "Click or Drop Photo Here", fill="#bfa8e6")

        draw.text((25, 290), "Panel Zoom", fill="#d1b3ff")
        draw.rectangle([25, 320, 355, 335], fill="#3d1c68")
        draw.ellipse([180, 318, 195, 337], fill="#ffaa33")

        draw.text((25, 370), "Color Presets", fill="#d1b3ff")
        draw.rectangle([25, 400, 185, 450], fill="#3b176b", outline="#ffaa33", width=2)
        draw.text((55, 418), "Sunset Vice", fill="#fff")
        draw.rectangle([195, 400, 355, 450], fill="#1c0e33", outline="#3d1c68")
        draw.text((225, 418), "Neon Night", fill="#fff")

    elif active_tab == "layout":
        draw.text((25, 150), "Poster Layout Template", fill="#d1b3ff")
        draw.rectangle([25, 180, 185, 240], fill="#3b176b", outline="#ffaa33", width=2)
        draw.text((50, 202), "Key-Art Poster", fill="#fff")
        draw.rectangle([195, 180, 355, 240], fill="#1c0e33", outline="#3d1c68")
        draw.text((220, 202), "4-Panel Grid", fill="#fff")

    elif active_tab == "caption":
        draw.text((25, 150), "Title Caption (Must be SUNSET HEIST)", fill="#d1b3ff")
        draw.rectangle([25, 180, 355, 230], fill="#190c2e", outline="#ffaa33", width=2)
        draw.text((40, 196), "SUNSET HEIST", fill="#fff")

    elif active_tab == "export":
        draw.text((25, 150), "Export Resolution", fill="#d1b3ff")
        draw.rectangle([25, 180, 355, 230], fill="#ff7722")
        draw.text((70, 198), "Export Square (1080x1080)", fill="#140924")
        draw.rectangle([25, 245, 355, 295], fill="#ff7722")
        draw.text((60, 263), "Export Portrait (1080x1350)", fill="#140924")
        draw.rectangle([25, 310, 355, 360], fill="#ff7722")
        draw.text((55, 328), "Export Widescreen (1920x1080)", fill="#140924")

    poster = render_poster(840, 640)
    img.paste(poster, (410, 40))

    return img

def save_optimized(img, path):
    q_img = img.quantize(colors=256, method=Image.Quantize.MEDIANCUT)
    q_img.save(path, "PNG", optimize=True)

def main():
    os.makedirs("screenshots", exist_ok=True)

    cover_img = render_poster(1280, 720)
    save_optimized(cover_img, "screenshots/01-cover.png")
    print(f"Saved screenshots/01-cover.png ({os.path.getsize('screenshots/01-cover.png')} bytes)")

    editor_img = render_ui("preview")
    save_optimized(editor_img, "screenshots/02-editor.png")
    print(f"Saved screenshots/02-editor.png ({os.path.getsize('screenshots/02-editor.png')} bytes)")

    caption_img = render_ui("caption")
    save_optimized(caption_img, "screenshots/03-caption.png")
    print(f"Saved screenshots/03-caption.png ({os.path.getsize('screenshots/03-caption.png')} bytes)")

    export_img = render_ui("export")
    save_optimized(export_img, "screenshots/04-export.png")
    print(f"Saved screenshots/04-export.png ({os.path.getsize('screenshots/04-export.png')} bytes)")

if __name__ == "__main__":
    main()
