import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/weathers-logo.png";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BUSINESS, SERVICE_LINKS, servicePath } from "@/lib/business";

interface NavItem {
  label: string;
  path: string;
  /** Forces a full page load (needed for the third-party shop plugin). */
  hard?: boolean;
  dropdown?: { label: string; path: string }[];
}

const navLinks: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Service Areas", path: "/service-areas" },
  {
    label: "Services",
    path: "/services",
    dropdown: [...SERVICE_LINKS.map((s) => ({ label: s.label, path: servicePath(s.id) })), { label: "Federal HVAC Contracting", path: "/federal-hvac-contracting" }],
  },
  { label: "Shop", path: "/shop", hard: true },
  { label: "Reviews", path: "/reviews" },
  { label: "Blog", path: "/blog" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 140);
  };

  const isActive = (path: string) => location.pathname === path;

  const desktopLinkClass = (path: string) =>
    `px-2 py-2 text-sm font-medium transition-colors rounded-md ${
      isActive(path) ? "text-sky" : "text-primary-foreground/80 hover:text-sky"
    }`;
  const mobileLinkClass = (path: string) =>
    `block py-3 text-lg font-semibold transition-colors ${
      isActive(path) ? "text-sky" : "text-primary-foreground/90"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "bg-navy shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" aria-label={`${BUSINESS.name} home`} className="flex items-center">
          <img
            src={logo}
            alt={BUSINESS.name}
            width={500}
            height={212}
            className="h-10 lg:h-12 w-auto bg-white rounded-md px-2 py-1 shadow-sm"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={scheduleClose}
                onFocus={openDropdown}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
                }}
              >
                <Link
                  to={link.path}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  className={`${desktopLinkClass(link.path)} flex items-center gap-1`}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </Link>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-60">
                    <div className="bg-navy-deep rounded-lg shadow-xl border border-sky/10 py-2 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          className="block px-4 py-2 text-sm text-primary-foreground/80 hover:text-sky hover:bg-sky/5 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : link.hard ? (
              <a key={link.label} href={link.path} className={desktopLinkClass(link.path)}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.path} className={desktopLinkClass(link.path)}>
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <a
            href={BUSINESS.phone.href}
            className="flex items-center gap-2 text-primary-foreground/90 text-sm font-medium hover:text-sky transition-colors"
          >
            <Phone size={16} aria-hidden="true" />
            {BUSINESS.phone.display}
          </a>
          <a
            href={BUSINESS.phone.href}
            className="bg-amber hover:bg-amber-light text-primary font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Call Now
          </a>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="xl:hidden text-primary-foreground p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-navy border-l border-sky/10 p-0 w-[85vw] sm:max-w-sm "
          >
            <SheetTitle className="sr-only">Site navigation</SheetTitle>
            <nav className="flex flex-col h-full px-6 py-8 gap-1 overflow-y-auto" aria-label="Mobile">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <Collapsible key={link.label} open={mobileServicesOpen} onOpenChange={setMobileServicesOpen}>
                    <div className="flex items-center justify-between">
                      <Link to={link.path} className={`${mobileLinkClass(link.path)} flex-1`}>
                        {link.label}
                      </Link>
                      <CollapsibleTrigger
                        aria-label="Toggle services menu"
                        className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-primary-foreground/80 hover:text-sky transition-colors"
                      >
                        <ChevronDown
                          size={20}
                          aria-hidden="true"
                          className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                      <div className="pl-4 flex flex-col gap-1 pb-2 border-l border-sky/20 ml-2">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            className="py-2 px-3 text-sm text-primary-foreground/70 hover:text-sky transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : link.hard ? (
                  <a key={link.label} href={link.path} className={mobileLinkClass(link.path)}>
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} to={link.path} className={mobileLinkClass(link.path)}>
                    {link.label}
                  </Link>
                ),
              )}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={BUSINESS.phone.href}
                  className="flex items-center justify-center gap-2 bg-amber text-primary font-bold py-3 rounded-lg text-lg"
                >
                  <Phone size={20} aria-hidden="true" />
                  Call {BUSINESS.phone.display}
                </a>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-bold py-3 rounded-lg text-lg"
                >
                  Request Service
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
