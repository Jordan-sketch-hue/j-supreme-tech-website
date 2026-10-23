"use client";

import { useState } from "react";
import { Building2, ChevronDown, ChevronUp } from "lucide-react";

const OWNER_WA = "16582182282";

function BankTransferSuite({ systemSlug, tier, amountUsd, planName }: {
  systemSlug: string; tier: string; amountUsd: number; planName: string;
}) {
  const [open, setOpen] = useState(false);
  const msg = encodeURIComponent(
    `Hi! I want to subscribe to ${planName} (US$${amountUsd}/mo).\n\nPlease send me bank transfer details to get started.`
  );
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-full border border-line px-4 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink-600 transition hover:border-ink-900 hover:text-ink-900"
      >
        <span className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5" /> Pay via Bank Transfer</span>
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {open && (
        <div className="mt-2 rounded-2xl border border-line p-3 space-y-2">
          <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400">
            NCB or Scotiabank \u2014 message Jordan for account details
          </p>
          <a
            href={`https://wa.me/${OWNER_WA}?text=${msg}`}
            target="_blank" rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink-950 py-2.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-ink-800"
          >
            Get bank details on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

export function SuitePayButton({ systemSlug, tier, amountUsd, planName }: {
  systemSlug: string; tier: string; amountUsd: number; planName: string;
}) {
  return (
    <div className="w-full space-y-2">
      <BankTransferSuite systemSlug={systemSlug} tier={tier} amountUsd={amountUsd} planName={planName} />
    </div>
  );
}