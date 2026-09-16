import "server-only";

export type InTodaysWorldIssue = {
  issueNumber: number;
  dateFormatted: string;
  subject: string;
  topStory: { category: string; headline: string; body: string };
  sentAt?: string;
  recipients?: number;
  resendId?: string;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ITW_PREFIX = "In Today's World:";

/** Parse issue number from subject: "In Today's World: #30 — ..." */
function parseIssueNumber(subject: string): number {
  const m = subject.match(/#(\d+)/);
  return m ? Number(m[1]) : 0;
}

/** Parse headline from subject: "In Today's World: #30 — Headline text" */
function parseHeadline(subject: string): string {
  const m = subject.match(/#\d+\s*[—\-]+\s*(.+)$/);
  return m ? m[1].trim() : subject.replace(ITW_PREFIX, "").trim();
}

/** Guess category from subject keywords */
function guessCategory(subject: string): string {
  const s = subject.toLowerCase();
  if (s.includes("ai") || s.includes("openai") || s.includes("claude") || s.includes("gemini") || s.includes("gpt")) return "AI";
  if (s.includes("market") || s.includes("stock") || s.includes("bitcoin") || s.includes("crypto") || s.includes("fed")) return "Markets";
  if (s.includes("jamaica") || s.includes("caribbean")) return "Jamaica";
  if (s.includes("tech") || s.includes("apple") || s.includes("google") || s.includes("meta") || s.includes("software")) return "Tech";
  if (s.includes("business") || s.includes("startup") || s.includes("entrepreneur")) return "Business";
  return "World";
}

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/** Fetch sent "In Today's World:" newsletters from Resend Broadcasts API */
export async function getInTodaysWorldIssues(limit = 50): Promise<InTodaysWorldIssue[]> {
  if (!RESEND_API_KEY) return [];

  try {
    const res = await fetch("https://api.resend.com/broadcasts", {
      headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const { data } = (await res.json()) as { data: Array<{
      id: string;
      name: string;
      subject: string;
      status: string;
      sent_at: string | null;
      metrics?: { recipients?: number };
    }> };

    if (!Array.isArray(data)) return [];

    const issues: InTodaysWorldIssue[] = data
      .filter((b) => b.status === "sent" && b.subject?.startsWith(ITW_PREFIX) && b.sent_at)
      .slice(0, limit)
      .map((b) => {
        const issueNumber = parseIssueNumber(b.subject);
        const headline = parseHeadline(b.subject);
        const category = guessCategory(b.subject);
        return {
          issueNumber,
          subject: b.subject,
          dateFormatted: formatDate(b.sent_at!),
          sentAt: b.sent_at ?? undefined,
          recipients: b.metrics?.recipients,
          resendId: b.id,
          topStory: {
            category,
            headline,
            body: "",
          },
        };
      })
      .filter((i) => i.issueNumber > 0)
      .sort((a, b) => b.issueNumber - a.issueNumber);

    return issues;
  } catch {
    return [];
  }
}

export function readerUrl(issue: InTodaysWorldIssue): string {
  // Link to the Resend broadcast reader if we have the ID,
  // otherwise fall back to the communications reader
  if (issue.resendId) {
    return `https://resend.com/broadcasts/${issue.resendId}`;
  }
  return `https://communications.jsupremetech.online/newsletters/${String(issue.issueNumber).padStart(4, "0")}`;
}
