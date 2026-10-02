import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Phone,
  MessageSquare,
  Home,
  Building2,
  Wind,
  Shield,
  Wrench,
  Zap,
  Star,
  Award,
  Clock,
  CheckCircle,
  MapPin,
  Mail,
  FileText,
  BadgeCheck,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import Seo from "@/components/Seo";
import FaqSection from "@/components/FaqSection";
import ProjectPhoto from "@/components/ProjectPhoto";
import ProjectGallery from "@/components/ProjectGallery";
import { BUSINESS, servicePath } from "@/lib/business";
import { localBusinessSchema, faqSchema } from "@/lib/schema";
import { faqs } from "@/data/faqs";

const services = [
  { icon: Home, title: "Residential HVAC", desc: "Complete heating & cooling solutions for your home comfort.", link: servicePath("residential") },
  { icon: Building2, title: "Commercial HVAC", desc: "Reliable HVAC systems for businesses of all sizes.", link: servicePath("commercial") },
  { icon: Wind, title: "Duct Cleaning", desc: "Professional air duct cleaning for healthier indoor air.", link: servicePath("cleaning") },
  { icon: Shield, title: "Duct Sealing", desc: "Seal leaks and improve airflow and reduce wasted heating and cooling.", link: servicePath("sealing") },
  { icon: Wrench, title: "Plumbing Services", desc: "Expert plumbing repairs and installations.", link: servicePath("plumbing") },
  { icon: Zap, title: "Electrical Services", desc: "Licensed electricians for safe, efficient solutions.", link: servicePath("electrical") },
];

const trustItems = [
  { icon: CheckCircle, text: `${BUSINESS.yearsInBusiness}+ Years in Business` },
  { icon: Award, text: "WCBI Viewer's Choice Award 2025" },
  { icon: Wrench, text: "Licensed in MS, AL & TN" },
  { icon: Zap, text: "Emergency After-Hours Service" },
  { icon: Star, text: "Hundreds of 5-Star Reviews" },
  { icon: Home, text: "Residential & Commercial" },
];

const reviews = [
  { text: "Excellent service. Very quick to respond. Very nice. Would not use anyone else except Weathers!", name: "Sandi Mapp", date: "Jun 2026", platform: "Google" },
  { text: "Andrew and his team came and installed a 2 ton attic unit, mini split, and re-built damaged ducting in my home. They were extremely professional, polite, and hard-working.", name: "Michael", date: "Jun 2026", platform: "Google" },
  { text: "Love working with Weathers' A/C. They always arrive on time and their communication is top notch. Highly recommend!", name: "Amy Huckaby", date: "Dec 2025", platform: "Google" },
];

const whyItems = [
  { icon: Zap, title: "Fast Emergency Response", desc: "We respond quickly to after-hours calls so you're never left without comfort." },
  { icon: Wrench, title: "All Makes & Models", desc: "No job too big or small. We service all HVAC equipment, new or old." },
  { icon: CheckCircle, title: "Maintenance Plans", desc: "Preventive maintenance plans available once or twice yearly to protect your system." },
  { icon: Award, title: `${BUSINESS.yearsInBusiness}+ Years of Excellence`, desc: "A name built on quality and reliability in the Golden Triangle since the 1980s." },
  { icon: MapPin, title: "Licensed Tri-State", desc: "Fully licensed in Mississippi, Alabama, and Tennessee." },
];

const stats = [
  { num: BUSINESS.yearsInBusiness, suffix: "+", label: "Years" },
  { num: 500, suffix: "+", label: "Customers Served" },
  { num: 3, suffix: "", label: "States Licensed" },
  { num: "Call", suffix: "", label: "For After-Hours Service" },
];

const Stars = ({ size = 16 }: { size?: number }) => (
  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
    {[...Array(5)].map((_, j) => (
      <Star key={j} size={size} className="text-amber fill-amber" aria-hidden="true" />
    ))}
  </div>
);

