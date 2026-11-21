# ART DIRECTION — cover-art upgrade (the artifact must look like a real key-art poster)

The judged artifact is the app's exported cover. The current one loses judge duels against entries that look like real movie key art (five labelled character panels, giant chrome-gradient title, subtitle, credits strip, barcode, laurel badge). Upgrade the app so its exported 1920x1080 poster looks like that, using PIL-generated painterly art (no photos available, no font files).

## Demo photo (tools/make-demo.py, PIL)
Generate a 1920x1200 painterly illustrated scene, far richer than the current one: a coastal boulevard at magic hour — layered gradient sky (deep indigo -> violet -> hot orange), big sun with glow rings and light rays, cumulus clouds with rim light, city skyline with lit windows, palm trees swaying, a wet road with reflections, THREE distinct large character silhouettes placed for panel crops: (a) a woman with sunglasses leaning on a convertible (left), (b) a man in a fedora facing away (center, larger), (c) a bearded man in a bucket hat (right), each with warm rim lighting and visible colour accents (red jacket, cream coat, teal shirt). Add subtle canvas texture. Verify not flat (print per-region stats).

## Poster composition (cover.js / poster-layout.js / caption-lettering.js / colour-grade.js)
Rebuild the exported-cover layout to a key-art template:
- Full-bleed poster, thin double border frame with a warm cream colour.
- 5 angled panels: top-left large (driver), top-center largest (fedora man), top-right (captain), bottom-left (rider - a motorcyclist silhouette crop from the scene), bottom-right (fixer - the city/pier crop). Panels with warm borders, slight perspective skew and distinct treatments (one halftone, one ink-outline, rest duotone with different hue shifts), separated by cream gutters.
- Label chips on each panel: "THE DRIVER", "THE MECHANIC", "THE CAPTAIN", "THE RIDER", "THE FIXER" - small dark chips with white uppercase text, bottom-left of each panel.
- Title: "SUNSET HEIST" in giant chrome-gradient letters (cream -> gold -> orange vertical gradient, thick dark outline, slight arch/skew, drop shadow) across the middle-bottom, with a script-style subtitle line "Paid in Sunsets" (italic, neon pink with glow) below it, and a small red banner strip reading "EVERYONE WANTS A CUT OF THE SUNSET".
- Top strip: five stars + a review quote "THE HOTTEST RIDE OF THE YEAR" - SUNSET GAZETTE, and a VOL. 1 badge top-right.
- Laurel badge circle bottom-right: "BEST CAST".
- Bottom credits strip: "A SUNSET PICTURES PRODUCTION IN ASSOCIATION WITH PALM & PISTOL - SUNSET HEIST - MUSIC BY THE NIGHT SHIFT ORCHESTRA" in small caps, plus a fake barcode (black bars of varying widths) bottom-right corner and "COMING SOON" bottom-left.
- The composition code must work for ANY user photo: panels crop different regions of the source image; labels/title/badges always drawn on top.

## Rules
- No external assets, no font files, no network: draw lettering with canvas paths/bold generic fonts (Impact/Arial Black stacks are fine for UI; the poster lettering should be drawn via the lettering module's path-based chrome gradient).
- Keep the app functional: editor, caption editing, export sizes still work.
- Every demo caption says "SUNSET HEIST" (never a GTA game name).

## Verify & ship
- Serve app/ on 8099; retake the four screenshots (1280x720, <=256KiB, all different): 01-cover.png (?shot=cover) must show the new key-art poster filling the frame edge to edge - if it is not striking, iterate on colours/spacing until it is; 02-editor, 03-caption, 04-export show the working app.
- Test main.ts (mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts && ls out && rm -rf out).
- git add -A && git commit -m "Key-art poster template: labelled panels, chrome title, credits" && git push origin master.
