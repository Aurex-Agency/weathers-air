import { Link, useParams } from "react-router-dom";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import NotFound from "@/pages/NotFound";
import { locations } from "@/data/locations";
import { BUSINESS, servicePath } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

export default function Location() {
  const { slug } = useParams();
  const location = locations.find(item => item.slug === slug);
  if (!location) return <NotFound />;
  const place = `${location.city}, ${location.state}`;
  const path = `/service-areas/${location.slug}`;
  const related = location.related.map(slug => locations.find(item => item.slug === slug)).filter(item => item !== undefined);
  const requestPath = `/contact?location=${encodeURIComponent(place)}`;
  return <>
    <Seo title={`AC & Heating in ${place}`} description={`Need HVAC help in ${place}? ${location.focus}. Call Weathers for repair, replacement and maintenance availability.`} path={path} jsonLd={[
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Service Areas", path: "/service-areas" }, { name: place, path }]),
      { "@context": "https://schema.org", "@type": "Service", "@id": `${BUSINESS.siteUrl}${path}#service`, name: `Heating and air conditioning in ${place}`, serviceType: "HVAC repair, replacement and maintenance", url: `${BUSINESS.siteUrl}${path}`, provider: { "@type": "HVACBusiness", "@id": `${BUSINESS.siteUrl}/#business`, name: BUSINESS.name, telephone: BUSINESS.phone.e164, url: BUSINESS.siteUrl }, areaServed: { "@type": "City", name: location.city, containedInPlace: { "@type": "State", name: location.state === "MS" ? "Mississippi" : "Alabama" } } },
    ]} />
    <PageHero eyebrow={`${location.county} County · ${location.state === "MS" ? "Mississippi" : "Alabama"}`} headline={`AC & heating in ${place}`} subheadline={location.focus}>
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7"><Link className="rounded-xl bg-amber px-6 py-3 font-bold text-primary" to={requestPath}>Request service in {location.city}</Link><a className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold text-white" href={BUSINESS.phone.href}><Phone size={18} aria-hidden="true" />{BUSINESS.phone.display}</a></div>
    </PageHero>
    <div className="container mx-auto px-4 py-6"><nav aria-label="Breadcrumb" className="text-sm text-muted-foreground flex flex-wrap gap-2"><Link className="hover:underline" to="/">Home</Link><span aria-hidden="true">/</span><Link className="hover:underline" to="/service-areas">Service Areas</Link><span aria-hidden="true">/</span><span aria-current="page">{place}</span></nav></div>
    <div className="container mx-auto px-4 pb-16 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-12">
      <article className="max-w-3xl">
        <h2 className="text-3xl font-bold mb-5">HVAC help for {location.city} homes and businesses</h2><p className="text-lg text-muted-foreground leading-relaxed mb-10">{location.intro}</p>
        {location.sections.map(section => <section key={section.heading} className="mb-9"><h2 className="text-2xl font-bold mb-4">{section.heading}</h2><p className="text-muted-foreground leading-relaxed">{section.text}</p></section>)}
        <section className="rounded-2xl bg-secondary p-7 mb-9"><h2 className="text-2xl font-bold mb-5">Before your {location.city} service visit</h2><ul className="space-y-4">{location.tips.map(tip => <li className="flex gap-3 text-muted-foreground" key={tip}><CheckCircle2 className="shrink-0 text-sky mt-0.5" size={20} aria-hidden="true" /><span>{tip}</span></li>)}</ul></section>
        <section className="mb-9"><h2 className="text-2xl font-bold mb-5">Questions from property owners</h2><h3 className="text-lg font-bold mb-3">{location.faq.question}</h3><p className="text-muted-foreground leading-relaxed">{location.faq.answer}</p><h3 className="text-lg font-bold mt-6 mb-3">How do I request a visit in {location.city}?</h3><p className="text-muted-foreground leading-relaxed">Call {BUSINESS.phone.display} or send a request with your address and a description of the problem. Our office in Columbus will confirm coverage, the service needed and appointment availability. For urgent needs, call rather than relying on an online message.</p></section>
        <section className="border-t border-border pt-6"><h2 className="text-base font-bold mb-3">Local reading</h2><p className="text-sm text-muted-foreground mb-3">Learn more about the community details mentioned above.</p><ul>{location.sources.map(source => <li key={source.url}><a className="text-sm text-sky underline underline-offset-4" href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></section>
      </article>
      <aside className="space-y-6">
        <section className="rounded-2xl border border-border bg-card p-7"><p className="text-xs font-bold tracking-widest text-sky uppercase mb-3">One office. A regional team.</p><h2 className="text-xl font-bold mb-3">Talk with Weathers</h2><p className="text-muted-foreground text-sm leading-relaxed mb-5">Based at {BUSINESS.address.full}. Serving Mississippi, Alabama and Tennessee, with address and scheduling confirmation from our office.</p><a href={BUSINESS.phone.href} className="text-xl font-bold block mb-3">{BUSINESS.phone.display}</a><p className="text-sm text-muted-foreground mb-5">{BUSINESS.hours.display}</p><Link className="block rounded-lg text-center bg-amber px-4 py-3 text-primary font-bold" to={requestPath}>Request service</Link></section>
        <nav className="rounded-2xl border border-border p-7" aria-label="HVAC services"><h2 className="font-bold text-xl mb-4">How we can help</h2>{[{id:'residential',label:'Home repair & replacement'},{id:'commercial',label:'Commercial HVAC'},{id:'plans',label:'Preventive maintenance'},{id:'sealing',label:'Ductwork sealing'}].map(service => <Link className="flex gap-2 items-center py-3 text-sm text-sky border-b border-border last:border-0" key={service.id} to={servicePath(service.id as 'residential' | 'commercial' | 'plans' | 'sealing')}>{service.label}<ArrowRight size={14} aria-hidden="true" /></Link>)}</nav>
        <nav className="rounded-2xl bg-secondary p-7" aria-label="Helpful guides"><h2 className="font-bold text-xl mb-4">Before you decide</h2><Link className="block text-sky text-sm py-2" to="/blog/ac-not-cooling-columbus-ms">AC not cooling: safe checks</Link><Link className="block text-sky text-sm py-2" to="/blog/repair-or-replace-air-conditioner">Repair or replace your AC?</Link></nav>
      </aside>
    </div>
    <section className="bg-secondary py-12"><div className="container mx-auto px-4"><h2 className="font-bold text-2xl mb-6">Explore nearby communities</h2><div className="grid sm:grid-cols-3 gap-4">{related.map(item => <Link key={item.slug} className="bg-card border border-border rounded-xl p-5 font-semibold hover:text-sky" to={`/service-areas/${item.slug}`}>{item.city}, {item.state} →</Link>)}</div><Link className="inline-block mt-6 text-sky font-semibold" to="/service-areas">View all service areas →</Link></div></section>
  </>;
}
