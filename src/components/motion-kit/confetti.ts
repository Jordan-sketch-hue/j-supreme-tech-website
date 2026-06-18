import confetti from "canvas-confetti";

type ConfettiOptions = NonNullable<Parameters<typeof confetti>[0]>;

/** One celebratory burst. Call from any client-side event handler. */
export function fireConfetti(options?: ConfettiOptions) {
  if (typeof window === "undefined") return;
  void confetti({ particleCount: 90, spread: 75, origin: { y: 0.7 }, ...options });
}

/** Bursts from both bottom corners toward the middle — order-success moments. */
export function confettiCannons() {
  if (typeof window === "undefined") return;
  void confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.9 } });
  void confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.9 } });
}

/** Random fireworks across the top half of the screen for `durationMs`. */
export function fireworks(durationMs = 1800) {
  if (typeof window === "undefined") return;
  const end = Date.now() + durationMs;
  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }
    void confetti({
      particleCount: 40,
      startVelocity: 26,
      spread: 360,
      ticks: 60,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
    });
  }, 240);
}
