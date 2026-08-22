import { useEffect, useRef } from "react";

/**
 * useParallax — attaches a subtle vertical parallax offset to the ref element.
 * @param {number} speed  - 0.0 (no effect) to 0.3 (strong). Default 0.12.
 * @param {string} origin - CSS transform-origin. Default "center center".
 */
export function useParallax(speed = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        // How far the element's center is from the viewport center
        const centerOffset = rect.top + rect.height / 2 - viewH / 2;
        const offset = centerOffset * speed;
        el.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial position

    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return ref;
}
