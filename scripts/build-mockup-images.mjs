/**
 * Builds standalone laptop+phone mockup HTML pages for each product,
 * then screenshots them with headless Chrome.
 * Output: public/products/mockups/final/<slug>-mockup.png  (1400x880)
 */
import { execSync, spawn } from 'child_process';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SHOTS = path.join(ROOT, 'public', 'products', 'mockups', 'shots');
const HTML_DIR = path.join(ROOT, 'public', 'products', 'mockups', 'frames');
const OUT = path.join(ROOT, 'public', 'products', 'mockups', 'final');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

for (const d of [HTML_DIR, OUT]) {
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
}

const products = [
  { slug: 'founders-launch-playbook',    name: "The Founder's Launch Playbook", price: '$47',      accent: '#FF3B3B' },
  { slug: 'nextjs-pro-starter-guide',    name: 'Next.js Pro Starter Kit',       price: '$97',      accent: '#00B4D8' },
  { slug: 'courier-app-guide',           name: 'Courier App Template',           price: '$197',     accent: '#00C853' },
  { slug: 'booking-app-guide',           name: 'Booking App Template',           price: '$147',     accent: '#FF3B3B' },
  { slug: 'supreme-suite-guide',         name: 'Supreme Suite Business OS',      price: '$29/mo',   accent: '#7B2FFF' },
  { slug: 'done-for-you-website-guide',  name: 'Done-For-You Business Website',  price: '$499',     accent: '#00B4D8' },
  { slug: '90-day-content-calendar',     name: '90-Day Social Media Calendar',   price: '$19',      accent: '#FFD700' },
  { slug: 'brand-starter-kit',           name: 'Brand Starter Kit',              price: '$29',      accent: '#7B2FFF' },
  { slug: 'website-template-guide',      name: 'Business Website Template',      price: '$47',      accent: '#FF8C00' },
  { slug: 'jst-academy-monthly',         name: 'JST Academy Monthly',            price: '$15/mo',   accent: '#00B4D8' },
];

function toDataURI(filepath) {
  const buf = readFileSync(filepath);
  return 'data:image/png;base64,' + buf.toString('base64');
}

