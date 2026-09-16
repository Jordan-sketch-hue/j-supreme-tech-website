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

const ITW_PREFIX = "In Today'\''s World:";
const BROADCASTS_URL = "https://communications.jsupremetech.online/api/newsletter/broadcasts";

function parseIssueNumber(subject: string): number {
  const m = subject.match(/#(\d+)/);
  return m ? Number(m[1]) : 0;
}

function parseHeadline(subject: string): string {
  const m = subject.match(/#\d+\s*[\u2014\-]+\s*(.+)$/);
  return m ? m[1].trim() : subject.replace(ITW_PREFIX, "").trim();
}

function guessCategory(subject: string): string {
  const s = subject.toLowerCase();
  if (s.includes("ai") || s.includes("openai") || s.includes("claude") || s.includes("gemini") || s.includes("gpt")) return "AI";
  if (s.includes("market") || s.includes("stock") || s.includes("bitcoin") || s.includes("crypto") || s.includes("fed")) return "Markets";
  if (s.includes("jamaica") || s.includes("caribbean")) return "Jamaica";
  if (s.includes("tech") || s.includes("apple") || s.includes("google") || s.includes("meta") || s.includes("software")) return "Tech";
  if (s.includes("business") || s.includes("startup") || s.includes("entrepreneur")) return "Business";
  return "World";
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
}

export async function getInTodaysWorldIssues(limit = 50): Promise<InTodaysWorldIssue[]> {
  try {
    const res = await fetch(BROADCASTS_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const { data } = (await res.json()) as {
      data: Array<{
        id: string;
        name: string;
        subject: string;
        status: string;
        sent_at: string | null;
        metrics?: { recipients?: number };
      }>;
    };
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
          topStory: { category, headline, body: "" },
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
  if (issue.resendId) {
    return `https://resend.com/broadcasts/${issue.resendId}`;
  }
  return `https://communications.jsupremetech.online/newsletters/${String(issue.issueNumber).padStart(4, "0")}`;
}