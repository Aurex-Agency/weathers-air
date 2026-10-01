import { useEffect, useContext } from "react";
import { SeoContext } from "@/lib/seo-context";
import { BUSINESS } from "@/lib/business";

interface SeoProps {
  title: string;
  description: string;
  /** Route path, e.g. "/services". Used for the canonical URL. */
  path: string;
  image?: string;
  /** One or more JSON-LD objects to inject for this page. */
  jsonLd?: object | object[];
  noIndex?: boolean;
}

const SUFFIX = ` | ${BUSINESS.name}`;
const DATA_ATTR = "data-seo";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Lightweight per-route <head> manager (no dependency on react-helmet).
 * Sets title, description, canonical, Open Graph / Twitter tags and JSON-LD.
 */
const Seo = ({ title, description, path, image = "/og-image.jpg", jsonLd, noIndex = false }: SeoProps) => {
  const collect = useContext(SeoContext);
  collect?.({ title, description, path, image, jsonLd, noIndex });
  useEffect(() => {
    document.querySelectorAll(`script[${DATA_ATTR}]`).forEach((script) => script.remove());
    const fullTitle = title.includes(BUSINESS.name) ? title : `${title}${SUFFIX}`;
    const url = `${BUSINESS.siteUrl}${path}`;
    const imageUrl = image.startsWith("http") ? image : `${BUSINESS.siteUrl}${image}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noIndex ? "noindex, follow" : "index, follow");
    upsertLink("canonical", url);

    upsertMeta("property", "og:type", path.startsWith("/blog/") ? "article" : "website");
    upsertMeta("property", "og:site_name", BUSINESS.name);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      for (const obj of Array.isArray(jsonLd) ? jsonLd : [jsonLd]) {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.setAttribute(DATA_ATTR, "");
        s.text = JSON.stringify(obj);
        document.head.appendChild(s);
        scripts.push(s);
      }
    }
    return () => {
      scripts.forEach((s) => s.remove());
    };
    // jsonLd is expected to be static per page; stringify to compare by value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, noIndex, JSON.stringify(jsonLd)]);

  return null;
};

export default Seo;
