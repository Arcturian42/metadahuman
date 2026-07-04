import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";

export const metadata: Metadata = {
  title: "Terms of Service — Personal Metadata",
  description: "The terms for using Personal Metadata's free reflection tool.",
};

export default function TermsPage() {
  return <LegalDocument file="terms-of-service" />;
}
