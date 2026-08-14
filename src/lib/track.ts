"use client";

export type TrackEvent =
  | "page_view"
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "newsletter_signup"
  | "trial_signup"
  | "intake_submit"
  | "hover_dwell";

export type UTMParams = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

const UTM_SESSION_KEY = "jst_utm";

export function captureUTM(): UTMParams {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const source = p.get("utm_source") ?? undefined;

  if (source) {
    const utm: UTMParams = {
      source,
      medium: p.get("utm_medium") ?? undefined,
      campaign: p.get("utm_campaign") ?? undefined,
      content: p.get("utm_content") ?? undefined,
      term: p.get("utm_term") ?? undefined,
    };
    sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(utm));
    return utm;
  }

  try {
    const stored = sessionStorage.getItem(UTM_SESSION_KEY);
    return stored ? (JSON.parse(stored) as UTMParams) : {};
  } catch {
    return {};
  }
}

export function track(event: TrackEvent, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const utm = captureUTM();
  fetch("/api/track", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      event,
      page: window.location.pathname,
      utm,
      props,
    }),
    keepalive: true,
  }).catch(() => {});
}
