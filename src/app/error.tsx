"use client";

import { ErrorContent } from "@/components/error/error-content";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorContent
          title="Something went wrong"
          description="We're sorry, but an unexpected issue occurred. You can try again, or return to the home page."
          reset={reset}
        />
      </body>
    </html>
  );
}
