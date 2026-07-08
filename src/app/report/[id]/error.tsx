"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Mail, RotateCcw } from "lucide-react";

export default function ReportError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Report page failed to load:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-ivory flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border border-antique-gold/30 bg-parchment text-antique-gold">
          <Mail className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-2xl text-ink mb-2">
          We couldn&#39;t load your report page
        </h1>
        <p className="text-ink-soft text-sm leading-relaxed mb-8">
          Your report was still generated and, if email delivery succeeded, a copy with
          this same link was sent to your inbox. This page just had trouble loading —
          try again in a moment.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-btn bg-gold-cta-gradient px-6 py-3 text-sm font-bold text-ink transition-transform hover:scale-[1.02]"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-btn border border-ink/15 bg-white px-6 py-3 text-sm text-ink transition-colors hover:bg-parchment"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
