import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const sitemap=await readFile('dist/sitemap.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]));
assert.equal(urls.filter(u=>u.pathname.startsWith('/blog/')).length,5);
assert.equal(urls.filter(u=>u.pathname.startsWith("/service-areas/")).length,12);
const paths=new Set(urls.map(u=>u.pathname));
const titles=new Set();
const descriptions=new Set();
for (const url of urls) {
  assert.equal(url.origin,'https://weathersair.com');
  const html=await readFile(url.pathname==='/'?'dist/index.html':`dist${url.pathname}.html`,'utf8');
  const title=html.match(/<title>(.*?)<\/title>/)?.[1];
  const description=html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  assert(description); assert(!descriptions.has(description), `Duplicate description: ${url.pathname}`); descriptions.add(description);
  for (const match of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    if (!/\.[a-z0-9]+$/i.test(match[1])) assert(paths.has(match[1]), `Broken internal link ${match[1]} on ${url.pathname}`);
  }
  if(url.pathname.startsWith('/service-areas/')) { assert(html.includes('"@type":"Service"')); assert(html.includes('Local reading')); assert(html.includes('location=')); }
  assert(title); assert(!titles.has(title),`Duplicate title: ${title}`); titles.add(title);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,url.pathname);
  assert(html.includes(`rel="canonical" href="${url.href}"`));
  assert(!html.includes('weathers.aurexagency.com'));
  assert(!/<div id="root"><\/div>/.test(html));
  for(const match of html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)) JSON.parse(match[1]);
  if(url.pathname.startsWith('/blog/')) assert(html.includes('BlogPosting'));
}
assert((await readFile('dist/404.html','utf8')).includes('noindex'));
console.log(`Verified ${urls.length} static pages: unique titles, canonical URLs, H1s, JSON-LD, internal links, five articles and 12 location pages.`);
