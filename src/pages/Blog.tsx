import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { posts } from "@/data/posts";
import { breadcrumbSchema } from "@/lib/schema";
export default function Blog() {
  return <><Seo title="HVAC Tips for Columbus, MS Homeowners" description="Practical guides to AC problems, HVAC maintenance, replacement decisions, ductwork and air filters from Weathers Air Conditioning in Columbus, MS." path="/blog" jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"HVAC Tips",path:"/blog"}])}/>
    <PageHero headline="Practical advice for a comfortable home" subheadline="Heating and cooling guides to help Columbus homeowners ask better questions and plan their next step."/>
    <section className="container mx-auto px-4 py-16"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map(post=><article key={post.slug} className="bg-card border border-border rounded-2xl p-7 flex flex-col"><p className="text-sky font-semibold text-sm mb-3">{post.category}</p><h2 className="text-2xl font-bold mb-3"><Link className="hover:text-sky" to={`/blog/${post.slug}`}>{post.title}</Link></h2><p className="text-muted-foreground flex-1 mb-6">{post.description}</p><Link className="font-semibold text-sky" to={`/blog/${post.slug}`}>Read the guide →</Link></article>)}</div></section>
  </>;
}
