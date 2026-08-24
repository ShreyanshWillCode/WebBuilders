import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion";
import "./Works.css";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

const projects = [
  { num: "01", cat: "FREELANCE",   name: "VELORAGT",              desc: "A full-stack Reddit marketing platform — role-based dashboards for owners, distributors, members, and moderators managing campaigns and task queues at scale.", category: "freelance", slides: ["/projects/reddit1 (1).png", "/projects/reddit1 (2).png"],                                        tech: ["React", "Node.js", "RBAC", "WebSocket"],              live: "https://veloragt.in/",                           fromY: 60 },
  { num: "02", cat: "FREELANCE",   name: "ZAIGRO",                desc: "A freelance digital platform for a local food and grocery delivery service.",                                                    category: "freelance", slides: ["/projects/Zaigro.png", "/projects/zaigroo.png"],                                                    tech: ["React", "Web Delivery"],                               live: "https://zaigro.in/",                             fromY: 70 },
  { num: "03", cat: "FREELANCE",   name: "DENTAL CLINIC DEMO",    desc: "A modern, responsive dental clinic website demo showcasing services, appointments, and clinic information.",                    category: "freelance", slides: ["/projects/dental.png", "/projects/dental clinic.png", "/projects/dental clinic 2.png"],           tech: ["React", "Responsive Design"],                          live: "https://dental-clinic-sample-swart.vercel.app/", fromY: 80 },
  { num: "04", cat: "WEB APP",     name: "HOUSE RENTAL",          desc: "A modern house rental platform to browse, list, and manage rental properties.",                                                category: "web",      slides: ["/projects/House.png", "/projects/House rental.png", "/projects/House rental2.png"],              tech: ["React", "Node.js", "MongoDB", "Express"],              repo: "https://github.com/ShreyanshWillCode/House-Rental-", live: "https://house-rental-blush.vercel.app/",         fromY: 60 },
  { num: "05", cat: "WEB APP",     name: "MINI-SEARCH ENGINE",    desc: "A lightweight search engine that crawls, indexes, and ranks pages using TF-IDF and BFS — built from scratch.",                 category: "python",   img: "/projects/gravity search.png",                                                                               tech: ["Python", "TF-IDF", "BFS", "Algorithms"],               repo: "https://github.com/ShreyanshWillCode/Mini-Search-Engine", live: "https://mini-search-engine-eight.vercel.app/", fromY: 70 },
  { num: "06", cat: "WEB APP",     name: "EWALLET",               desc: "A secure digital wallet for managing real money transactions, featuring a sleek modern interface.",                              category: "web",      img: "/projects/Ewallet.png",                                                                                      tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"],         repo: "https://github.com/ShreyanshWillCode/User-Wallet-APP", live: "https://ewallet-eight.vercel.app/",              fromY: 80 },
];

const filters = [
  { id: "all",       label: "ALL PROJECTS",       cls: "works__filter--orange" },
  { id: "web",       label: "WEB APPS",            cls: "works__filter--teal" },
  { id: "python",    label: "PYTHON / ALGORITHMS", cls: "works__filter--yellow" },
  { id: "freelance", label: "FREELANCE",           cls: "works__filter--blue" },
];

const ease = [0.25, 0.1, 0.25, 1];

const cardVariants = {
  hidden: (p) => ({ opacity: 0, y: p.fromY }),
  visible: (i)  => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease } }),
  exit:          { opacity: 0, y: 20, transition: { duration: 0.25 } },
};

