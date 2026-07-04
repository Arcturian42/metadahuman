import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders one of the repo's legal markdown drafts (legal/*.md) verbatim as prose.
 * Reading the .md keeps a single source of truth (the drafts lawyers will edit),
 * and strips the leading "> ⚠️ Draft" reviewer note so it never ships to users.
 */
export function LegalDocument({ file }: { file: "disclaimer" | "privacy-policy" | "terms-of-service" }) {
  const raw = fs.readFileSync(path.join(process.cwd(), "legal", `${file}.md`), "utf8");
  // Drop the internal reviewer blockquote at the top (lines starting with ">").
  const content = raw
    .split("\n")
    .filter((line, i) => !(i < 3 && line.trimStart().startsWith(">")))
    .join("\n")
    .trim();

  return (
    <main className="min-h-screen bg-midnight">
      <div className="max-w-container mx-auto px-5 md:px-8 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-sm text-lunar-gray hover:text-soft-white transition-colors">
            ← Personal Metadata
          </Link>
          <article
            className="prose prose-invert prose-lg mt-8 max-w-none
              prose-headings:font-serif prose-headings:text-soft-white
              prose-a:text-celestial-gold hover:prose-a:text-warm-amber
              prose-strong:text-soft-white prose-p:text-mist-gray prose-li:text-mist-gray
              prose-td:text-mist-gray prose-th:text-soft-white
              prose-blockquote:text-lunar-gray prose-blockquote:border-aurora-violet/40"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </main>
  );
}
