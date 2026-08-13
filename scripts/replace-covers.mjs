/**
 * 1. Fetches each product to get existing cover IDs
 * 2. Deletes all existing covers
 * 3. Uploads the laptop+phone mockup PNG as the only cover
 */
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

async function getProduct(id) {
  const res = await fetch(`https://api.gumroad.com/v2/products/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  return res.json();
}

async function deleteCover(productId, coverId) {
  const res = await fetch(
    `https://api.gumroad.com/v2/products/${encodeURIComponent(productId)}/covers/${coverId}`,
    { method: 'DELETE', headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.json();
}

async function uploadMockup(productId, slug) {
  const imgPath = path.join(FINAL, `${slug}-mockup.png`);
  const buf = readFileSync(imgPath);
  const blob = new Blob([buf], { type: 'image/png' });
  const form = new FormData();
  form.append('cover', blob, `${slug}-mockup.png`);

  const res = await fetch(`https://api.gumroad.com/v2/products/${encodeURIComponent(productId)}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: form,
  });
  return res.json();
}

async function main() {
  for (const p of products) {
    console.log(`\n${p.name}`);

    // 1. Get current covers
    const { product } = await getProduct(p.id);
    const covers = product?.covers || [];
    console.log(`  Found ${covers.length} existing cover(s)`);

    // 2. Delete all existing covers
    for (const cover of covers) {
      const del = await deleteCover(p.id, cover.id);
      console.log(`  Deleted cover ${cover.id}: ${del.success ? 'OK' : JSON.stringify(del)}`);
      await new Promise(r => setTimeout(r, 300));
    }

    // 3. Upload mockup as new cover
    const up = await uploadMockup(p.id, p.slug);
    if (up.success) {
      const newCover = up.product?.covers?.[0];
      console.log(`  Uploaded mockup -> ${newCover?.url}`);
    } else {
      console.log(`  Upload failed: ${JSON.stringify(up.message || up)}`);
    }

    await new Promise(r => setTimeout(r, 800));
  }
  console.log('\nAll done.');
}

main().catch(console.error);
