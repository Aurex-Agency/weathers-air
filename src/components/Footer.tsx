import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Mail, Loader2, CheckCircle2 } from "lucide-react";
import logo from "@/assets/weathers-logo.png";
import SocialLinks from "@/components/SocialLinks";
import { BUSINESS, LICENSE_LINE, MAP_DIRECTIONS_URL } from "@/lib/business";
import { submitForm, FormNotConfiguredError, buildMailto } from "@/lib/submit";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Shop", path: "/shop", hard: true },
  { label: "Reviews", path: "/reviews" },
  { label: "Blog", path: "/blog" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

type Status = "idle" | "sending" | "done" | "error";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = (e.currentTarget.elements.namedItem("company") as HTMLInputElement | null)?.value;
    if (honeypot) return; // bot
    setStatus("sending");
    try {
      await submitForm({ form: "newsletter", email });
      setStatus("done");
    } catch (err) {
      if (err instanceof FormNotConfiguredError) {
        window.location.href = buildMailto(BUSINESS.email, "Newsletter signup", { Email: email });
        setStatus("error");
      } else {
        setStatus("error");
      }
    }
  };

  if (status === "done") {
    return (
      <p className="flex items-center gap-2 text-sm text-sky mb-6" role="status">
        <CheckCircle2 size={16} aria-hidden="true" /> Thanks! Your signup request has been sent.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mb-6">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 min-w-0 bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-sky"
        />
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-amber hover:bg-amber-light disabled:opacity-60 text-primary font-bold text-sm px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          {status === "sending" && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
          Subscribe
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-amber mt-2" role="alert">
          Something went wrong. Please try again or call us.
        </p>
      )}
    </form>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-deep text-primary-foreground/80 pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt={BUSINESS.name}
              width={500}
              height={212}
              loading="lazy"
              className="h-16 w-auto bg-white rounded-md px-3 py-2 mb-4 shadow-sm"
            />
            <p className="text-sm uppercase tracking-[0.2em] text-sky/70 font-semibold mb-4">{BUSINESS.tagline}</p>
            <p className="text-sm leading-relaxed text-primary-foreground/60">
              Based in Columbus, MS. HVAC, plumbing and electrical service in Mississippi, Alabama and Tennessee.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer">
            <h2 className="text-primary-foreground font-bold mb-4">Quick Links</h2>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.hard ? (
                    <a href={link.path} className="text-sm hover:text-sky transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.path} className="text-sm hover:text-sky transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h2 className="text-primary-foreground font-bold mb-4">Contact</h2>
            <address className="not-italic flex flex-col gap-3 text-sm">
              <a href={BUSINESS.phone.href} className="flex items-center gap-2 hover:text-sky transition-colors">
                <Phone size={16} className="text-sky shrink-0" aria-hidden="true" />
                {BUSINESS.phone.display}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 hover:text-sky transition-colors break-all">
                <Mail size={16} className="text-sky shrink-0" aria-hidden="true" />
                {BUSINESS.email}
              </a>
              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-sky transition-colors"
              >
                <MapPin size={16} className="text-sky mt-0.5 shrink-0" aria-hidden="true" />
                {BUSINESS.address.full}
              </a>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-sky shrink-0" aria-hidden="true" />
                {BUSINESS.hours.short}
              </div>
            </address>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h2 className="text-primary-foreground font-bold mb-4">Stay Updated</h2>
            <Newsletter />
            <p className="text-xs mb-4">Signup requests are sent to our office. <Link to="/privacy-policy" className="underline">Privacy policy</Link></p>
            <SocialLinks
              size={16}
              linkClassName="w-9 h-9 bg-primary-foreground/5 hover:bg-sky/20 hover:text-sky"
            />
          </div>
        </div>

        {/* Partners / legal */}
        <div className="border-t border-primary-foreground/10 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/40 text-center md:text-left">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-primary-foreground/60">Partners:</span>
              {BUSINESS.partners.map((p, i) => (
                <span key={p} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden="true">•</span>}
                  {p}
                </span>
              ))}
            </div>
            <div>Licenses: {LICENSE_LINE}</div>
            <div>
              © {year} {BUSINESS.legalName} All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
