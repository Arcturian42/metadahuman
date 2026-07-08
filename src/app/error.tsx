"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled app error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border border-soft-red/30 bg-mystic-blue text-soft-red">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-2xl text-soft-white mb-2">
          Something went wrong on our end
        </h1>
        <p className="text-mist-gray text-sm leading-relaxed mb-8">
          This is a temporary hiccup, not a sign your report failed — if you already
          submitted the form, check your email for the report link. Otherwise, try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-btn bg-gradient-to-r from-celestial-gold to-warm-amber px-6 py-3 text-sm font-bold text-midnight transition-transform hover:scale-[1.02]"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-btn border border-white/10 bg-white/5 px-6 py-3 text-sm text-soft-white transition-colors hover:bg-white/10"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
