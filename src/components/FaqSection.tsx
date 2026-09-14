import { ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import type { Faq } from "@/lib/schema";

interface FaqSectionProps {
  faqs: Faq[];
  title?: string;
  subtitle?: string;
}

/** Accessible FAQ built on native <details>, styled to match the brand. */
const FaqSection = ({ faqs, title = "Frequently Asked Questions", subtitle }: FaqSectionProps) => (
  <section className="py-20 bg-background" aria-labelledby="faq-heading">
    <div className="container mx-auto px-4 max-w-3xl">
      <AnimatedSection className="text-center mb-10">
        <h2 id="faq-heading" className="text-3xl md:text-4xl font-black text-foreground mb-3">
          {title}
        </h2>
        {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
      </AnimatedSection>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <AnimatedSection key={f.question} delay={i * 0.05}>
            <details className="group bg-card border border-border rounded-xl open:border-sky/40 open:shadow-sm transition-colors">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 font-bold text-foreground [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-sky transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.answer}</p>
            </details>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
