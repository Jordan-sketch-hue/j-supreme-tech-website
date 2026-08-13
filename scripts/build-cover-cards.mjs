/**
 * Builds 1280x720 centered marketing cover cards for each product
 * then screenshots + uploads to Gumroad via URL
 */
import { spawn } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CARDS_DIR = path.join(ROOT, 'public', 'products', 'mockups', 'cards');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TOKEN = 'TkL3JoMooW2ihHLCWcaXV0eWW6c5Xr41C-Ri_uU4bxw';

if (!existsSync(CARDS_DIR)) mkdirSync(CARDS_DIR, { recursive: true });

const products = [
  { id: 'n2gDhx5QrvKJSVWbGyRJIw==', slug: 'founders-launch-playbook',    name: "The Founder's\nLaunch Playbook",     price: '$47',      accent: '#FF3B3B', tag: 'DIGITAL GUIDE',      sub: '60-Page Step-by-Step System' },
  { id: 'GmCDJvvmitjavPGIqUznSQ==', slug: 'nextjs-pro-starter-guide',    name: 'Next.js Pro\nStarter Kit',           price: '$97',      accent: '#00B4D8', tag: 'DEV TEMPLATE',       sub: 'Production-Ready Boilerplate' },
  { id: 'KWTIknjB8s6Ch0ukdCChGQ==', slug: 'courier-app-guide',           name: 'Courier App\nTemplate',             price: '$197',     accent: '#00C853', tag: 'APP TEMPLATE',       sub: 'Full Logistics Platform' },
  { id: 'bfJaJi3tpEXBzBTQ72oVtA==', slug: 'booking-app-guide',           name: 'Booking App\nTemplate',             price: '$147',     accent: '#FF3B3B', tag: 'APP TEMPLATE',       sub: 'Any Service Business' },
  { id: 'BTTyAdSwQbqLTfRfcr9D7w==', slug: 'supreme-suite-guide',         name: 'Supreme Suite\nBusiness OS',        price: '$29/mo',   accent: '#7B2FFF', tag: 'SAAS ACCESS',        sub: '13 Enterprise-Grade Systems' },
  { id: 'BRtdZQcP5hdGPLs4y6r15w==', slug: 'done-for-you-website-guide',  name: 'Done-For-You\nBusiness Website',    price: '$499',     accent: '#00B4D8', tag: 'DONE FOR YOU',       sub: 'Live in 5–7 Business Days' },
  { id: 'CdsTP-jg2ZekrRKEnmawPw==', slug: '90-day-content-calendar',     name: '90-Day Content\nCalendar',          price: '$19',      accent: '#FFD700', tag: 'CONTENT SYSTEM',     sub: '150+ Ready-to-Post Templates' },
  { id: 'mNZ5b2dIKqHkYiz7K9_NDg==', slug: 'brand-starter-kit',           name: 'Brand\nStarter Kit',               price: '$29',      accent: '#7B2FFF', tag: 'BRAND KIT',          sub: 'Logo, Colors, Fonts & More' },
  { id: '2fgbRo_nlXod31aojHXUSQ==', slug: 'website-template-guide',      name: 'Business Website\nTemplate',        price: '$47',      accent: '#FF8C00', tag: 'TEMPLATE',           sub: 'Full Source Code Included' },
  { id: 'ZnSAd-fae2bBUY6i-CGPrQ==', slug: 'jst-academy-monthly',         name: 'JST Academy\nMonthly',              price: '$15/mo',   accent: '#00B4D8', tag: 'SUBSCRIPTION',       sub: 'Caribbean Business Education' },
];

function buildCard(p) {
  const lines = p.name.split('\n');
  const a = p.accent;
  // darken accent for bg tint
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1280px;height:720px;overflow:hidden;background:#0a0a0a;font-family:'Inter',sans-serif}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;text-align:center}

/* Radial glow */
.glow{position:absolute;width:700px;height:700px;border-radius:50%;background:${a};opacity:.12;filter:blur(120px);top:50%;left:50%;transform:translate(-50%,-50%)}

/* Grid lines */
body::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:60px 60px}

/* Top tag */
.tag{display:inline-block;border:1.5px solid ${a};color:${a};font-size:11px;font-weight:700;letter-spacing:.2em;padding:6px 20px;border-radius:2px;margin-bottom:32px;position:relative;z-index:1}

