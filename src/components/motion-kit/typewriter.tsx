"use client";

import { useEffect, useState } from "react";

/** Cycles through words with a typewriter type/delete effect. */
export function Typewriter({
  words,
  typeSpeed = 70,
  deleteSpeed = 45,
  holdMs = 1500,
  cursor = true,
  className = "",
}: {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdMs?: number;
  cursor?: boolean;
  className?: string;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[wordIndex % words.length] ?? "";

    let delay: number;
    if (!deleting && text === current) delay = holdMs;
    else if (deleting && text === "") delay = 250;
    else delay = deleting ? deleteSpeed : typeSpeed;

    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(current.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, holdMs]);

  return (
    <span className={className}>
      {text}
      {cursor && (
        <span className="mk-cursor" aria-hidden>
          |
        </span>
      )}
    </span>
  );
}
