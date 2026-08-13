import { execSync, spawn } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'products', 'mockups', 'shots');
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const products = [
  { slug: 'founders-launch-playbook',    name: 'Founders Launch Playbook',    accent: '#FF3B3B' },
  { slug: 'nextjs-pro-starter-guide',    name: 'Next.js Pro Starter Kit',     accent: '#00B4D8' },
  { slug: 'courier-app-guide',           name: 'Courier App Template',         accent: '#00C853' },
  { slug: 'booking-app-guide',           name: 'Booking App Template',         accent: '#FF3B3B' },
  { slug: 'supreme-suite-guide',         name: 'Supreme Suite',               accent: '#7B2FFF' },
  { slug: 'done-for-you-website-guide',  name: 'Done-For-You Website',         accent: '#00B4D8' },
  { slug: '90-day-content-calendar',     name: '90-Day Content Calendar',      accent: '#FFD700' },
  { slug: 'brand-starter-kit',           name: 'Brand Starter Kit',           accent: '#7B2FFF' },
  { slug: 'website-template-guide',      name: 'Business Website Template',   accent: '#FF8C00' },
  { slug: 'jst-academy-monthly',         name: 'JST Academy Monthly',         accent: '#00B4D8' },
];

async function screenshot(slug) {
  const url = `https://jsupremetech.online/products/${slug}.html`;
  const out = path.join(OUT, `${slug}.png`);
  console.log(`Capturing: ${slug}...`);

  return new Promise((resolve, reject) => {
    const proc = spawn(CHROME, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--hide-scrollbars',
      `--window-size=1280,800`,
      `--screenshot=${out}`,
      url
    ], { stdio: 'pipe' });

    proc.on('close', (code) => {
      if (existsSync(out)) {
        console.log(`  -> saved: ${out}`);
        resolve(out);
      } else {
        console.log(`  -> FAILED (code ${code})`);
        reject(new Error(`screenshot failed for ${slug}`));
      }
    });
    proc.on('error', reject);

    // kill after 20s
    setTimeout(() => { try { proc.kill(); } catch(e){} reject(new Error('timeout')); }, 20000);
  });
}

async function main() {
  const results = [];
  for (const p of products) {
    try {
      const file = await screenshot(p.slug);
      results.push({ ...p, file, ok: true });
      // small delay between screenshots
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`ERROR: ${p.slug} - ${e.message}`);
      results.push({ ...p, ok: false });
    }
  }

  const ok = results.filter(r => r.ok).length;
  console.log(`\nDone: ${ok}/${products.length} screenshots captured`);
  console.log('Output folder:', OUT);
}

main().catch(console.error);
