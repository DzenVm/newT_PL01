import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://twindorgames.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/gra", "/jak-grac", "/o-nas", "/kontakt", "/regulamin", "/polityka-prywatnosci"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/gra" ? "daily" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
