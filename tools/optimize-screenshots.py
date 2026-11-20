from PIL import Image
import os

shots = [
    ("01-cover.png", (640, 360)),
    ("02-editor.png", (512, 288)),
    ("03-caption.png", (448, 252)),
    ("04-export.png", (384, 216))
]

for name, size in shots:
    path = os.path.join("screenshots", name)
    if os.path.exists(path):
        img = Image.open(path).convert("RGB")
        img = img.resize(size, Image.Resampling.LANCZOS)
        img.save(path, "PNG", optimize=True)
        size_bytes = os.path.getsize(path)
        print(f"{name}: {size} -> {size_bytes} bytes")

print("Optimization complete.")
