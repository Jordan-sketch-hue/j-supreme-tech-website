/**
 * whatsapp.ts — Twilio WhatsApp API. SERVER ONLY.
 *
 * Required env vars (all optional — soft-fails if missing so provisioning never blocks):
 *   TWILIO_ACCOUNT_SID   — from console.twilio.com
 *   TWILIO_AUTH_TOKEN    — from console.twilio.com
 *   TWILIO_WHATSAPP_FROM — approved WhatsApp sender, e.g. +14155238886
 *
 * Sandbox: use the Twilio WhatsApp Sandbox number and join with "join <word>-<word>".
 */

export interface WaMessage {
  to: string;   // international format: +18765551234 (J supreme: +16582182282)
  body: string;
}

export function waReady(): boolean {
  return !!(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_WHATSAPP_FROM
  );
}

export async function sendWhatsApp({ to, body }: WaMessage): Promise<{ ok: boolean; error?: string }> {
  if (!waReady()) {
    console.log("[whatsapp] not configured — skipping send to", to.slice(0, 5) + "***");
    return { ok: false, error: "unconfigured" };
  }

  const sid = process.env.TWILIO_ACCOUNT_SID!;
  const token = process.env.TWILIO_AUTH_TOKEN!;
  const from = `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`;
  const toWa = `whatsapp:${to.startsWith("+") ? to : `+${to}`}`;

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        },
        body: new URLSearchParams({ To: toWa, From: from, Body: body }).toString(),
      },
    );
    if (!res.ok) {
      const text = await res.text();
      console.error(`[whatsapp] twilio ${res.status}: ${text.slice(0, 200)}`);
      return { ok: false, error: `twilio_${res.status}` };
    }
    return { ok: true };
  } catch (e: any) {
    console.error("[whatsapp] send error:", e?.message);
    return { ok: false, error: "unreachable" };
  }
}
