import { Link } from "react-router-dom";
import { coreServices } from "@/data/core-services";
export default function CoreServiceLinks() {
 return <section className="container mx-auto px-4 py-12" aria-labelledby="core-services-heading"><h2 id="core-services-heading" className="text-2xl font-bold mb-6">Find the right heating and cooling service</h2><div className="grid md:grid-cols-3 gap-5">{coreServices.map(s=><Link key={s.slug} to={`/services/${s.slug}`} className="block border border-border rounded-xl p-6 hover:border-sky"><h3 className="font-bold text-xl mb-3">{s.title}</h3><p className="text-muted-foreground">{s.description}</p><span className="inline-block mt-4 text-sky underline">Service details and next steps</span></Link>)}</div></section>;
}