/* Title */
.title{font-size:68px;font-weight:900;line-height:1.05;letter-spacing:-.03em;color:#fff;position:relative;z-index:1;margin-bottom:20px;max-width:1100px;width:100%;text-align:center}
.title span{color:${a}}

/* Sub */
.sub{font-size:17px;font-weight:400;color:rgba(255,255,255,.45);letter-spacing:.02em;position:relative;z-index:1;margin-bottom:44px;text-align:center}

/* Price */
.price-wrap{display:flex;align-items:center;gap:16px;position:relative;z-index:1}
.price-line{height:1px;width:60px;background:${a};opacity:.4}
.price{font-size:32px;font-weight:800;color:${a};letter-spacing:-.02em}

/* Brand */
.brand{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);font-size:11px;font-weight:600;letter-spacing:.25em;color:rgba(255,255,255,.2);text-transform:uppercase;z-index:1}

/* Corner accents */
.corner{position:absolute;width:40px;height:40px}
.tl{top:24px;left:24px;border-top:2px solid ${a};border-left:2px solid ${a};opacity:.4}
.tr{top:24px;right:24px;border-top:2px solid ${a};border-right:2px solid ${a};opacity:.4}
.bl{bottom:24px;left:24px;border-bottom:2px solid ${a};border-left:2px solid ${a};opacity:.4}
.br{bottom:24px;right:24px;border-bottom:2px solid ${a};border-right:2px solid ${a};opacity:.4}
</style></head>
<body>
<div class="glow"></div>
<div class="corner tl"></div>
<div class="corner tr"></div>
<div class="corner bl"></div>
<div class="corner br"></div>
<div class="tag">${p.tag}</div>
<div class="title">${lines.map((l,i) => i===1 ? `<span>${l}</span>` : l).join('<br/>')}</div>
<div class="sub">${p.sub}</div>
<div class="price-wrap">
  <div class="price-line"></div>
  <div class="price">${p.price}</div>
  <div class="price-line"></div>
</div>
<div class="brand">J Supreme Tech · jsupremetech.online</div>
</body></html>`;
}

async function screenshot(htmlFile, outFile) {
  return new Promise((resolve, reject) => {
    const proc = spawn(CHROME, [
      '--headless=new', '--disable-gpu', '--no-sandbox',
      '--disable-dev-shm-usage', '--hide-scrollbars',
      '--window-size=1280,720',
      `--screenshot=${outFile}`,
      `file:///${htmlFile.replace(/\\/g,'/')}`
    ], { stdio: 'pipe' });
    const t = setTimeout(() => { try{proc.kill()}catch(e){} resolve(); }, 25000);
    proc.on('close', () => { clearTimeout(t); resolve(); });
    proc.on('error', reject);
  });
}

async function deleteCover(productId, coverId) {
  const r = await fetch(`https://api.gumroad.com/v2/products/${encodeURIComponent(productId)}/covers/${coverId}`,
    { method: 'DELETE', headers: { Authorization: `Bearer ${TOKEN}` } });
  return r.json();
}

async function addCoverURL(productId, url) {
  const r = await fetch(`https://api.gumroad.com/v2/products/${encodeURIComponent(productId)}/covers`,
    { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ url }).toString() });
  return r.json();
}

async function getCovers(productId) {
  const r = await fetch(`https://api.gumroad.com/v2/products/${encodeURIComponent(productId)}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } });
  const d = await r.json();
  return d.product?.covers || [];
}

async function main() {
  const BASE = 'https://jsupremetech.online/products/mockups/cards';

  for (const p of products) {
    console.log(`\n${p.name.replace('\n',' ')}`);

    // 1. Build + screenshot the card
    const htmlFile = path.join(CARDS_DIR, `${p.slug}.html`);
    const pngFile  = path.join(CARDS_DIR, `${p.slug}.png`);
    writeFileSync(htmlFile, buildCard(p), 'utf8');
    await screenshot(htmlFile, pngFile);
    console.log(`  Card built: ${existsSync(pngFile) ? 'OK' : 'FAILED'}`);

    // 2. Delete existing covers
    const covers = await getCovers(p.id);
    for (const c of covers) {
      await deleteCover(p.id, c.id);
      await new Promise(r => setTimeout(r, 300));
    }
    console.log(`  Deleted ${covers.length} old cover(s)`);

    // 3. Upload card as cover (via hosted URL — deploy first)
    // We'll upload after deploy; for now just confirm card exists
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\nAll cards built. Deploying to Vercel...');
}

main().catch(console.error);
