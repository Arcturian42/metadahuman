"use client";

import { ErrorContent } from "@/components/error/error-content";

export default function ReportError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorContent
      title="Couldn't load your report"
      description="We ran into an issue while loading this report. It may be temporary — you can try again, or return to the home page."
      reset={reset}
    />
  );
}
