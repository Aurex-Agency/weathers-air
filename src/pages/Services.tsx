import { useEffect, useState, useRef, useCallback, MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Building2, Wind, Shield, Calendar, Wrench, Zap, Phone, Lightbulb } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Seo from "@/components/Seo";
import imgResidential from "@/assets/service-residential.webp";
import imgCommercial from "@/assets/service-commercial.webp";
import imgDucting from "@/assets/service-ducting.webp";
import imgPlumbing from "@/assets/service-plumbing.webp";
import imgElectrical from "@/assets/service-electrical.webp";
import { BUSINESS, SERVICE_LINKS, type ServiceId } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

const icons: Record<ServiceId, typeof Home> = {
  residential: Home,
  commercial: Building2,
  cleaning: Wind,
  sealing: Shield,
  plans: Calendar,
  plumbing: Wrench,
  electrical: Zap,
};

const residentialServices = [
  "A/C Installation", "A/C Repair", "Air Duct Cleaning", "Air Duct Repair",
  "Electric Furnace Installation", "Emergency Services", "Gas Furnace Installation",
  "Heater Installation", "Thermostat Repair", "Air Duct Installation",
  "Ductless A/C Services", "Electric Furnace Repair", "Flame Sensor Repair",
  "Gas Furnace Repair", "Heater Repair", "Air Purification System Installation",
];

const ctaClass =
  "inline-block bg-amber hover:bg-amber-light text-primary font-bold px-6 py-3 rounded-xl transition-colors";
const sectionClass = "scroll-mt-[120px] lg:scroll-mt-[140px]";
const imgClass = "w-full h-72 lg:h-96 object-cover rounded-2xl shadow-lg";

const SectionHeading = ({ id, children }: { id: ServiceId; children: string }) => {
  const Icon = icons[id];
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-lg bg-sky/10 flex items-center justify-center shrink-0">
        <Icon size={24} className="text-sky" aria-hidden="true" />
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-foreground">{children}</h2>
    </div>
  );
};

