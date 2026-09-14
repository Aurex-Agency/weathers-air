import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  headline: string;
  subheadline?: string;
  eyebrow?: string;
  children?: ReactNode;
  className?: string;
}

const PageHero = ({ headline, subheadline, eyebrow, children, className }: PageHeroProps) => {
  return (
    <section
      className={cn(
        "relative min-h-[46vh] flex items-center justify-center hero-gradient overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20",
        className,
      )}
    >
      <div className="hero-particles" aria-hidden="true" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        {eyebrow && (
          <p className="text-sky uppercase tracking-[0.25em] text-xs md:text-sm font-bold mb-4">{eyebrow}</p>
        )}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-4 leading-tight text-balance">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto text-balance">{subheadline}</p>
        )}
        {children}
      </div>
    </section>
  );
};

export default PageHero;
