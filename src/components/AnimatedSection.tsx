import { ReactNode } from "react";
interface AnimatedSectionProps { children: ReactNode; className?: string; delay?: number; }
// Content remains visible in generated HTML, with reduced motion and if JavaScript fails.
const AnimatedSection = ({ children, className = "" }: AnimatedSectionProps) => <div className={className}>{children}</div>;
export default AnimatedSection;
