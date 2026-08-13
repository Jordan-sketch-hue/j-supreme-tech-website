/**
 * Sets preview_url on each Gumroad product pointing to the hosted mockup PNG.
 * Gumroad v2 API does not support direct file upload for cover images via API —
 * the preview_url field is the correct approach (linked image appears as product cover).
 */

const TOKEN = 'TkL3JoMooW2ihHLCWcaXV0eWW6c5Xr41C-Ri_uU4bxw';
const BASE_URL = 'https://jsupremetech.online/products/mockups/final';

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

async function setPreview(product) {
  const imageUrl = `${BASE_URL}/${product.slug}-mockup.png`;

  const body = new URLSearchParams({ preview_url: imageUrl });

  const res = await fetch(`https://api.gumroad.com/v2/products/${encodeURIComponent(product.id)}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const data = await res.json();
  if (data.success) {
    console.log(`OK  ${product.name}`);
    console.log(`    preview_url: ${imageUrl}`);
  } else {
    console.log(`ERR ${product.name}: ${JSON.stringify(data.message || data)}`);
  }
}

async function main() {
  console.log('Uploading product preview images to Gumroad...\n');
  for (const p of products) {
    await setPreview(p);
    await new Promise(r => setTimeout(r, 400));
  }
  console.log('\nDone.');
}

main().catch(console.error);
