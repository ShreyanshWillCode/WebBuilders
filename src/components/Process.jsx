import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, animate, useInView, useAnimationFrame } from "framer-motion";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion";
import "./Process.css";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

const steps = [
  { num: "01", label: "DISCOVER", cls: "process__circle--red" },
  { num: "02", label: "PLAN",     cls: "process__circle--yellow" },
  { num: "03", label: "DESIGN",   cls: "process__circle--teal" },
  { num: "04", label: "BUILD",    sub: "Develop",  cls: "process__circle--red" },
  { num: "05", label: "TEST",     sub: "Validate", cls: "process__circle--yellow" },
  { num: "06", label: "LAUNCH",   sub: "Release",  cls: "process__circle--teal" },
];

const statData = [
  { raw: 10,  suffix: "+",   label: "Happy Clients" },
  { raw: 20,  suffix: "+",   label: "Delivered Projects" },
  { raw: 12,  suffix: "hrs", prefix: "<", label: "Average response time" },
];

const ease = [0.25, 0.1, 0.25, 1];
const DIGITS = ["0","1","2","3","4","5","6","7","8","9"];
const CHARS  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/* ─────────────────────────────────────────
   ODOMETER — one vertical reel per digit
   ───────────────────────────────────────── */
function OdometerDigit({ digit, delay, inView, reduced }) {
  const idx = DIGITS.indexOf(digit);
  if (idx === -1) {
    /* Non-numeric char (e.g. prefix / suffix) — just fade in */
    return (
      <motion.span
        className="odo__static"
        initial={reduced ? false : { opacity: 0, y: "60%" }}
        animate={
          inView && !reduced
            ? { opacity: 1, y: "0%", transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } }
            : { opacity: 0, y: "60%", transition: { duration: 0 } }
        }
      >
        {digit}
      </motion.span>
    );
  }

  /* Roll: start at 0 (top of strip), animate to target index */
  return (
    <span className="odo__window">
      <motion.span
        className="odo__strip"
        initial={reduced ? false : { y: "0%" }}
        animate={
          inView && !reduced
            ? { y: `-${idx * 10}%`, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] } }
            : { y: "0%", transition: { duration: 0 } }
        }
      >
        {DIGITS.map((d) => (
          <span className="odo__cell" key={d}>{d}</span>
        ))}
      </motion.span>
    </span>
  );
}

