import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppLayout } from "./App";
import { SeoContext, type SeoData } from "./lib/seo-context";
import { posts } from "./data/posts";
import { BUSINESS } from "./lib/business";
import { locations } from "./data/locations";
import { coreServices } from "./data/core-services";
export const routes = [...coreServices.map(s=>`/services/${s.slug}`), "/", "/federal-hvac-contracting", "/services", "/contact", "/about", "/reviews", "/shop", "/blog", "/privacy-policy", "/service-areas", ...locations.map(l=>`/service-areas/${l.slug}`), ...posts.map(p=>`/blog/${p.slug}`)];
export const origin = BUSINESS.siteUrl;
export function render(path: string) {
  let seo: SeoData | undefined;
  const html = renderToString(<SeoContext.Provider value={value=>{seo=value;}}><StaticRouter location={path}><AppLayout/></StaticRouter></SeoContext.Provider>);
  if (!seo) throw new Error(`Missing SEO for ${path}`);
  return { html, seo };
}
