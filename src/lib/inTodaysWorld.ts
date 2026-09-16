import "server-only";

const ISSUES_URL = "https://communications.jsupremetech.online/api/newsletter/issues";

export type InTodaysWorldIssue = {
  issueNumber: number;
  dateFormatted: string;
  subject: string;
  topStory: { category: string; headline: string; body: string };
  sentAt?: string;
  recipients?: number;
};

export async function getInTodaysWorldIssues(limit = 50): Promise<InTodaysWorldIssue[]> {
  try {
    const res = await fetch(ISSUES_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const { issues } = (await res.json()) as {
      issues: Array<{ url: string; pathname: string; uploadedAt: string }>;
    };
    if (!Array.isArray(issues) || issues.length === 0) return [];

    const slice = issues.slice(0, limit);
    const settled = await Promise.allSettled(
      slice.map((blob) =>
        fetch(blob.url, { next: { revalidate: 3600 } }).then((r) => r.json())
      )
    );

    return settled
      .filter((r): r is PromiseFulfilledResult<InTodaysWorldIssue> => r.status === "fulfilled")
      .map((r) => r.value)
      .filter((i) => i?.issueNumber > 0)
      .sort((a, b) => b.issueNumber - a.issueNumber);
  } catch {
    return [];
  }
}

export function readerUrl(issue: InTodaysWorldIssue): string {
  return `https://communications.jsupremetech.online/newsletters/${String(issue.issueNumber).padStart(4, "0")}`;
}