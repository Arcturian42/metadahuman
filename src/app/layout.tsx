import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Personal Metadata — Free Symbolic Self-Reflection Report",
  description:
    "Discover your personal metadata. A free symbolic self-reflection report based on your name and birth data. Numerology, astrology, and more.",
  openGraph: {
    title: "Personal Metadata",
    description: "Discover your symbolic self-reflection report — free.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-midnight text-soft-white font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