const Index = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <Seo
        title="HVAC Services in Columbus, MS | Weathers Air Conditioning"
        description={BUSINESS.description}
        path="/"
        jsonLd={[localBusinessSchema(), faqSchema(faqs)]}
      />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center justify-center hero-gradient overflow-hidden pt-16 lg:pt-20">
        <ProjectPhoto id="weathers-shop" priority decorative sizes="100vw" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />
        <div className="hero-particles" aria-hidden="true" />
        {(
          <div className="absolute inset-0 overflow-hidden motion-reduce:hidden" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-sky/5"
                style={{
                  width: 100 + i * 80,
                  height: 100 + i * 80,
                  left: `${10 + i * 18}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
                transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        )}
        <div className="relative z-10 container mx-auto px-4 text-center py-20">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-amber/20 text-amber border border-amber/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-8">
              <Award size={16} aria-hidden="true" />
              {BUSINESS.award}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 leading-[1.1] tracking-tight">
              AC &amp; Heating Services
              <br />
              <span className="text-sky">in Columbus, MS</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 text-balance">
              Based in Columbus and serving Mississippi, Alabama and Tennessee. Call Weathers for heating, cooling, plumbing and electrical service for your home or business.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6"><Link to="/service-areas" className="text-sky underline underline-offset-4">Explore service in your town →</Link><Link to="/federal-hvac-contracting" className="text-sky underline underline-offset-4">Federal contractor · CMMC Level 1 (Self) →</Link></div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-amber hover:bg-amber-light text-primary font-bold px-8 py-4 rounded-xl text-lg transition-colors animate-pulse-amber"
              >
                Request Service
              </Link>
              <a
                href={BUSINESS.phone.href}
                className="w-full sm:w-auto border-2 border-primary-foreground/30 text-primary-foreground hover:border-sky hover:text-sky font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                Emergency? Call {BUSINESS.phone.display}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-navy py-4 overflow-hidden" aria-label="Why customers trust Weathers">
        <ul className="hidden md:flex items-center justify-center gap-8 flex-wrap px-4">
          {trustItems.map((item) => (
            <li key={item.text} className="flex items-center gap-2 text-primary-foreground/70 text-sm font-medium whitespace-nowrap">
              <item.icon size={16} className="text-sky" aria-hidden="true" />
              {item.text}
            </li>
          ))}
        </ul>
        <div className="md:hidden flex">
          <ul className="flex animate-marquee gap-8 pl-8">
            {[...trustItems, ...trustItems].map((item, i) => (
              <li
                key={i}
                aria-hidden={i >= trustItems.length}
                className="flex items-center gap-2 text-primary-foreground/70 text-sm font-medium whitespace-nowrap"
              >
                <item.icon size={16} className="text-sky" aria-hidden="true" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-20 bg-background" aria-labelledby="services-heading">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <h2 id="services-heading" className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Total Home Comfort, Inside & Out
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From HVAC to plumbing and electrical, Weathers has you covered.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1} className="h-full">
                <Link
                  to={s.link}
                  className="group flex flex-col h-full bg-card rounded-xl p-6 border border-border hover:border-sky hover:glow-sky transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-sky/10 flex items-center justify-center mb-4 group-hover:bg-sky/20 transition-colors">
                    <s.icon size={24} className="text-sky" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 flex-1">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sky text-sm font-semibold group-hover:underline">
                    Learn More <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ProjectGallery preview />

      {/* WHY CHOOSE WEATHERS */}
      <section className="py-20 bg-gray-section" aria-labelledby="why-heading">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <h2 id="why-heading" className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Columbus Trusts Weathers. Here's Why.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {whyItems.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-sky/10 flex items-center justify-center shrink-0">
                    <f.icon size={20} className="text-sky" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
                    <p className="text-muted-foreground text-sm">{f.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Stats */}
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass-light rounded-xl p-6 text-center">
                <dd className="text-3xl md:text-4xl font-black text-navy">
                  {typeof s.num === "number" ? <CountUp end={s.num} suffix={s.suffix} /> : s.num}
                </dd>
                <dt className="text-muted-foreground text-sm mt-1">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* EMERGENCY CTA */}
      <section className="py-16 bg-amber relative overflow-hidden" aria-labelledby="emergency-heading">
        <div className="absolute inset-0 bg-gradient-to-r from-amber to-amber-light opacity-50" aria-hidden="true" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 id="emergency-heading" className="text-3xl md:text-4xl font-black text-primary mb-3">
              HVAC Emergency? We're Here For You.
            </h2>
            <p className="text-primary/80 text-lg max-w-xl mx-auto mb-8">
              After-hours emergencies happen. Call us directly at{" "}
              <a href={BUSINESS.phone.href} className="font-bold underline underline-offset-4">
                {BUSINESS.phone.display}
              </a>{" "}
              to discuss availability. For non-emergency requests, you can also send a message.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={BUSINESS.phone.href}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy text-primary-foreground font-bold px-8 py-4 rounded-xl text-lg animate-pulse-amber transition-colors"
              >
                <Phone size={20} aria-hidden="true" />
                Call Now
              </a>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary/10 text-primary font-bold px-8 py-4 rounded-xl text-lg hover:bg-primary/20 transition-colors"
              >
                <MessageSquare size={20} aria-hidden="true" />
                Send a Message
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-navy" aria-labelledby="reviews-heading">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <h2 id="reviews-heading" className="text-3xl md:text-4xl font-black text-primary-foreground mb-3">
              What Columbus Is Saying
            </h2>
            <p className="text-primary-foreground/60">
              Rated {BUSINESS.reviews.rating} stars on Google from {BUSINESS.reviews.count}+ reviews
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {reviews.map((r, i) => (
              <AnimatedSection key={r.name} delay={i * 0.15} className="h-full">
                <blockquote className="glass rounded-xl p-6 h-full flex flex-col">
                  <Stars />
                  <p className="text-primary-foreground/90 text-sm my-4 leading-relaxed flex-1">"{r.text}"</p>
                  <footer className="flex items-center justify-between">
                    <cite className="not-italic text-sky text-sm font-semibold">{r.name}</cite>
                    <span className="text-xs text-primary-foreground/50">
                      {r.date} · {r.platform}
                    </span>
                  </footer>
                </blockquote>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center">
            <Link to="/reviews" className="inline-flex items-center gap-1 text-sky font-semibold hover:underline">
              See All Reviews <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* MAINTENANCE PLAN CTA */}
      <section className="py-20 bg-background" aria-labelledby="maintenance-heading">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 id="maintenance-heading" className="text-3xl md:text-4xl font-black text-foreground mb-4">
                Protect Your System Before It Breaks
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Ask about our Weathers Preventive Maintenance Plans. We'll set you up on a once or twice yearly schedule to
                service your A/C and heating system, saving you money and keeping you comfortable year-round.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-block text-center bg-amber hover:bg-amber-light text-primary font-bold px-6 py-3 rounded-xl transition-colors"
                >
                  Ask About Maintenance Plans
                </Link>
                <Link
                  to={servicePath("plans")}
                  className="inline-flex items-center justify-center gap-1 text-sky font-semibold px-6 py-3 hover:underline"
                >
                  Compare plans <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-sky/5 border border-sky/20 rounded-2xl p-8 text-center">
                <Clock size={48} className="text-sky mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-bold text-xl text-foreground mb-2">Preventive Maintenance</h3>
                <p className="text-muted-foreground text-sm">
                  Regular service keeps your system running at peak efficiency and helps you avoid costly emergency repairs.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="py-20 bg-gray-section" aria-labelledby="about-heading">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <AnimatedSection>
            <h2 id="about-heading" className="text-3xl md:text-4xl font-black text-foreground mb-4">
              {BUSINESS.yearsInBusiness} Years. One Name. Weathers.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Since opening our doors, Weathers Air Conditioning has built a name for quality and reliability in Columbus, MS
              and the surrounding area. Our team of qualified professionals have secured a reputation for distinguished
              service, and we look forward to adding you to our growing list of satisfied customers.
            </p>
            <Link to="/about" className="inline-flex items-center gap-1 text-sky font-semibold hover:underline">
              Learn More About Us <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqs={faqs} subtitle="Quick answers to the questions we hear most." />

      {/* CAPABILITY STATEMENT */}
      <section className="py-20 bg-navy-deep" aria-labelledby="capability-heading">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-sky/20 text-sky border border-sky/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <FileText size={14} aria-hidden="true" />
              Capability Statement
            </div>
            <h2 id="capability-heading" className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">
              Federal HVAC Contracting & Capabilities
            </h2>
            <p className="text-primary-foreground/70 leading-relaxed max-w-3xl mx-auto mb-5">
              A trusted HVAC contractor serving residential, commercial, institutional, and government clients across the
              region. We specialize in heating, ventilation, air conditioning, refrigeration, preventative
              maintenance, equipment replacement, and multi-family residential HVAC services.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["Experienced HVAC Team", "TVA Preferred Vendor", "CMMC Level 1 (Self)", "SAM Registered"].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 bg-amber/15 text-amber border border-amber/30 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                >
                  <BadgeCheck size={12} aria-hidden="true" /> {b}
                </span>
              ))}
            </div>
            <p className="text-white/75 text-sm mt-5">CMMC Level 1 self-assessment and affirmation completed.</p>
            <Link to="/federal-hvac-contracting" className="inline-block mt-6 bg-amber text-primary px-6 py-3 rounded-xl font-bold">Explore federal HVAC capabilities →</Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AnimatedSection>
              <div className="glass rounded-2xl p-6 h-full border border-sky/10">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-sky/20">
                  <div className="w-10 h-10 rounded-lg bg-sky/20 flex items-center justify-center">
                    <Wrench size={20} className="text-sky" aria-hidden="true" />
                  </div>
                  <h3 className="text-primary-foreground font-bold text-lg uppercase tracking-wide">Core Competencies</h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-primary-foreground/80 text-sm">
                  {[
                    "HVAC Installation",
                    "HVAC Repair & Troubleshooting",
                    "Preventive Maintenance Agreements",
                    "Commercial HVAC Service",
                    "Residential HVAC Service",
                    "Refrigeration Equipment Service",
                    "Emergency HVAC Service",
                    "Equipment Replacement & Upgrades",
                    "Government & Federal Contract Support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-sky shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="glass rounded-2xl p-6 h-full border border-sky/10">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-sky/20">
                  <div className="w-10 h-10 rounded-lg bg-sky/20 flex items-center justify-center">
                    <Briefcase size={20} className="text-sky" aria-hidden="true" />
                  </div>
                  <h3 className="text-primary-foreground font-bold text-lg uppercase tracking-wide">Company Snapshot</h3>
                </div>
                <div className="space-y-3 text-sm text-primary-foreground/80">
                  <p className="font-semibold text-primary-foreground">{BUSINESS.legalName}</p>
                  <a href={BUSINESS.phone.href} className="flex items-center gap-2 hover:text-sky transition-colors">
                    <Phone size={14} className="text-sky" aria-hidden="true" /> {BUSINESS.phone.display}
                  </a>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="flex items-center gap-2 hover:text-sky transition-colors break-all"
                  >
                    <Mail size={14} className="text-sky shrink-0" aria-hidden="true" /> {BUSINESS.email}
                  </a>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-sky mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      <span className="block">{BUSINESS.address.full}</span>
                      <span className="block text-primary-foreground/60 text-xs mt-0.5">
                        Mailing: {BUSINESS.mailingAddress}
                      </span>
                    </span>
                  </div>
                  <div className="pt-3 border-t border-sky/10">
                    <span className="text-primary-foreground/60">Work Area: </span>
                    <span className="font-semibold text-primary-foreground">Mississippi, Alabama, Tennessee</span>
                  </div>
                  <div className="text-xs text-primary-foreground/50 pt-2 leading-relaxed">
                    CAGE: 88PS9 &nbsp;|&nbsp; UEI: LEP37TXHDXW1
                    <br />
                    License #: R21485 &amp; 04754-MC
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="glass rounded-2xl p-6 h-full border border-sky/10">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-sky/20">
                  <div className="w-10 h-10 rounded-lg bg-sky/20 flex items-center justify-center">
                    <Award size={20} className="text-sky" aria-hidden="true" />
                  </div>
                  <h3 className="text-primary-foreground font-bold text-lg uppercase tracking-wide">Past Performance</h3>
                </div>
                <p className="text-primary-foreground/70 text-sm mb-3">
                  HVAC installation, repair, maintenance, and replacement services for residential and multi-family housing
                  projects, plus preventative maintenance agreements with:
                </p>
                <ul className="space-y-2 text-primary-foreground/80 text-sm mb-4">
                  {[
                    "East Mississippi Community College",
                    "Mississippi University for Women",
                    "Southern Ionics",
                    "Superior Catfish",
                    "Will Clark",
                  ].map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <BadgeCheck size={14} className="text-amber shrink-0" aria-hidden="true" /> {c}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-sky/10 text-sm">
                  <p className="text-amber font-semibold mb-1">TVA Preferred Vendor</p>
                  <p className="text-primary-foreground/70 text-xs">Residential heating and air for multiple-family dwellings.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="glass rounded-2xl p-6 h-full border border-sky/10">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-sky/20">
                  <div className="w-10 h-10 rounded-lg bg-sky/20 flex items-center justify-center">
                    <Star size={20} className="text-sky" aria-hidden="true" />
                  </div>
                  <h3 className="text-primary-foreground font-bold text-lg uppercase tracking-wide">Differentiators</h3>
                </div>
                <ul className="space-y-2 text-primary-foreground/80 text-sm">
                  {[
                    "Responsive and dependable customer service",
                    "Experienced HVAC professionals",
                    "Commitment to quality workmanship",
                    "Focus on safety and compliance",
                    "Government & commercial project support",
                    "Flexible scheduling & emergency response",
                    "Competitive pricing with professional project management",
                  ].map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-sky shrink-0 mt-0.5" aria-hidden="true" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="glass rounded-2xl p-6 h-full border border-sky/10">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-sky/20">
                  <div className="w-10 h-10 rounded-lg bg-sky/20 flex items-center justify-center">
                    <BadgeCheck size={20} className="text-sky" aria-hidden="true" />
                  </div>
                  <h3 className="text-primary-foreground font-bold text-lg uppercase tracking-wide">Credentials & Registrations</h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-primary-foreground/80 text-sm">
                  {[
                    "SAM Registered",
                    "Manual J Certified",
                    "Heat Pump Certified",
                    "City Multi Certified",
                    "EPA Lead Certified",
                    "OSHA Certified",
                    "CMMC Level 1 (Self)",
                    "TVA Preferred Vendor",
                    "Master Mechanical License (MS, AL, TN)",
                  ].map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-sky shrink-0 mt-0.5" aria-hidden="true" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="glass rounded-2xl p-6 h-full border border-sky/10">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-sky/20">
                  <div className="w-10 h-10 rounded-lg bg-sky/20 flex items-center justify-center">
                    <FileText size={20} className="text-sky" aria-hidden="true" />
                  </div>
                  <h3 className="text-primary-foreground font-bold text-lg uppercase tracking-wide">NAICS Codes</h3>
                </div>
                <ul className="space-y-3 text-primary-foreground/80 text-sm">
                  {[
                    { code: "238220", desc: "Plumbing, Heating, and Air-Conditioning Contractors" },
                    { code: "811412", desc: "Appliance Repair and Maintenance" },
                    { code: "423730", desc: "Warm Air Heating & A/C Equipment and Supplies Merchant Wholesalers" },
                  ].map((n) => (
                    <li key={n.code} className="flex gap-3">
                      <span className="text-sky font-bold shrink-0">{n.code}</span>
                      <span className="text-primary-foreground/70 text-xs leading-relaxed">{n.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="glass rounded-2xl p-6 border border-amber/20 bg-amber/5 text-center mt-4">
              <div className="inline-flex items-center gap-2 text-amber font-bold text-xs uppercase tracking-[0.2em] mb-2">
                <Shield size={14} aria-hidden="true" /> Government Contracting Readiness
              </div>
              <p className="text-primary-foreground/80 text-sm max-w-2xl mx-auto">
                Prepared to support federal, state, and local government contracting requirements with professional
                communication, reliable scheduling, and compliant service delivery.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-10">
            <p className="text-primary-foreground/60 text-sm mb-4">
              <a href={BUSINESS.phone.href} className="hover:text-sky">{BUSINESS.phone.display}</a>
              &nbsp;•&nbsp;
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-sky">{BUSINESS.email}</a>
            </p>
            <Link
              to="/contact"
              className="inline-block bg-amber hover:bg-amber-light text-primary font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Request Capability Packet
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
