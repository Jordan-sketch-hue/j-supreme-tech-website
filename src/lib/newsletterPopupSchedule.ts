"use client";

const VISIT_COUNT_KEY = "jst_visit_count";
const LAST_VISIT_DATE_KEY = "jst_last_visit_date";
const DISMISSED_AT_KEY = "jst_popup_dismissed_at";
const SUBSCRIBED_KEY = "jst_newsletter_subscribed";

const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // one week

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

/** Bumps the visit counter once per calendar day (not per page view) and
 *  returns the running count for this browser. */
export function recordVisit(): number {
  try {
    const today = new Date().toDateString();
    if (localStorage.getItem(LAST_VISIT_DATE_KEY) === today) {
      return Number(localStorage.getItem(VISIT_COUNT_KEY) ?? "0");
    }
    const count = Number(localStorage.getItem(VISIT_COUNT_KEY) ?? "0") + 1;
    localStorage.setItem(VISIT_COUNT_KEY, String(count));
    localStorage.setItem(LAST_VISIT_DATE_KEY, today);
    return count;
  } catch {
    return 0;
  }
}

/** Least-annoyance / most-likely-conversion schedule: show on prime-numbered
 *  visits (3, 5, 7, 11, 13, 17...) — frequent enough to catch attention while
 *  the visitor is still deciding whether this is a repeat destination, then
 *  naturally spacing out as the gaps between primes grow, rather than either
 *  nagging every visit or giving up after one no. Never on visit 1 or 2 (too
 *  early to ask), silenced for a week after a dismissal, and stopped for good
 *  the moment they subscribe. */
export function shouldShowPopup(visitCount: number): boolean {
  if (visitCount < 3 || !isPrime(visitCount)) return false;
  try {
    if (localStorage.getItem(SUBSCRIBED_KEY)) return false;
    const dismissedAt = Number(localStorage.getItem(DISMISSED_AT_KEY) ?? "0");
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_COOLDOWN_MS) return false;
    return true;
  } catch {
    return false;
  }
}

export function recordPopupDismissed(): void {
  try {
    localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function recordNewsletterSubscribed(): void {
  try {
    localStorage.setItem(SUBSCRIBED_KEY, "1");
  } catch {
    /* ignore */
  }
}
