"use client";

import { useEffect, useState } from "react";

export function TableOfContents({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="hidden xl:block">
      <div className="sticky top-28">
        <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink-400">On this page</p>
        <ul className="mt-4 space-y-1 border-l border-line">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[0.82rem] leading-snug transition ${
                  active === it.id
                    ? "border-ink-900 font-medium text-ink-900"
                    : "border-transparent text-ink-500 hover:text-ink-800"
                }`}
              >
                {it.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
