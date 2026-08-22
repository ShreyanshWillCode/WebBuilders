import React, { useEffect, useRef, useState } from "react";

/* ── Rotating middle phrases ── */
const PHRASES = [
  { line1: "PRODUCTS", line2: "THAT MOVE", accent: "YOUR" },
  { line1: "SOLUTIONS", line2: "THAT GROW", accent: "YOUR" },
  { line1: "EXPERIENCES", line2: "THAT SCALE", accent: "YOUR" },
  { line1: "SYSTEMS", line2: "THAT POWER", accent: "YOUR" },
];
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion";
import "./Hero.css";

/* ── Shared easing ── */
const ease = [0.25, 0.1, 0.25, 1];

/* ── Stagger variants for headline lines ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const lineVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};
const accentVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.05, ease } },
};
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease } },
});
const illustrationVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, delay: 0.3, ease } },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  /* ── Scroll progress for this section ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* ── Scroll-driven parallax layers ── */
  const textY    = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60]);
  const textOp   = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const illustY  = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -100]);
  const dotY     = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 80]);

  /* ── Mouse parallax (desktop only) ── */
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springCfg = { stiffness: 60, damping: 18, mass: 0.6 };
  const mouseX = useSpring(rawMouseX, springCfg);
  const mouseY = useSpring(rawMouseY, springCfg);

  useEffect(() => {
    if (reduced || isMobile) return;
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      rawMouseX.set(((e.clientX - cx) / cx) * 12);
      rawMouseY.set(((e.clientY - cy) / cy) * 8);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduced, isMobile, rawMouseX, rawMouseY]);

  const dotMouseX = useTransform(mouseX, (v) => v * 1.2);
  const dotMouseY = useTransform(mouseY, (v) => v * 1.2);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero__grain" aria-hidden="true" />

      <motion.div className="hero__inner" style={reduced ? {} : { y: textY, opacity: textOp }}>
        {/* ── LEFT COLUMN ── */}
        <div className="hero__left">
          <motion.p
            className="hero__eyebrow"
            variants={fadeUp(0)}
            initial="hidden"
            animate="visible"
          >
            WE BUILD AROUND THE WAY YOU WORK.
          </motion.p>

          <RotatingHeadline reduced={reduced} />

          <motion.p className="hero__sub" variants={fadeUp(0.5)} initial="hidden" animate="visible">
            NO TEMPLATES. NO BLACK BOX. JUST BUILT FOR YOU.
          </motion.p>

          <motion.p className="hero__body" variants={fadeUp(0.6)} initial="hidden" animate="visible">
            Custom websites, web applications and Android products — designed
            around your requirements, built transparently, and made to grow
            with the business.
          </motion.p>

          <motion.div
            className="hero__actions"
            variants={fadeUp(0.72)}
            initial="hidden"
            animate="visible"
          >
            <a
              href="#contact"
              className="hero__btn hero__btn--dark"
              onClick={(e) => scrollTo(e, "#contact")}
            >
              START A PROJECT →
            </a>
            <a
              href="#work"
              className="hero__btn hero__btn--light"
              onClick={(e) => scrollTo(e, "#work")}
            >
              SEE OUR WORK ↗
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — layered illustration ── */}
        <div className="hero__right" aria-hidden="true">
          <motion.div
            className="hero__illus"
            style={reduced ? {} : { y: illustY }}
            variants={illustrationVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Orange dot — separate parallax layer */}
            <motion.div
              className="hero__dot hero__dot--tl"
              style={
                reduced
                  ? {}
                  : { y: dotY, x: dotMouseX, translateY: dotMouseY }
              }
            />

            <div className="hero__illus-card">
              <div className="hero__browser">
                <div className="hero__browser-bar">
                  <span /><span /><span />
                </div>
                <div className="hero__browser-body">
                  <svg className="hero__svg" viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="10" width="240" height="180" rx="8" fill="#1a1a2e"/>
                    <circle cx="40" cy="35" r="1.5" fill="white" opacity="0.6"/>
                    <circle cx="80" cy="25" r="1"   fill="white" opacity="0.5"/>
                    <circle cx="200" cy="40" r="1.5" fill="white" opacity="0.7"/>
                    <circle cx="220" cy="20" r="1"   fill="white" opacity="0.4"/>
                    <circle cx="160" cy="30" r="1"   fill="white" opacity="0.5"/>
                    <rect x="10" y="150" width="240" height="40" fill="#e8e2d5"/>
                    <path d="M95 150 L95 80 Q95 45 130 45 Q165 45 165 80 L165 150 Z" fill="#f0ebe1" stroke="#1a1a1a" strokeWidth="2.5"/>
                    <path d="M105 150 L105 83 Q105 58 130 58 Q155 58 155 83 L155 150 Z" fill="#1a1a2e"/>
                    <rect x="118" y="140" width="24" height="5" fill="#FF5A36" opacity="0.8"/>
                    <rect x="122" y="132" width="18" height="5" fill="#FF5A36" opacity="0.7"/>
                    <rect x="126" y="124" width="12" height="5" fill="#FF5A36" opacity="0.6"/>
                    <rect x="128" y="116" width="8"  height="5" fill="#FF5A36" opacity="0.5"/>
                    <rect x="105" y="20" width="50" height="26" rx="4" fill="#1a1a1a"/>
                    <text x="130" y="37" textAnchor="middle" fill="#FF5A36" fontFamily="monospace" fontSize="12" fontWeight="bold">&lt;/&gt;</text>
                    <rect x="18" y="55" width="70" height="90" rx="4" fill="#f0ebe1" stroke="#1a1a1a" strokeWidth="1.5"/>
                    <rect x="18" y="55" width="70" height="14" rx="4" fill="#e8e2d5"/>
                    <circle cx="25" cy="62" r="3" fill="#FF5A36"/>
                    <circle cx="34" cy="62" r="3" fill="#1a1a1a" opacity="0.2"/>
                    <circle cx="43" cy="62" r="3" fill="#1a1a1a" opacity="0.2"/>
                    <rect x="24" y="78"  width="35" height="3" rx="1.5" fill="#1a1a1a" opacity="0.2"/>
                    <rect x="24" y="86"  width="50" height="3" rx="1.5" fill="#FF5A36" opacity="0.4"/>
                    <rect x="24" y="94"  width="42" height="3" rx="1.5" fill="#1a1a1a" opacity="0.2"/>
                    <rect x="24" y="102" width="30" height="3" rx="1.5" fill="#FF5A36" opacity="0.3"/>
                    <rect x="24" y="110" width="45" height="3" rx="1.5" fill="#1a1a1a" opacity="0.15"/>
                    <rect x="24" y="118" width="28" height="3" rx="1.5" fill="#1a1a1a" opacity="0.2"/>
                  </svg>
                </div>
              </div>
            </div>

            <motion.div
              className="hero__dot hero__dot--br1"
              style={reduced ? {} : { y: dotY, x: dotMouseX }}
            />
            <div className="hero__dot hero__dot--br2" />
            <div className="hero__sq" />
          </motion.div>
        </div>
      </motion.div>

      {/* ── TICKER BOTTOM ── */}
      <div className="hero__ticker-wrap">
        <div className="hero__ticker-inner">
          {Array.from({ length: 12 }).map((_, i) => (
            <React.Fragment key={i}>
              <span>{["IDEA", "PRODUCT", "GROWTH"][i % 3]}</span>
              <span className="hero__ticker-arrow">→</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   ROTATING HEADLINE — only the middle phrase
   cycles; DIGITAL and BUSINESS. never move.
   ──────────────────────────────────────────── */
function RotatingHeadline({ reduced }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, 2500);
    return () => clearInterval(id);
  }, [reduced]);

  const phrase = PHRASES[index];

  /* Transition config for enter / exit */
  const phraseTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
  const phraseInitial    = reduced ? false : { y: "110%", opacity: 0 };
  const phraseAnimate    = { y: "0%",   opacity: 1, transition: phraseTransition };
  const phraseExit       = reduced ? {} : { y: "-110%", opacity: 0, transition: { ...phraseTransition, duration: 0.4 } };

  return (
    <h1 className="hero__headline">
      {/* ── Static: never re-renders ── */}
      <span className="hl hl--filled">DIGITAL</span>
      <br />

      {/* ── Animated roller — 2 lines with fixed height clip ── */}
      <span className="hero__phrase-roller">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            className="hero__phrase-inner"
            initial={phraseInitial}
            animate={phraseAnimate}
            exit={phraseExit}
          >
            <span className="hl hl--outline">{phrase.line1}</span>
            <br />
            <span className="hl hl--outline">{phrase.line2} </span>
            <span className="hl hl--accent">{phrase.accent}</span>
          </motion.span>
        </AnimatePresence>
      </span>

      {/* ── Static: never re-renders ── */}
      <span className="hl hl--filled">BUSINESS.</span>
    </h1>
  );
}