function buildHTML(p) {
  const shotPath = path.join(SHOTS, `${p.slug}.png`);
  const dataURI = toDataURI(shotPath);
  const a = p.accent;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1400px;height:880px;overflow:hidden;background:radial-gradient(ellipse at 50% 60%,#1a1a2e 0%,#0d0d0d 70%)}
body{display:flex;align-items:center;justify-content:center;gap:40px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;position:relative}

/* Background glow */
body::before{content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:${a};opacity:.06;filter:blur(80px);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}

/* LAPTOP */
.laptop{position:relative;flex-shrink:0}
.laptop-screen{width:640px;background:#111;border-radius:14px 14px 0 0;border:3px solid #2a2a2a;padding:10px 10px 0;box-shadow:0 0 60px rgba(0,0,0,.8),inset 0 0 0 1px #333}
.laptop-camera{width:7px;height:7px;background:#222;border-radius:50%;margin:0 auto 8px;display:block;border:1px solid #333}
.laptop-inner{width:100%;height:352px;border-radius:3px;overflow:hidden;position:relative;background:#fff}
.laptop-inner img{width:100%;height:auto;display:block}
.laptop-chin{background:linear-gradient(180deg,#1e1e1e,#141414);height:22px;border-radius:0 0 4px 4px;border:3px solid #2a2a2a;border-top:none}
.laptop-base-wrap{display:flex;justify-content:center}
.laptop-base{height:10px;width:88%;background:linear-gradient(180deg,#1e1e1e,#111);border-radius:0 0 12px 12px;border:2px solid #2a2a2a;border-top:none}

/* Reflection line on laptop screen */
.laptop-screen::after{content:'';position:absolute;top:10px;left:10px;right:10px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);border-radius:50%}

/* PHONE */
.phone{flex-shrink:0;position:relative}
.phone-body{width:180px;background:#111;border-radius:36px;border:3px solid #2a2a2a;padding:14px 8px 12px;box-shadow:0 0 40px rgba(0,0,0,.7),inset 0 0 0 1px #333,0 20px 80px rgba(0,0,0,.5)}
.dynamic-island{width:56px;height:12px;background:#000;border-radius:6px;margin:0 auto 10px;display:block;border:1px solid #222}
.phone-inner{width:100%;height:328px;border-radius:20px;overflow:hidden;background:#fff}
.phone-inner img{width:100%;height:auto;display:block}
.phone-home{width:38px;height:5px;background:#222;border-radius:3px;margin:10px auto 0}

/* Side buttons */
.phone-body::before{content:'';position:absolute;right:-5px;top:80px;width:3px;height:50px;background:#1a1a1a;border-radius:2px;box-shadow:0 60px 0 #1a1a1a}
.phone-body::after{content:'';position:absolute;left:-5px;top:70px;width:3px;height:35px;background:#1a1a1a;border-radius:2px;box-shadow:0 45px 0 #1a1a1a,0 90px 0 #1a1a1a}

/* Label */
.label{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);text-align:center;white-space:nowrap}
.label-name{font-size:13px;font-weight:600;color:rgba(255,255,255,.7);letter-spacing:.05em;text-transform:uppercase;margin-bottom:4px}
.label-price{font-size:22px;font-weight:700;color:${a};letter-spacing:-.02em}
.label-badge{display:inline-block;background:${a};color:#000;font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;padding:3px 10px;border-radius:20px;margin-bottom:8px}

/* Accent line under laptop */
.accent-line{width:200px;height:2px;background:linear-gradient(90deg,transparent,${a},transparent);margin:6px auto 0;opacity:.6}
</style>
</head>
<body>
  <div style="position:relative;display:flex;flex-direction:column;align-items:center">
    <div class="laptop">
      <div class="laptop-screen">
        <span class="laptop-camera"></span>
        <div class="laptop-inner">
          <img src="${dataURI}" alt="${p.name}"/>
        </div>
      </div>
      <div class="laptop-chin"></div>
      <div class="laptop-base-wrap"><div class="laptop-base"></div></div>
    </div>
    <div class="accent-line"></div>
  </div>

  <div style="display:flex;flex-direction:column;align-items:center;gap:24px">
    <div class="phone">
      <div class="phone-body">
        <span class="dynamic-island"></span>
        <div class="phone-inner">
          <img src="${dataURI}" alt="${p.name}" style="object-fit:cover;object-position:top center;height:328px;width:100%"/>
        </div>
        <div class="phone-home"></div>
      </div>
    </div>
    <div class="label">
      <div class="label-badge">J Supreme Tech</div><br/>
      <div class="label-name">${p.name}</div>
      <div class="label-price">${p.price}</div>
    </div>
  </div>
</body>
</html>`;
}

async function screenshotHTML(htmlFile, outFile) {
  return new Promise((resolve, reject) => {
    const proc = spawn(CHROME, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--hide-scrollbars',
      '--window-size=1400,880',
      `--screenshot=${outFile}`,
      `file:///${htmlFile.replace(/\\/g,'/')}`
    ], { stdio: 'pipe' });

    const timer = setTimeout(() => { try { proc.kill(); } catch(e){} }, 30000);

    proc.on('close', () => {
      clearTimeout(timer);
      if (existsSync(outFile)) resolve();
      else reject(new Error('no output'));
    });
    proc.on('error', (e) => { clearTimeout(timer); reject(e); });
  });
}

async function main() {
  let ok = 0;
  for (const p of products) {
    const htmlFile = path.join(HTML_DIR, `${p.slug}.html`);
    const outFile  = path.join(OUT, `${p.slug}-mockup.png`);

    console.log(`Building mockup: ${p.slug}...`);
    const html = buildHTML(p);
    writeFileSync(htmlFile, html, 'utf8');

    try {
      await screenshotHTML(htmlFile, outFile);
      const kb = Math.round(existsSync(outFile) ? readFileSync(outFile).length / 1024 : 0);
      console.log(`  -> ${outFile} (${kb} KB)`);
      ok++;
    } catch(e) {
      console.error(`  -> FAILED: ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 800));
  }
  console.log(`\nDone: ${ok}/${products.length} mockup images`);
}

main().catch(console.error);
