import getSiteMap from "@/lib/sitemap/getData";
import type { MetadataRoute } from "next";

//
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let result = await getSiteMap();

  const magazine = result.magazine.map(({ id, updated_at }) => ({
    url: `https://www.finefarming.co.kr/magazine/${id}`,
    lastModified: updated_at,
  }));
  const product = result.product.map(({ id, updated_at }) => ({
    url: `https://www.finefarming.co.kr/product/${id}`,
    lastModified: updated_at,
  }));
  const routes = [""].map((route) => ({
    url: `https://www.finefarming.co.kr${route}`,
    lastModified: new Date().toISOString(),
  }));
  return [...routes, ...magazine, ...product];
}
