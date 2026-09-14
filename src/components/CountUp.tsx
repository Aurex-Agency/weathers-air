import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const CountUp = ({ end, suffix = "", prefix = "", duration = 2, className = "" }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? end : 0);

  useEffect(() => {
    if (!isInView || reduceMotion) {
      if (reduceMotion) setCount(end);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

export default CountUp;
