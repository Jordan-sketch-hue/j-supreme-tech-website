"use client";

import { useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

/** Card with a soft radial light that follows the cursor. Best on dark surfaces. */
export function SpotlightCard({
  children,
  className = "",
  color = "rgba(255, 255, 255, 0.12)",
  radius = 320,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  radius?: number;
}) {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setPos({ x: -9999, y: -9999 })}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition duration-300"
        style={{
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 65%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
