import { useEffect, useState } from "react";

/** Returns true if user prefers reduced motion */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/** Returns true on mobile (≤900px) */
export function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth <= 900);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
}
