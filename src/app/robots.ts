import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Reports are private, per-user URLs — keep them out of the index.
      disallow: ["/api/", "/report/", "/summary"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
