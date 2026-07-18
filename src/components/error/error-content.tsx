"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface ErrorContentProps {
  title: string;
  description: string;
  reset?: () => void;
}

export function ErrorContent({ title, description, reset }: ErrorContentProps) {
  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center px-5 py-12">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cosmic-slate border border-white/5 mb-6">
          <AlertTriangle className="w-8 h-8 text-warm-amber" />
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-soft-white mb-3">
          {title}
        </h1>
        <p className="text-mist-gray leading-relaxed mb-8">{description}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {reset ? (
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-celestial-gold text-midnight font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
          ) : null}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-white/5 text-soft-white border border-white/10 rounded-full hover:bg-white/10 transition-colors"
          >
            <Home className="w-4 h-4" />
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
