"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";
import type { SubscribeCoupon } from "./forms";

const CLEAR_THRESHOLD = 0.5; // reveal once ~half the surface is scratched away

export function ScratchCoupon({ coupon }: { coupon: SubscribeCoupon }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [revealed, setRevealed] = useState(coupon.alreadyRedeemed);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = "#141414";
      ctx.fillRect(0, 0, width, height);
      ctx.font = "600 12px monospace";
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.textAlign = "center";
      ctx.fillText("SCRATCH TO REVEAL", width / 2, height / 2 + 4);
    };
    draw();

    function pos(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function erase(x: number, y: number) {
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.beginPath();
      ctx!.arc(x, y, 22, 0, Math.PI * 2);
      ctx!.fill();
    }

    function checkCleared() {
      const { width, height } = canvas!;
      if (!width || !height) return;
      const data = ctx!.getImageData(0, 0, width, height).data;
      let clear = 0;
      for (let i = 3; i < data.length; i += 4 * 16) {
        if (data[i] === 0) clear++;
      }
      const sampled = data.length / (4 * 16);
      if (clear / sampled > CLEAR_THRESHOLD) setRevealed(true);
    }

    function onDown(e: PointerEvent) {
      drawingRef.current = true;
      const { x, y } = pos(e);
      erase(x, y);
    }
    function onMove(e: PointerEvent) {
      if (!drawingRef.current) return;
      const { x, y } = pos(e);
      erase(x, y);
      checkCleared();
    }
    function onUp() {
      drawingRef.current = false;
      checkCleared();
    }

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [revealed]);

  function copyCode() {
    navigator.clipboard?.writeText(coupon.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const expiresLabel = new Date(coupon.expiresAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="text-center">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-500">
        Subscribers are unlocking 15–35% off their next checkout
      </p>
      <div className="relative mx-auto mt-4 h-28 max-w-[280px] overflow-hidden rounded-2xl border border-line">
        {/* What's underneath the scratch layer */}
        <div className="flex h-full w-full flex-col items-center justify-center bg-ink-950 text-white">
          <span className="flex items-center gap-1.5 font-display text-3xl font-bold">
            <Sparkles className="h-5 w-5 text-white/70" />
            {coupon.discountPercent}% OFF
          </span>
          <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/50">
            Your next checkout
          </span>
        </div>
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full cursor-pointer touch-none"
            aria-hidden
          />
        )}
      </div>

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-400 underline underline-offset-4 hover:text-ink-900"
        >
          Not into scratching? Tap to reveal
        </button>
      ) : (
        <div className="mt-4">
          <p className="text-sm text-ink-600">
            {coupon.alreadyRedeemed
              ? "This code has already been used — thanks for coming back."
              : `Locked in — use this code at checkout, valid until ${expiresLabel}.`}
          </p>
          <button
            type="button"
            onClick={copyCode}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-ink-900 bg-ink-950 px-5 py-2.5 font-mono text-sm font-semibold tracking-[0.1em] text-white transition hover:bg-ink-800"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {coupon.code}
          </button>
        </div>
      )}
    </div>
  );
}
