import { Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { BUSINESS } from "@/lib/business";

const MobileBottomBar = () => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.12)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={BUSINESS.phone.href}
        className="flex-1 flex items-center justify-center gap-2 bg-amber text-primary font-bold py-3.5 text-sm min-h-[52px]"
      >
        <Phone size={18} aria-hidden="true" />
        Call Now
      </a>
      <Link
        to="/contact"
        className="flex-1 flex items-center justify-center gap-2 bg-navy text-primary-foreground font-bold py-3.5 text-sm min-h-[52px]"
      >
        <Calendar size={18} aria-hidden="true" />
        Schedule Service
      </Link>
    </div>
  );
};

export default MobileBottomBar;
