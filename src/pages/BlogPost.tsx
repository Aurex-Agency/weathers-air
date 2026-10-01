import { Link, useParams } from "react-router-dom";
import { posts } from "@/data/posts";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import NotFound from "./NotFound";
import { BUSINESS } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";
export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p=>p.slug===slug);
  if (!post) return <NotFound/>;
  const path = `/blog/${post.slug}`;
  return <><Seo title={post.title} description={post.description} path={path} jsonLd={[
    breadcrumbSchema([{name:"Home",path:"/"},{name:"HVAC Tips",path:"/blog"},{name:post.title,path}]),
    {"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description:post.description,datePublished:post.date,dateModified:post.date,mainEntityOfPage:BUSINESS.siteUrl+path,author:{"@type":"Organization",name:BUSINESS.name,url:BUSINESS.siteUrl+"/about"},publisher:{"@id":BUSINESS.siteUrl+"/#business","@type":"Organization",name:BUSINESS.name,url:BUSINESS.siteUrl},inLanguage:"en-US"}
  ]}/><PageHero headline={post.title} subheadline={post.description}/>
  <article className="max-w-3xl mx-auto px-5 py-14"><nav aria-label="Breadcrumb" className="text-sm mb-6"><Link to="/">Home</Link> / <Link to="/blog">HVAC Tips</Link></nav><p className="text-sm text-muted-foreground mb-8">By <Link to="/about" className="underline">{BUSINESS.name}</Link> · <time dateTime={post.date}>October 1, 2026</time></p><p className="text-xl leading-relaxed mb-10">{post.intro}</p>
  {post.sections.map(s=><section key={s.heading} className="mb-10"><h2 className="text-2xl font-bold mb-4">{s.heading}</h2>{s.paragraphs.map(p=><p key={p} className="text-muted-foreground leading-relaxed mb-4">{p}</p>)}{s.bullets&&<ul className="list-disc pl-6 space-y-2 text-muted-foreground">{s.bullets.map(b=><li key={b}>{b}</li>)}</ul>}</section>)}
  <aside className="bg-navy text-white p-7 rounded-xl mb-10"><h2 className="text-2xl font-bold mb-3">Need help with your system?</h2><p className="mb-5">Discuss your next step with our Columbus office. For after-hours needs, call directly.</p><div className="flex flex-wrap gap-4"><a className="bg-amber text-primary px-5 py-3 rounded-lg font-bold" href={BUSINESS.phone.href}>Call {BUSINESS.phone.display}</a><Link className="border border-white/50 px-5 py-3 rounded-lg" to="/contact">Request Service</Link></div><Link className="inline-block mt-5 underline" to={post.service}>{post.serviceLabel}</Link></aside>
  <section><h2 className="text-xl font-bold mb-3">Further reading</h2><ul className="list-disc pl-6">{post.sources.map(s=><li key={s.url}><a className="text-sky underline" href={s.url}>{s.title}</a></li>)}</ul></section>
  <section className="mt-10 border-t pt-8"><h2 className="text-xl font-bold mb-4">Related guides</h2><ul className="space-y-3">{posts.filter(p=>p.slug!==slug).slice(0,3).map(p=><li key={p.slug}><Link className="text-sky underline" to={`/blog/${p.slug}`}>{p.title}</Link></li>)}</ul></section></article></>;
}
