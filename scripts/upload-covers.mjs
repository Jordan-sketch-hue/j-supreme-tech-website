import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FINAL = path.join(__dirname, '..', 'public', 'products', 'mockups', 'final');
const TOKEN = 'TkL3JoMooW2ihHLCWcaXV0eWW6c5Xr41C-Ri_uU4bxw';

const products = [
  { id: 'n2gDhx5QrvKJSVWbGyRJIw==', slug: 'founders-launch-playbook',    name: "Founder's Launch Playbook" },
  { id: 'GmCDJvvmitjavPGIqUznSQ==', slug: 'nextjs-pro-starter-guide',    name: "Next.js Pro Starter Kit" },
  { id: 'KWTIknjB8s6Ch0ukdCChGQ==', slug: 'courier-app-guide',           name: "Courier App Template" },
  { id: 'bfJaJi3tpEXBzBTQ72oVtA==', slug: 'booking-app-guide',           name: "Booking App Template" },
  { id: 'BTTyAdSwQbqLTfRfcr9D7w==', slug: 'supreme-suite-guide',         name: "Supreme Suite" },
  { id: 'BRtdZQcP5hdGPLs4y6r15w==', slug: 'done-for-you-website-guide',  name: "Done-For-You Website" },
  { id: 'CdsTP-jg2ZekrRKEnmawPw==', slug: '90-day-content-calendar',     name: "90-Day Content Calendar" },
  { id: 'mNZ5b2dIKqHkYiz7K9_NDg==', slug: 'brand-starter-kit',           name: "Brand Starter Kit" },
  { id: '2fgbRo_nlXod31aojHXUSQ==', slug: 'website-template-guide',      name: "Business Website Template" },
  { id: 'ZnSAd-fae2bBUY6i-CGPrQ==', slug: 'jst-academy-monthly',         name: "JST Academy Monthly" },
];

async function uploadCover(product) {
  const imgPath = path.join(FINAL, `${product.slug}-mockup.png`);
  const buf = readFileSync(imgPath);
  const blob = new Blob([buf], { type: 'image/png' });

  const form = new FormData();
  form.append('cover', blob, `${product.slug}-mockup.png`);

  const res = await fetch(
    `https://api.gumroad.com/v2/products/${encodeURIComponent(product.id)}`,
    {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${TOKEN}` },
      body: form,
    }
  );

  const data = await res.json();
  if (data.success) {
    const cover = data.product?.covers?.[0];
    console.log(`OK  ${product.name}`);
    if (cover) console.log(`    cover: ${cover.url}`);
  } else {
    console.log(`ERR ${product.name}: ${JSON.stringify(data.message || data)}`);
  }
}

async function main() {
  console.log('Uploading cover images to Gumroad...\n');
  for (const p of products) {
    await uploadCover(p);
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log('\nDone.');
}

main().catch(console.error);
