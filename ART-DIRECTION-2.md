# FIX PASS 2 — the committed poster template did NOT reach the rendered cover

screenshots/01-cover.png still shows the OLD flat layout. The poster template code exists but is not wired into what ?shot=cover renders. Fix and PROVE it.

Concrete problems visible in the current artifact (do not repeat any of them):
1. No panels at all — the scene is one flat image. The template must draw 5 bordered, duotone-treated PANELS (cropped regions of the demo scene, warm cream borders, slight skew) covering the frame, with label chips "THE DRIVER / THE MECHANIC / THE CAPTAIN / THE RIDER / THE FIXER".
2. Title "SUNSET HEIST" is tiny grey text at mid-left. It must be a GIANT chrome-gradient headline (cream->gold->orange vertical fill, thick dark outline, drop shadow, slight arch/skew) spanning ~80% width across the lower third.
3. "Paid in Sunsets" is tiny grey — make it a big italic neon-pink script with glow under the title.
4. The red banner is a full-width ugly strip — make it a short centered red ribbon with dark text.
5. Tofu boxes "□" before THE HOTTEST RIDE OF THE YEAR and in the credits — the font lacks ★ and • glyphs; replace with drawn shapes (canvas star paths, diamond separators) or plain characters like " * " that exist.
6. Characters are flat featureless blocks — give the three silhouettes warm rim-light strokes, head/hat/jacket details, colour accents.
7. Clouds are ugly translucent ellipses — replace with layered soft-edged painterly clouds.

PROOF REQUIREMENTS (do all):
- Serve app/ on port 8099, screenshot ?shot=cover at 1280x720 with /root/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome --headless=new --no-sandbox --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --hide-scrollbars --window-size=1280,720 --virtual-time-budget=8000 --screenshot=screenshots/01-cover.png
- After taking it, READ the file size and pixel sample the centre: if the rendered pixels do not show the new layout (e.g. sample where panels borders should be), debug the wiring and iterate. Up to 3 iterations.
- Keep every screenshot <=256KiB (use JPEG export inside the app's shot pipeline or reduce canvas resolution before encode; do not just hope).
- Retake 02/03/04 so all four differ, <=256KiB each.
- Re-run the main.ts test (mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts && ls out && rm -rf out).
- git add -A && git commit -m "Wire key-art template into cover shot, fix glyphs, richer figures" && git push origin master.
