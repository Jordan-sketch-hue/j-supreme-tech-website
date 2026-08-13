// POST /v2/products/:id/covers with url param — Gumroad fetches the image itself
const TOKEN = 'TkL3JoMooW2ihHLCWcaXV0eWW6c5Xr41C-Ri_uU4bxw';
const BASE = 'https://jsupremetech.online/products/mockups/final';
const SHOTS = 'https://jsupremetech.online/products/mockups/shots';

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

async function addCover(productId, url) {
  const body = new URLSearchParams({ url });
  const res = await fetch(
    `https://api.gumroad.com/v2/products/${encodeURIComponent(productId)}/covers`,
    { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() }
  );
  return res.json();
}

async function main() {
  for (const p of products) {
    console.log(`\n${p.name}`);

    // Cover 1: raw page screenshot
    const r1 = await addCover(p.id, `${SHOTS}/${p.slug}.png`);
    console.log(`  Screenshot: ${r1.success ? 'OK -> ' + r1.cover?.url : 'FAIL: ' + JSON.stringify(r1.message)}`);
    await new Promise(r => setTimeout(r, 600));

    // Cover 2: laptop+phone mockup
    const r2 = await addCover(p.id, `${BASE}/${p.slug}-mockup.png`);
    console.log(`  Mockup:     ${r2.success ? 'OK -> ' + r2.cover?.url : 'FAIL: ' + JSON.stringify(r2.message)}`);
    await new Promise(r => setTimeout(r, 600));
  }
  console.log('\nDone.');
}

main().catch(console.error);
