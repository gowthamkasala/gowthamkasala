import type { Metadata } from "next";
import { site } from "@/data/site";
export function pageMetadata(
  title = site.title,
  description = site.description,
  path = "/",
): Metadata {
  return {
    title,
    description,
    ...(site.origin
      ? {
          metadataBase: new URL(site.origin),
          alternates: { canonical: new URL(path, site.origin).href },
        }
      : {}),
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "Gowtham",
      ...(site.origin
        ? {
            url: new URL(path, site.origin).href,
            images: [
              {
                url: `${site.origin}/social-image`,
                width: 1200,
                height: 630,
                alt: site.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: site.origin ? "summary_large_image" : "summary",
      title,
      description,
      ...(site.origin ? { images: [`${site.origin}/social-image`] } : {}),
    },
    robots: { index: true, follow: true },
  };
}
