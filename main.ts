import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-app.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Verify required app/index.html exists before packaging
const indexHtmlPath = join(here, 'app', 'index.html');
if (!existsSync(indexHtmlPath)) {
  console.error('CRITICAL ERROR: Missing required application entry point: app/index.html');
  process.exit(1);
}

mkdirSync(out, { recursive: true });
console.log('Cover Studio packaging started: copying application assets and screenshots...');

cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

console.log('Building dossier.json from packaged app tree...');
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 50331648,
    app_path_max_bytes: 1000,
  }),
);

console.log('Cover Studio packaged successfully: dossier.json and app tree generated.');