function Odometer({ value, prefix = "", suffix = "", inView, reduced, baseDelay = 0 }) {
  /* Combine prefix + digits + suffix into a single character array */
  const chars = `${prefix}${value}${suffix}`.split("");
  /* Digit characters start after the prefix */
  return (
    <span className="odo__number">
      {chars.map((ch, i) => (
        <OdometerDigit
          key={i}
          digit={ch}
          delay={baseDelay + i * 0.08}
          inView={inView}
          reduced={reduced}
        />
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────
   SCRAMBLE — label text cycles characters
   ───────────────────────────────────────── */
function ScrambleText({ text, inView, delay = 0, reduced }) {
  const upperText = text.toUpperCase();
  const [display, setDisplay] = useState(() => upperText.replace(/\S/g, "\u00A0"));

  useEffect(() => {
    if (reduced) { setDisplay(upperText); return; }
    if (!inView) {
      setDisplay(upperText.replace(/\S/g, "\u00A0"));
      return;
    }

    let frame = 0;
    const totalFrames = upperText.length * 3; /* 3 frames per char */
    let raf;

    const startTime = performance.now();
    const frameDuration = 38; /* ms per update */

    const tick = (now) => {
      const elapsed = now - startTime;
      frame = Math.floor(elapsed / frameDuration);

      if (frame >= totalFrames) {
        setDisplay(upperText);
        return;
      }

      const settled = Math.floor(frame / 3); /* chars settled so far */
      setDisplay(
        upperText.split("").map((ch, i) => {
          if (ch === " ") return " ";
          if (i < settled) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      raf = requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [inView, upperText, delay, reduced]);

  return <span className="scramble">{display}</span>;
}

/* ─────────────────────────────────────────
   STAT STRIP — single inView gates both
   ───────────────────────────────────────── */
function StatStrip({ reduced }) {
  const stripRef = useRef(null);
  const inView = useInView(stripRef, { once: false, amount: 0.6 });

  return (
    <div className="stats" ref={stripRef}>
      {statData.map((s, i) => (
        <React.Fragment key={s.label}>
          <div className="stats__item">

            {/* Odometer number */}
            <span className="stats__num">
              {reduced
                ? `${s.prefix ?? ""}${s.raw}${s.suffix}`
                : (
                  <Odometer
                    value={s.raw}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix}
                    inView={inView}
                    reduced={reduced}
                    baseDelay={i * 0.15}
                  />
                )
              }
            </span>

            {/* Scramble label */}
            <span className="stats__label">
              <ScrambleText
                text={s.label}
                inView={inView}
                delay={i * 0.15 + 0.3}
                reduced={reduced}
              />
            </span>

          </div>
          {i < statData.length - 1 && <div className="stats__divider" />}
        </React.Fragment>
      ))}
    </div>
  );
}


export default function Process() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const circleRefs = useRef([]);
  const [pathData, setPathData] = useState("");

  /* Scroll progress scoped to the whole section */
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Scroll progress scoped to the timeline only for the fill bar */
  const { scrollYProgress: tlProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 40%"],
  });

  const rawFill = useTransform(tlProgress, [0, 1], [0, 1]);
  const fillWidth = useSpring(rawFill, { stiffness: 80, damping: 22 });

  const pathRef = useRef(null);
  const arrowRef = useRef(null);

  /* Track arrowhead along the path */
  useAnimationFrame(() => {
    if (!pathRef.current || !arrowRef.current || !pathData || reduced) return;
    const totalLength = pathRef.current.getTotalLength();
    if (totalLength === 0) return;

    const currentLen = totalLength * fillWidth.get();
    if (currentLen <= 0) {
      arrowRef.current.style.opacity = 0;
      return;
    }
    arrowRef.current.style.opacity = 1;

    const pt = pathRef.current.getPointAtLength(currentLen);
    const prevPt = pathRef.current.getPointAtLength(Math.max(0, currentLen - 1));
    const angle = Math.atan2(pt.y - prevPt.y, pt.x - prevPt.x) * (180 / Math.PI);

    arrowRef.current.style.transform = `translate(${pt.x}px, ${pt.y}px) rotate(${angle}deg)`;
  });

  /* Update SVG path based on circle positions */
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;
      const points = circleRefs.current.map(el => {
        if (!el) return null;
        let x = 0;
        let y = 0;
        let current = el;
        while (current && current !== containerRef.current) {
          x += current.offsetLeft;
          y += current.offsetTop;
          current = current.offsetParent;
        }
        return {
          x: x + el.offsetWidth / 2,
          y: y + el.offsetHeight / 2
        };
      });

      if (points.length === steps.length && points.every(p => p !== null)) {
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
          d += ` L ${points[i].x} ${points[i].y}`;
        }
        setPathData(d);
      }
    };

    // Delay slightly to allow layout to settle, plus bind to resize
    const timer = setTimeout(updatePath, 100);
    window.addEventListener("resize", updatePath);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePath);
    };
  }, []);

  /* How many steps are "active" — one for every 1/n of scroll through the timeline */
  const [activeStep, setActiveStep] = useState(-1);
  useEffect(() => {
    return tlProgress.on("change", (v) => {
      // Map 0-1 to 0-5 evenly. min() ensures we don't go out of bounds if v=1.
      setActiveStep(Math.min(steps.length - 1, Math.floor(v * steps.length)));
    });
  }, [tlProgress]);

  const headlineY = useTransform(sectionProgress, [0, 1], reduced ? [0, 0] : [30, -30]);

  return (
    <section className="section process" id="process" ref={sectionRef}>
      <div className="section__inner">
        <AnimatedSectionHeading direction="right">
          02 / THE WAY WE BUILD
        </AnimatedSectionHeading>

        <motion.h2
          className="section__headline"
          style={{ y: headlineY }}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="h-filled">FROM FIRST CALL</span><br />
          <span className="h-outline">TO FIRST </span>
          <span className="h-accent-yellow">RELEASE.</span>
        </motion.h2>

        {/* ── Scroll-driven timeline ── */}
        <div className="process__timeline" ref={timelineRef}>
          <div className="process__steps" ref={containerRef}>
            {/* SVG Snaking Background Line */}
            <svg className="process__svg-container">
              {pathData && <path d={pathData} className="process__svg-path-bg" />}
              {pathData && !reduced && (
                <>
                  <motion.path
                    ref={pathRef}
                    d={pathData}
                    className="process__svg-path-fill"
                    style={{ pathLength: fillWidth }}
                  />
                  <polygon
                    ref={arrowRef}
                    points="-12,-6 0,0 -12,6"
                    fill="var(--black)"
                    style={{ transformOrigin: "0 0" }}
                  />
                </>
              )}
            </svg>

            {steps.map((s, i) => {
              const isActive = i <= activeStep;
              return (
                <motion.div
                  className="process__step"
                  key={s.num}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                >
                  <motion.div
                    className={`process__circle ${s.cls}${isActive && !reduced ? " is-active" : ""}`}
                    ref={(el) => (circleRefs.current[i] = el)}
                    animate={
                      reduced ? {} : { scale: isActive ? 1.12 : 1 }
                    }
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    {s.num}
                  </motion.div>
                  <div className="process__step-info">
                    <strong>{s.label}</strong>
                    {s.sub && <span>{s.sub}</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Stats strip — numbers + labels roll in on scroll ── */}
        <StatStrip reduced={reduced} />
      </div>
    </section>
  );
}
