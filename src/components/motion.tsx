"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -20px 0px" }}
      transition={{
        duration: 0.68,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedNumber({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!visible || reduce) return;
    const controls = animate(0, value, {
      duration: 1.65,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => setDisplay(Math.round(n)),
    });
    return () => controls.stop();
  }, [visible, value, reduce]);

  return (
    <span ref={ref} aria-label={`${value.toLocaleString("en-US")}${suffix}`}>
      <span aria-hidden="true">
        {display.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}
