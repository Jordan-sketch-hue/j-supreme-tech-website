import { ADSENSE_CLIENT } from "@/lib/ads";

/*
  Serves /ads.txt (Authorized Digital Sellers). Google checks this file to confirm
  J Supreme Tech authorizes Google to sell its ad inventory — required for AdSense
  to serve and pay out. Generated from the publisher id so it can never drift.

  The publisher id in ads.txt drops the "ca-" prefix: ca-pub-123 -> pub-123.
  f08c47fec0942fa0 is Google's fixed certification-authority id.
*/

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const pub = ADSENSE_CLIENT.replace(/^ca-/, ""); // ca-pub-XXXX -> pub-XXXX
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# ads.txt — set NEXT_PUBLIC_ADSENSE_CLIENT to publish the Google AdSense seller line\n";

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
