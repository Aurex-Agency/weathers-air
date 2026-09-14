import { Link, useLocation } from "react-router-dom";
import { Home, Phone } from "lucide-react";
import Seo from "@/components/Seo";
import { BUSINESS } from "@/lib/business";

const NotFound = () => {
  const location = useLocation();

  return (
    <section className="relative min-h-[75svh] flex items-center justify-center hero-gradient overflow-hidden pt-16 lg:pt-20">
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist." path={location.pathname} noIndex />
      <div className="hero-particles" aria-hidden="true" />
      <div className="relative z-10 container mx-auto px-4 text-center py-20">
        <p className="text-sky uppercase tracking-[0.25em] text-sm font-bold mb-4">404</p>
        <h1 className="text-4xl md:text-6xl font-black text-primary-foreground mb-4">Looks like this page blew away.</h1>
        <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-10">
          We couldn't find <code className="text-sky break-all">{location.pathname}</code>. Whatever the weather, we're
          still just a call away.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber-light text-primary font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            <Home size={18} aria-hidden="true" />
            Back to Home
          </Link>
          <a
            href={BUSINESS.phone.href}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground hover:border-sky hover:text-sky font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            <Phone size={18} aria-hidden="true" />
            Call {BUSINESS.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
