"use client";

import { useState } from "react";
import { Building2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const OWNER_WA = "16582182282";

const BANKS = [
  {
    id: "ncb",
    name: "NCB",
    fullName: "National Commercial Bank",
    branch: "Old Harbor Branch",
    accountName: "Jordan Morris",
    accountType: "Savings",
    accountNumber: process.env.NEXT_PUBLIC_NCB_ACCOUNT ?? "874520241",
  },
  {
    id: "scotia",
    name: "Scotiabank",
    fullName: "Scotiabank Jamaica",
    branch: "Transit: 20255",
    accountName: "Jordan Morris",
    accountType: "Savings",
    accountNumber: process.env.NEXT_PUBLIC_SCOTIA_ACCOUNT ?? "935609",
  },
];

export function BankTransferButton({
  slug,
  pkg,
  planName,
  amountLabel,
}: {
  slug: string;
  pkg: string;
  planName: string;
  amountLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  function confirmTransfer(bankId: string) {
    const bank = BANKS.find((b) => b.id === bankId);
    if (!bank) return;

    const msg = encodeURIComponent(
      `Hi! I just made a bank transfer payment.\n\n` +
        `Service: ${planName}\n` +
        `Amount: ${amountLabel}\n` +
        `Bank paid to: ${bank.fullName}\n` +
        `Account: ${bank.accountNumber}\n\n` +
        `Please confirm receipt and next steps.`,
    );

    window.open(`https://wa.me/${OWNER_WA}?text=${msg}`, "_blank");
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-full border border-line px-4 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink-600 transition hover:border-ink-900 hover:text-ink-900"
      >
        <span className="flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5" />
          Pay via Bank Transfer
        </span>
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>

      {open && (
        <div className="mt-2 space-y-2 rounded-2xl border border-line p-3">
          <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400">
            Select a bank — transfer the amount, then confirm below
          </p>

          {BANKS.map((bank) => (
            <button
              key={bank.id}
              type="button"
              onClick={() => setSelected(bank.id === selected ? null : bank.id)}
              className={`w-full rounded-xl border p-3 text-left transition ${
                selected === bank.id
                  ? "border-ink-900 bg-ink-50"
                  : "border-line bg-white hover:border-ink-400"
              }`}
            >
              <p className="font-display text-sm font-bold text-ink-900">{bank.name}</p>
              <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink-500">
                {bank.fullName} · {bank.branch}
              </p>
              <div className="mt-2 space-y-0.5">
                <Row label="Account Name" value={bank.accountName} />
                <Row label="Account Type" value={bank.accountType} />
                <Row label="Account #" value={bank.accountNumber} copyable />
              </div>
            </button>
          ))}

          {selected && (
            <button
              type="button"
              onClick={() => confirmTransfer(selected)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink-950 py-2.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-ink-800"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              I&apos;ve transferred — confirm on WhatsApp
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  copyable,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) {
  function copy() {
    navigator.clipboard.writeText(value).catch(() => {});
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink-400">
        {label}
      </span>
      <span className="flex items-center gap-1 font-mono text-[0.65rem] font-semibold text-ink-900">
        {value}
        {copyable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              copy();
            }}
            className="ml-1 rounded border border-line px-1 py-px font-mono text-[0.55rem] uppercase tracking-[0.08em] text-ink-400 hover:border-ink-900 hover:text-ink-900"
          >
            copy
          </button>
        )}
      </span>
    </div>
  );
}
