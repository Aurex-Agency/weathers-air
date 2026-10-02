import { Link } from "react-router-dom";
import { Award, MapPin, Home, Building2, Wind, Shield, Wrench, Zap, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import Seo from "@/components/Seo";
import teamTruck from "@/assets/team-truck.webp";
import awardTrophy from "@/assets/award-trophy.webp";
import { BUSINESS, LICENSE_LINE, servicePath } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

const serviceLinks = [
  { icon: Home, label: "Residential HVAC", path: servicePath("residential") },
  { icon: Building2, label: "Commercial HVAC", path: servicePath("commercial") },
  { icon: Wind, label: "Duct Cleaning", path: servicePath("cleaning") },
  { icon: Shield, label: "Duct Sealing", path: servicePath("sealing") },
  { icon: Wrench, label: "Plumbing", path: servicePath("plumbing") },
  { icon: Zap, label: "Electrical", path: servicePath("electrical") },
];

const stats = [
  { num: BUSINESS.yearsInBusiness, suffix: "+", label: "Years in Business" },
  { num: 3, suffix: "", label: "States Licensed" },
  { num: 500, suffix: "+", label: "Happy Customers" },
  { num: BUSINESS.reviews.count, suffix: "+", label: "Google Reviews" },
];

const About = () => {
  return (
    <div>
      <Seo
        title="About Our Columbus, MS HVAC Company"
        description={`Family-owned and serving Columbus, MS and the Golden Triangle since the 1980s. Learn about Weathers Air Conditioning, the ${BUSINESS.award}.`}
        path="/about"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
      <PageHero
        headline={`${BUSINESS.yearsInBusiness} Years. One Name. Weathers.`}
        subheadline="Based in Columbus, MS and serving Mississippi, Alabama and Tennessee."
      />

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <img
                src={teamTruck}
                alt="Weathers Air Conditioning service truck and technician"
                loading="lazy"
                decoding="async"
                width={1600}
                height={1024}
                className="w-full h-72 lg:h-96 object-cover rounded-2xl shadow-lg"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="text-3xl font-black text-foreground mb-4">Built on Quality. Driven by Reliability.</h2>
              <p className="text-muted-foreground leading-relaxed">
                With over {BUSINESS.yearsInBusiness} years of providing your heating, cooling, and refrigeration needs,
                Weathers Air Conditioning continues to give you the highest quality work in our profession. Our team of
                qualified professionals have secured a reputation for distinguished service. Our friendly and knowledgeable
                staff is happy to answer your questions and provide more information about how we can work for you.
                Weathers Air Conditioning has built a name for quality and reliability, and we look forward to adding you
                to our growing list of satisfied customers.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-section">
        <div className="container mx-auto px-4">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-xl p-6 text-center">
                <dd className="text-3xl font-black text-navy">
                  <CountUp end={s.num} suffix={s.suffix} />
                </dd>
                <dt className="text-muted-foreground text-sm mt-1">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Award */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <AnimatedSection>
              <img
                src={awardTrophy}
                alt="WCBI Viewer's Choice Award trophy"
                loading="lazy"
                decoding="async"
                width={1280}
                height={896}
                className="w-full h-72 lg:h-80 object-cover rounded-2xl shadow-lg"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Award size={48} className="text-amber mb-4" aria-hidden="true" />
              <h2 className="text-3xl font-black text-primary-foreground mb-4">{BUSINESS.award}</h2>
              <p className="text-primary-foreground/70 leading-relaxed">
                Columbus voted us their favorite, an honor we don't take lightly. This award reflects every technician,
                every service call, and every customer who trusted us with their home or business.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl font-black text-foreground">Our Services</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceLinks.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.05}>
                <Link
                  to={s.path}
                  className="group block bg-card border border-border rounded-xl p-4 text-center hover:border-sky hover:glow-sky transition-all"
                >
                  <s.icon size={24} className="mx-auto mb-2 text-sky" aria-hidden="true" />
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-gray-section">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <AnimatedSection>
            <MapPin size={40} className="text-sky mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-2xl font-black text-foreground mb-4">Proudly Serving the Golden Triangle & Beyond</h2>
            <p className="text-muted-foreground mb-4">Working in Mississippi, Alabama and Tennessee. Contact our Columbus office to confirm service at your address.</p>
            <p className="text-sm text-muted-foreground">{LICENSE_LINE}</p>
          </AnimatedSection>
          <div className="mt-10 pt-10 border-t border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Our Trusted Partners</h3>
            <div className="flex items-center justify-center gap-8">
              {BUSINESS.partners.map((p, i) => (
                <span key={p} className="flex items-center gap-8 text-muted-foreground font-semibold">
                  {i > 0 && <span aria-hidden="true">•</span>}
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-3xl text-center"><h2 className="text-3xl font-bold mb-5">Federal contractor. CMMC Level 1 (Self).</h2><p className="text-muted-foreground leading-relaxed mb-6">Weathers has completed its CMMC Level 1 self-assessment and affirmation. Our Columbus office welcomes discussions with federal facility teams and prime contractors about HVAC service, maintenance and replacement.</p><Link to="/federal-hvac-contracting" className="text-sky underline font-semibold">Explore federal HVAC capabilities →</Link></section>
      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-black text-primary-foreground mb-6">Ready to Experience the Weathers Difference?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-block bg-amber hover:bg-amber-light text-primary font-bold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                Request Service
              </Link>
              <a
                href={BUSINESS.phone.href}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground hover:border-sky font-bold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                <Phone size={18} aria-hidden="true" />
                {BUSINESS.phone.display}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;
