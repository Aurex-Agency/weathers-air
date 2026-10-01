import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render, routes, origin } from '../dist-ssr/entry-server.js';
const template = await readFile('dist/index.html', 'utf8');
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const clean = template.replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<meta\s+(?:name|property)="(?:description|robots|og:[^"]*|twitter:[^"]*)"[^>]*>/g,'').replace(/<link\s+rel="canonical"[^>]*>/g,'');
for (const path of [...routes, '/404']) {
  const { html, seo } = render(path);
  const title = seo.title.includes('Weathers Air Conditioning') ? seo.title : `${seo.title} | Weathers Air Conditioning`;
  const url = origin + seo.path;
  const image = new URL(seo.image || '/og-image.jpg', origin).href;
  const json = seo.jsonLd ? (Array.isArray(seo.jsonLd) ? seo.jsonLd : [seo.jsonLd]) : [];
  const head = `<title>${esc(title)}</title><meta name="description" content="${esc(seo.description)}"><meta name="robots" content="${seo.noIndex?'noindex, follow':'index, follow'}"><link rel="canonical" href="${esc(url)}"><meta property="og:type" content="${path.startsWith('/blog/')?'article':'website'}"><meta property="og:site_name" content="Weathers Air Conditioning"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(seo.description)}"><meta property="og:url" content="${esc(url)}"><meta property="og:image" content="${esc(image)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(seo.description)}"><meta name="twitter:image" content="${esc(image)}">` + json.map(obj=>`<script type="application/ld+json" data-seo>${JSON.stringify(obj).replaceAll('<','\\u003c')}</script>`).join('');
  const target = path==='/' ? 'dist/index.html' : `dist${path}.html`;
  await mkdir(target.slice(0,target.lastIndexOf('/')), {recursive:true});
  await writeFile(target, clean.replace('</head>',`${head}</head>`).replace('<div id="root"></div>',`<div id="root">${html}</div>`));
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(path=>`  <url><loc>${esc(origin+path)}</loc></url>`).join('\n')}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
for (const dir of ['dist','public']) { await writeFile(`${dir}/sitemap.xml`,sitemap); await writeFile(`${dir}/robots.txt`,robots); }
console.log(`Generated ${routes.length} crawlable pages, 404 page, sitemap and robots.txt for ${origin}`);
