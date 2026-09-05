import "server-only";

export type InTodaysWorldIssue = {
  issueNumber: number;
  dateFormatted: string;
  topStory: { category: string; headline: string; body: string };
  sentAt?: string;
  recipients?: number;
};

const ISSUES_LIST_URL = "https://communications.jsupremetech.online/api/newsletter/issues";
const READER_BASE_URL = "https://communications.jsupremetech.online/newsletters";

type BlobRef = { url: string; pathname: string; uploadedAt: string };

function issueNumberFromPathname(pathname: string): number {
  const match = pathname.match(/issue-(\d+)\.json$/);
  return match ? Number(match[1]) : 0;
}

/** "In Today's World:" is a separate app (jst-communications) — this reads
 *  its public archive (Vercel Blob, one JSON file per issue) so past issues
 *  can be surfaced here too. The list endpoint only returns blob metadata,
 *  so each issue's actual content is fetched from its own public blob URL. */
export async function getInTodaysWorldIssues(limit = 24): Promise<InTodaysWorldIssue[]> {
  try {
    const listRes = await fetch(ISSUES_LIST_URL, { next: { revalidate: 3600 } });
    if (!listRes.ok) return [];
    const { issues } = (await listRes.json()) as { issues: BlobRef[] };
    if (!Array.isArray(issues) || issues.length === 0) return [];

    const results = await Promise.all(
      issues.slice(0, limit).map(async (b) => {
        try {
          const res = await fetch(b.url, { next: { revalidate: 3600 } });
          if (!res.ok) return null;
          const data = await res.json();
          return { ...data, issueNumber: data.issueNumber ?? issueNumberFromPathname(b.pathname) } as InTodaysWorldIssue;
        } catch {
          return null;
        }
      }),
    );

    return results.filter((i): i is InTodaysWorldIssue => i !== null && !!i.topStory);
  } catch {
    return [];
  }
}

export function readerUrl(issueNumber: number): string {
  return `${READER_BASE_URL}/${String(issueNumber).padStart(4, "0")}`;
}
