"use client";

import { useState } from "react";
import { Download, Share2, Check } from "lucide-react";

interface ReportActionsProps {
  reportId: string;
  firstName: string;
  variant?: "header" | "footer";
}

/**
 * Wires the previously non-functional Share / Download PDF buttons.
 * - Download → the on-demand PDF route
 * - Share → native share sheet where available, else copy-link fallback
 */
export function ReportActions({ reportId, firstName, variant = "header" }: ReportActionsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const pdfUrl = `/api/reports/${reportId}/pdf`;

  const handleShare = async () => {
    const shareData = {
      title: `${firstName}'s Personal Metadata`,
      text: `${firstName}'s free symbolic self-reflection report.`,
      url: shareUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      // user cancelled or share unavailable — fall through to copy
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* no-op */
    }
  };

  if (variant === "footer") {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={pdfUrl}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-celestial-gold to-warm-amber text-midnight font-semibold rounded-btn hover:scale-[1.02] transition-transform"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-soft-white rounded-btn hover:bg-white/10 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-soft-emerald" /> : <Share2 className="w-4 h-4" />}
          {copied ? "Link copied" : "Share my report"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-btn text-sm text-soft-white hover:bg-white/10 transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-soft-emerald" /> : <Share2 className="w-4 h-4" />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
      </button>
      <a
        href={pdfUrl}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-celestial-gold to-warm-amber text-midnight font-semibold rounded-btn text-sm hover:scale-[1.02] transition-transform"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Download PDF</span>
      </a>
    </div>
  );
}
