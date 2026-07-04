import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";

export const metadata: Metadata = {
  title: "Privacy Policy — Personal Metadata",
  description: "What Personal Metadata collects, how it's used, and your rights.",
};

export default function PrivacyPage() {
  return <LegalDocument file="privacy-policy" />;
}
