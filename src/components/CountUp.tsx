interface CountUpProps { end: number; suffix?: string; prefix?: string; duration?: number; className?: string; }
// Keep business facts readable before JavaScript runs and by assistive technology.
const CountUp = ({ end, suffix = "", prefix = "", className = "" }: CountUpProps) => (
  <span className={className}>{prefix}{end.toLocaleString("en-US")}{suffix}</span>
);
export default CountUp;
