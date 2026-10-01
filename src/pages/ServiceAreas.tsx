import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { BUSINESS } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";
import { locations } from "@/data/locations";

export default function ServiceAreas() {
  return <>
    <Seo title="HVAC Service Areas Near Columbus, MS" description="Explore Weathers HVAC service in 12 communities near Columbus across Mississippi and western Alabama. Call to confirm service at your address." path="/service-areas" jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Service Areas", path: "/service-areas" }])} />
    <PageHero eyebrow="Based in Columbus. Here to help." headline="Comfort closer to home" subheadline="Explore heating and cooling service in communities within roughly 60 miles of Columbus, Mississippi.">
      <a className="inline-flex items-center gap-2 mt-7 rounded-xl bg-amber px-6 py-3 font-bold text-primary" href={BUSINESS.phone.href}><Phone size={18} />{BUSINESS.phone.display}</a>
    </PageHero>
    <section className="container mx-auto px-4 py-14">
      <div className="max-w-3xl mb-12"><h2 className="text-3xl font-bold mb-4">Mississippi roots. Three-state service.</h2><p className="text-muted-foreground leading-relaxed">Weathers Air Conditioning works in Mississippi, Alabama and Tennessee from our Columbus office. These local guides focus on nearby Mississippi and western Alabama communities. For Tennessee or an address beyond this area, call to discuss your project and availability.</p><p className="text-muted-foreground leading-relaxed mt-4">Select your town for practical advice about local property needs and preparing for a visit. Coverage and scheduling depend on your exact address and the service requested; the office will confirm both with you.</p></div>
      {[{ code: "MS", name: "Mississippi" }, { code: "AL", name: "Alabama" }].map(state => <div key={state.code} className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center"><MapPin className="text-sky" aria-hidden="true" />{state.name}</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{locations.filter(location => location.state === state.code).map(location => <Link key={location.slug} to={`/service-areas/${location.slug}`} className="rounded-2xl border border-border bg-card p-7 hover:border-sky focus-visible:outline-sky transition-colors group">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{location.county} County</p><h3 className="text-2xl font-bold mb-3">{location.city}, {location.state}</h3><p className="text-muted-foreground mb-5">{location.focus}</p><span className="font-semibold text-sky inline-flex gap-2 items-center">Explore local service <ArrowRight size={16} aria-hidden="true" /></span>
        </Link>)}</div>
      </div>)}
      <div className="rounded-2xl bg-secondary p-8"><h2 className="text-2xl font-bold mb-3">Don’t see your town?</h2><p className="text-muted-foreground mb-5">This is a starting list, not a boundary map. Share your street address, town and service need with our office.</p><Link className="inline-block rounded-lg bg-amber px-6 py-3 text-primary font-bold" to="/contact">Ask about your address</Link></div>
    </section>
  </>;
}