export default function Works() {
  const [active, setActive] = useState("all");
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [20, -20]);

  const visible = projects.filter((p) => active === "all" || p.category === active);

  return (
    <section className="section works" id="work" ref={sectionRef}>
      <div className="section__inner">
        <div className="works__header">
          <AnimatedSectionHeading direction="right">04 / SELECTED WORK</AnimatedSectionHeading>
          <div className="works__title-row">
            <TextRoll text="|Our Works" style={{ y: headY }} reduced={reduced} />
            <motion.p
              className="works__sub"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              A few selected stories to show how we solve complex problems.
            </motion.p>
          </div>
        </div>

        <div className="works__filters" role="tablist">
          {filters.map((f) => (
            <motion.button
              key={f.id}
              className={`works__filter ${f.cls}${active === f.id ? " is-active" : ""}`}
              role="tab"
              aria-selected={active === f.id}
              onClick={() => setActive(f.id)}
              whileHover={reduced ? {} : { y: -2 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        <div className="works__grid" role="tabpanel">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                key={p.name}
                className="project__card"
                custom={p}
                variants={reduced ? {} : cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={
                  reduced || isMobile
                    ? {}
                    : { y: -6, boxShadow: "7px 7px 0 #1a1a1a", transition: { duration: 0.2 } }
                }
              >
                <div className="project__thumb project__thumb--img">
                  {p.slides
                    ? <SlidingThumb slides={p.slides} name={p.name} />
                    : <img src={p.img} alt={p.name} className="project__screenshot" loading="lazy" />}
                </div>
                <div className="project__info">
                  <div className="project__meta">
                    <span className="project__num">{p.num}</span>
                    <span className="project__cat">{p.cat}</span>
                  </div>
                  <h3 className="project__name">{p.name}</h3>
                  <p className="project__desc">{p.desc}</p>
                  <div className="project__tags">
                    {p.tech.slice(0,3).map(t => <span key={t} className="project__tag">{t}</span>)}
                  </div>
                  <div className="project__links">
                    {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="project__link">LIVE &rarr;</a>}
                    {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer" className="project__link project__link--ghost">REPO</a>}
                  </div>
                </div>
              </motion.article>
            ))}
            {visible.length === 0 && (
              <motion.p
                className="works__empty"
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No projects in this category yet. <a href="#contact">Ask us about it →</a>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ── Sliding thumbnail — gapless CSS strip ── */
function SlidingThumb({ slides, name }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx(i => (i + 1) % slides.length);
    }, 2500);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="slide__track" aria-label={`${name} screenshots`}>
      {/* Single flex strip — all images sit side by side, strip slides left */}
      <motion.div
        className="slide__strip"
        animate={{ x: `-${idx * 100}%` }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${name} screenshot ${i + 1}`}
            className="slide__img"
            loading="lazy"
          />
        ))}
      </motion.div>

      {/* Dot indicators */}
      <div className="slide__dots">
        {slides.map((_, i) => (
          <span key={i} className={`slide__dot${i === idx ? " slide__dot--active" : ""}`} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TEXT ROLL — per-character alternate roll
   Even chars roll in from BELOW  (y: 120% → 0%)
   Odd  chars roll in from ABOVE  (y:-120% → 0%)
   clipPath clips only vertically so italic glyphs stay full.
   Staggered spring — 40ms per char — classic cascade wave.
   Replays every time section re-enters the viewport.
   ───────────────────────────────────────────────────────────── */
function TextRoll({ text, style, reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });

  const chars = text.split("");

  return (
    <motion.h2
      ref={ref}
      className="works__headline"
      style={style}
      aria-label={text}
    >
      {chars.map((char, i) => {
        const isSpace = char === " ";
        const fromY = i % 2 === 0 ? "120%" : "-120%";

        if (isSpace) {
          return <span key={i} style={{ display: "inline-block", width: "0.3em" }} />;
        }

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              verticalAlign: "bottom",
              /* generous horizontal bleed for italic, tight vertical for roll clip */
              clipPath: "inset(-5% -25% -5% -5%)",
            }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              animate={
                inView && !reduced
                  ? { y: "0%", opacity: 1 }
                  : { y: fromY, opacity: 0 }
              }
              transition={{
                type: "spring",
                damping: 75,
                stiffness: 200,
                mass: 1,
                delay: reduced ? 0 : i * 0.04,
              }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </motion.h2>
  );
}
