"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Share2, Check, Trash2 } from "lucide-react";
import { track } from "@/lib/analytics";

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
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const pdfUrl = `/api/reports/${reportId}/pdf`;

  const handleShare = async () => {
    track("report_share");
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

  const handleDelete = async () => {
    if (!window.confirm("Delete this report and its data permanently? This can't be undone.")) {
      return;
    }
    setDeleting(true);
    try {
      await fetch(`/api/reports/${reportId}`, { method: "DELETE" });
      track("report_delete");
      router.push("/");
    } catch {
      setDeleting(false);
    }
  };

  if (variant === "footer") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={pdfUrl}
            onClick={() => track("report_pdf_download")}
            className="flex items-center gap-2 px-6 py-3 bg-gold-cta-gradient text-ink font-semibold rounded-btn hover:scale-[1.02] transition-transform"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-ink/15 text-ink rounded-btn hover:bg-parchment transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-sage" /> : <Share2 className="w-4 h-4" />}
            {copied ? "Link copied" : "Share my report"}
          </button>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 text-xs text-ink-muted hover:text-red-700 transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {deleting ? "Deleting…" : "Delete this report & my data"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-ink/15 rounded-btn text-sm text-ink hover:bg-parchment transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-sage" /> : <Share2 className="w-4 h-4" />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
      </button>
      <a
        href={pdfUrl}
        onClick={() => track("report_pdf_download")}
        className="flex items-center gap-2 px-4 py-2 bg-gold-cta-gradient text-ink font-semibold rounded-btn text-sm hover:scale-[1.02] transition-transform"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Download PDF</span>
      </a>
    </div>
  );
}
