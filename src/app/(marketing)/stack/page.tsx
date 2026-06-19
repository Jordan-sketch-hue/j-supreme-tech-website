import { redirect } from "next/navigation";

// The affiliate "stack" now lives as a Featured section inside the blog (/blog),
// not a standalone page. This route is kept only so older links (e.g. social posts
// that pointed at /stack) resolve — it permanently redirects to the blog.
export default function StackPage() {
  redirect("/blog");
}
