import { Link, useParams } from "react-router-dom";
import { coreServices } from "@/data/core-services";
import { posts } from "@/data/posts";
import { BUSINESS } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import NotFound from "./NotFound";
export default function CoreService() {
 const { slug } = useParams();
 const service = coreServices.find(s=>s.slug===slug);
 if (!service) return <NotFound/>;
 const path = `/services/${service.slug}`;
 return <><Seo title={service.title} description={service.description} path={path} jsonLd={[
 breadcrumbSchema([{name:"Home",path:"/"},{name:"Services",path:"/services"},{name:service.title,path}]),
 {"@context":"https://schema.org","@type":"Service",name:service.title,description:service.description,url:BUSINESS.siteUrl+path,provider:{"@type":"HVACBusiness","@id":BUSINESS.siteUrl+"/#business",name:BUSINESS.name,telephone:BUSINESS.phone.e164},areaServed:{"@type":"City",name:"Columbus, Mississippi"}}
 ]}/><PageHero headline={service.title} subheadline={service.intro}/><div className="max-w-3xl mx-auto px-5 py-12"><nav aria-label="Breadcrumb" className="mb-8"><Link className="underline" to="/services">All services</Link> / {service.title}</nav><div className="flex flex-wrap gap-4 mb-10"><a href={BUSINESS.phone.href} className="bg-amber text-primary font-bold px-6 py-3 rounded-lg">Call {BUSINESS.phone.display}</a><Link to={`/contact?service=${service.selection}`} className="border border-sky px-6 py-3 rounded-lg">Request service</Link></div>{service.sections.map(s=><section className="mb-10" key={s.heading}><h2 className="text-2xl font-bold mb-4">{s.heading}</h2>{s.paragraphs.map(p=><p className="mb-4 leading-relaxed text-muted-foreground" key={p}>{p}</p>)}</section>)}<section className="bg-muted p-6 rounded-xl"><h2 className="text-xl font-bold mb-4">Prepare for your next step</h2><ul className="space-y-4">{service.guides.map(slug=>{const p=posts.find(p=>p.slug===slug);return p?<li key={slug}><Link className="text-sky underline" to={`/blog/${slug}`}>{p.title}</Link></li>:null;})}</ul></section><p className="mt-8">Office hours: {BUSINESS.hours.short}. <Link className="underline" to="/service-areas">Check our service area</Link> and call to confirm availability.</p></div></>;
}
