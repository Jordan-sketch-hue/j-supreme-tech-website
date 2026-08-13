const TOKEN = 'TkL3JoMooW2ihHLCWcaXV0eWW6c5Xr41C-Ri_uU4bxw';
const BASE = 'https://jsupremetech.online/products/mockups/proof';

const products = [
  { id: 'n2gDhx5QrvKJSVWbGyRJIw==', slug: 'founders-launch-playbook' },
  { id: 'GmCDJvvmitjavPGIqUznSQ==', slug: 'nextjs-pro-starter-guide' },
  { id: 'KWTIknjB8s6Ch0ukdCChGQ==', slug: 'courier-app-guide' },
  { id: 'bfJaJi3tpEXBzBTQ72oVtA==', slug: 'booking-app-guide' },
  { id: 'BTTyAdSwQbqLTfRfcr9D7w==', slug: 'supreme-suite-guide' },
  { id: 'BRtdZQcP5hdGPLs4y6r15w==', slug: 'done-for-you-website-guide' },
  { id: 'CdsTP-jg2ZekrRKEnmawPw==', slug: '90-day-content-calendar' },
  { id: 'mNZ5b2dIKqHkYiz7K9_NDg==', slug: 'brand-starter-kit' },
  { id: '2fgbRo_nlXod31aojHXUSQ==', slug: 'website-template-guide' },
  { id: 'ZnSAd-fae2bBUY6i-CGPrQ==', slug: 'jst-academy-monthly' },
];

async function addCover(productId, url) {
  const r = await fetch(`https://api.gumroad.com/v2/products/${encodeURIComponent(productId)}/covers`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ url }).toString(),
  });
  return r.json();
}

for (const p of products) {
  const url = `${BASE}/${p.slug}.png`;
  console.log(`Uploading proof cover: ${p.slug}`);
  const res = await addCover(p.id, url);
  if (res.success) {
    console.log(`  OK — cover id: ${res.cover?.id || 'n/a'}`);
  } else {
    console.log(`  FAIL: ${JSON.stringify(res)}`);
  }
  await new Promise(r => setTimeout(r, 600));
}

console.log('\nDone. Check Gumroad — each product should now have 2 covers.');
