"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    let raf = 0;
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", move);

    const tick = () => {
      dot.current!.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.current!.style.transform = `translate(${rx - 16}px,${ry - 16}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const addHover = () => ring.current?.classList.add("scale-150");
    const rmHover = () => ring.current?.classList.remove("scale-150");
    document.querySelectorAll("a,button,[data-cursor-hover]").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", rmHover);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-ink-900 mix-blend-difference"
        aria-hidden
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-ink-900/40 transition-transform duration-200 mix-blend-difference"
        aria-hidden
      />
    </>
  );
}
