import { useEffect, useRef } from "react";

export function useReveal() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = sectionRef.current?.querySelectorAll("[data-reveal]");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const siblings = [...el.parentElement.querySelectorAll("[data-reveal]")];
            const idx = siblings.indexOf(el);
            el.style.transitionDelay = `${idx * 80}ms`;
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return sectionRef;
}