const Services = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<ServiceId>("residential");
  const stickyNavRef = useRef<HTMLDivElement>(null);

  const getOffset = useCallback(() => {
    const stickyH = stickyNavRef.current?.offsetHeight ?? 52;
    const navH = window.innerWidth >= 1024 ? 80 : 64;
    return navH + stickyH + 12;
  }, []);

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - getOffset();
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [getOffset],
  );

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1) as ServiceId;
      setActiveSection(id);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToId(id));
      });
    }
  }, [location.hash, scrollToId]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = getOffset() + 8;
      let current: ServiceId = SERVICE_LINKS[0].id;
      for (const s of SERVICE_LINKS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = s.id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [getOffset]);

  // Keep the active pill visible in the scrollable strip on mobile.
  useEffect(() => {
    const strip = stickyNavRef.current?.querySelector<HTMLElement>("[data-tab-strip]");
    const active = strip?.querySelector<HTMLElement>(`[data-tab="${activeSection}"]`);
    if (strip && active) {
      const left = active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2;
      strip.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }
  }, [activeSection]);

  const handleTabClick = (e: MouseEvent<HTMLAnchorElement>, id: ServiceId) => {
    e.preventDefault();
    history.replaceState(null, "", `#${id}`);
    setActiveSection(id);
    scrollToId(id);
  };

  return (
    <div>
      <Seo
        title="HVAC, Plumbing & Electrical in Columbus, MS"
        description={`Residential and commercial HVAC installation and repair, air duct cleaning, whole-home duct sealing, preventive maintenance plans, plumbing and electrical services in Columbus, MS. Call ${BUSINESS.phone.display}.`}
        path="/services"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        headline="Our Services"
        subheadline="HVAC, plumbing and electrical solutions from Columbus, MS, serving homes and businesses in Mississippi, Alabama and Tennessee."
      />

      {/* Sticky Section Nav */}
      <div ref={stickyNavRef} className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur border-b border-border">
        <nav data-tab-strip className="container mx-auto px-4 overflow-x-auto scrollbar-hide" aria-label="Service sections">
          <div className="flex gap-1 py-2 min-w-max">
            {SERVICE_LINKS.map((s) => {
              const Icon = icons[s.id];
              const active = activeSection === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  data-tab={s.id}
                  aria-current={active ? "location" : undefined}
                  onClick={(e) => handleTabClick(e, s.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    active ? "bg-sky text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon size={14} aria-hidden="true" />
                  {s.short}
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Residential */}
        <section id="residential" className={sectionClass} aria-label="Residential HVAC">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <img
                src={imgResidential}
                alt="Cozy residential home with outdoor AC unit serviced by Weathers"
                loading="lazy"
                decoding="async"
                width={1280}
                height={896}
                className={imgClass}
              />
              <div>
                <SectionHeading id="residential">Residential HVAC Service & Installation</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Whatever the weather may be outside, we'll keep you comfortable in your home. Weathers Air Conditioning
                  provides top-quality heating and air conditioning installation and service with your comfort as our top
                  priority. Our technicians quickly respond to all emergency calls, returning you home to the comfortable
                  environment you deserve. There is no job too big or small. We service all makes and models of HVAC
                  equipment, new or old.
                </p>
                <ul className="flex flex-wrap gap-2 mb-8" aria-label="Residential services offered">
                  {residentialServices.map((s) => (
                    <li key={s} className="bg-sky/10 text-navy text-sm font-medium px-3 py-1.5 rounded-full">
                      {s}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={ctaClass}>
                  Schedule Residential Service
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Commercial */}
        <section id="commercial" className={sectionClass} aria-label="Commercial HVAC">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="lg:order-2">
                <img
                  src={imgCommercial}
                  alt="Commercial building rooftop with HVAC units"
                  loading="lazy"
                  decoding="async"
                  width={1280}
                  height={896}
                  className={imgClass}
                />
              </div>
              <div className="lg:order-1">
                <SectionHeading id="commercial">Commercial HVAC Services & Installation</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Your business HVAC system is essential to the comfort of customers and employees. Everyone is always
                  happier when comfortable! Weathers Air Conditioning is committed to providing exceptional quality
                  installation and service for our commercial heating and air conditioning customers.
                </p>
                <Link to="/contact" className={ctaClass}>
                  Get a Commercial Quote
                </Link>
                <p className="mt-5"><Link to="/federal-hvac-contracting" className="text-sky underline">Federal project? Explore our HVAC capabilities and CMMC Level 1 status →</Link></p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Duct Cleaning */}
        <section id="cleaning" className={sectionClass} aria-label="Air duct cleaning">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <img
                src={imgDucting}
                alt="Clean HVAC ductwork installation"
                loading="lazy"
                decoding="async"
                width={1280}
                height={896}
                className={imgClass}
              />
              <div>
                <SectionHeading id="cleaning">Air Duct Cleaning</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Dust and uneven temperatures can have several causes. An inspection can help determine whether your
                ductwork needs cleaning, repairs or sealing. We assess your system and explain the appropriate next step.
                Duct cleaning removes accumulated debris; it does not fix air leaks or guarantee better health or lower bills.
              </p>
                <div className="bg-sky/5 border border-sky/20 rounded-xl p-5 mb-6 flex gap-3">
                  <Lightbulb size={20} className="text-amber shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-foreground font-semibold text-sm">
                    Don't leave this important work to just anybody. Our well-trained professionals make certain that your
                    ductwork is ready for the long haul.
                  </p>
                </div>
                <Link to="/contact" className={ctaClass}>
                  Schedule Duct Cleaning
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Duct Sealing */}
        <section id="sealing" className={sectionClass} aria-label="Duct sealing">
          <AnimatedSection>
            <SectionHeading id="sealing">Whole Home Ductwork Sealing</SectionHeading>
            <div className="bg-amber/10 border border-amber/20 rounded-xl p-6 mb-6 text-center max-w-md">
              <p className="text-3xl font-black text-amber">Find the leaks</p>
              <p className="text-foreground font-medium text-sm mt-1">Leaking ductwork can waste conditioned air.</p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              Most homeowners know they should upgrade their home insulation. However, many aren't aware of the impact
              ductwork can have on HVAC efficiency. Weathers Air Conditioning tests the airflow in your duct system and
              seals the leaks to keep your home's HVAC system operating efficiently. A properly insulated and sealed duct
              system can lower your energy bills and make your home more comfortable throughout the year.
            </p>
            <Link to="/contact" className={ctaClass}>
              Request a Duct Sealing Estimate
            </Link>
          </AnimatedSection>
        </section>

        {/* Maintenance Plans */}
        <section id="plans" className={sectionClass} aria-label="Maintenance plans">
          <AnimatedSection>
            <SectionHeading id="plans">Weathers Preventive Maintenance Plans</SectionHeading>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Regular preventive maintenance keeps your system running at peak efficiency, helps you avoid costly emergency
              repairs, extends the life of your equipment, and gives you peace of mind year-round.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mb-8">
              <div className="bg-card border border-border rounded-xl p-6 hover:border-sky transition-colors">
                <Calendar size={28} className="text-sky mb-3" aria-hidden="true" />
                <h3 className="font-bold text-foreground text-lg mb-2">Annual Plan</h3>
                <p className="text-muted-foreground text-sm">Once-yearly full system inspection and service.</p>
              </div>
              <div className="relative bg-card border border-sky/30 rounded-xl p-6 glow-sky">
                <span className="absolute -top-3 right-4 bg-amber text-primary text-xs font-bold px-3 py-1 rounded-full">
                  Recommended
                </span>
                <div className="flex gap-1 mb-3">
                  <Calendar size={28} className="text-sky" aria-hidden="true" />
                  <Calendar size={28} className="text-sky" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">Bi-Annual Plan</h3>
                <p className="text-muted-foreground text-sm">
                  Twice-yearly service before summer and winter, for year-round comfort.
                </p>
              </div>
            </div>
            <Link to="/contact" className={ctaClass}>
              Sign Up for a Maintenance Plan
            </Link>
          </AnimatedSection>
        </section>

        {/* Plumbing */}
        <section id="plumbing" className={sectionClass} aria-label="Plumbing">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="lg:order-2">
                <img
                  src={imgPlumbing}
                  alt="Plumber repairing copper pipes"
                  loading="lazy"
                  decoding="async"
                  width={1280}
                  height={896}
                  className={imgClass}
                />
              </div>
              <div className="lg:order-1">
                <SectionHeading id="plumbing">Plumbing Services</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  At Weathers Air, we are expanding our expertise beyond HVAC to offer professional plumbing services for
                  both residential and commercial clients. From fixing leaks and unclogging drains to installing water
                  heaters and performing complete system installations, our skilled plumbers are equipped to handle any
                  plumbing issue, big or small.
                </p>
                <Link to="/contact" className={ctaClass}>
                  Request Plumbing Service
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Electrical */}
        <section id="electrical" className={sectionClass} aria-label="Electrical">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <img
                src={imgElectrical}
                alt="Licensed electrician working on a residential breaker panel"
                loading="lazy"
                decoding="async"
                width={1280}
                height={896}
                className={imgClass}
              />
              <div>
                <SectionHeading id="electrical">Electrical Services</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Weathers Air is excited to broaden our services to include expert electrical solutions for your home or
                  business. Whether you need help with rewiring, installing new lighting fixtures, upgrading electrical
                  panels, or troubleshooting power issues, our licensed electricians are here to ensure the safety and
                  efficiency of your electrical systems.
                </p>
                <Link to="/contact" className={ctaClass}>
                  Request Electrical Service
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </div>

      {/* Bottom CTA */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-primary-foreground mb-6">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={BUSINESS.phone.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber-light text-primary font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              <Phone size={18} aria-hidden="true" />
              Call {BUSINESS.phone.display}
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-block border-2 border-primary-foreground/30 text-primary-foreground hover:border-sky font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Request Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
