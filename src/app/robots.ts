import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://ekonomos.velyos.cz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/portal/",
          "/prihlaseni/api/",
          "/api/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
