"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = window.localStorage.getItem('cookieConsent');
    window.requestAnimationFrame(() => setShowBanner(!consent));
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (showBanner !== true) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-ink-950 px-6 py-4 shadow-[0_-8px_32px_-8px_rgba(0,0,0,0.5)]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="flex-1 font-mono text-xs leading-6 tracking-wide text-white/55">
          We use cookies to enhance your experience, serve personalized content, and analyze traffic.
          By clicking "Accept", you consent to our use of cookies.{' '}
          <Link href="/legal" className="text-white/80 underline underline-offset-4 hover:text-white transition-colors">
            Legal Center
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={declineCookies}
            className="btn btn-ghost-dark px-5 py-2 text-xs"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="btn btn-on-dark px-5 py-2 text-xs"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
