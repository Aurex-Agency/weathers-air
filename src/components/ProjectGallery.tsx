import { Link } from "react-router-dom";
import ProjectPhoto from "@/components/ProjectPhoto";

const projects = [
  { id: "overhead-ductwork", title: "Above the ceiling", caption: "Positioning insulated ductwork between roof trusses." },
  { id: "packaged-unit-lift", title: "Equipment on the move", caption: "Lifting a packaged HVAC unit to roof level." },
  { id: "plumbing-team", title: "Hands-on service", caption: "The team at work beside water-heater equipment." },
  { id: "project-planning", title: "Inside the framing", caption: "Discussing the work while the building structure is still open." },
  { id: "duct-installation", title: "Making the connection", caption: "Fitting ductwork around the building’s framing." },
  { id: "service-van-on-site", title: "Weathers on site", caption: "Our service van at a construction project." },
  { id: "indoor-air-handler", title: "Behind the comfort", caption: "An indoor air handler and its connected ductwork." },
  { id: "tankless-water-heater", title: "Hot-water equipment", caption: "A wall-mounted tankless unit and its water connections." },
  { id: "rooftop-hvac-lift", title: "A view from the roof", caption: "Guiding HVAC equipment into position during a rooftop lift." },
] as const;

export default function ProjectGallery({ preview = false }: { preview?: boolean }) {
  return <section id="our-work" className="py-16 lg:py-20 bg-gray-section scroll-mt-24" aria-labelledby="work-heading">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mb-9">
        <p className="text-sky font-semibold text-sm uppercase tracking-wider mb-3">From the field</p>
        <h2 id="work-heading" className="text-3xl md:text-4xl font-black text-foreground mb-4">Real people. Hands-on work.</h2>
        <p className="text-muted-foreground leading-relaxed">Take a look at the Weathers team, equipment and work in progress—from ductwork inside the framing to equipment lifts on the roof.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(preview ? projects.slice(0, 3) : projects).map((project) => <figure key={project.id} className="rounded-2xl overflow-hidden bg-card border border-border">
          <ProjectPhoto id={project.id} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="w-full aspect-[3/4] object-cover" />
          <figcaption className="p-5"><h3 className="font-bold text-foreground mb-2">{project.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{project.caption}</p></figcaption>
        </figure>)}
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        {preview && <Link to="/about#our-work" className="font-semibold text-sky underline underline-offset-4">See more of our work →</Link>}
        <Link to="/contact" className="font-semibold text-sky underline underline-offset-4">Tell us about your project →</Link>
      </div>
    </div>
  </section>;
}
