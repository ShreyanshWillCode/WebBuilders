import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion";
import "./Works.css";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

const projects = [
  { num: "01", cat: "WEB APP",     name: "HOUSE RENTAL",          desc: "A modern house rental platform to browse, list, and manage rental properties.",                                                   category: "web",      img: "/projects/House.png",                  tech: ["React", "Node.js", "MongoDB", "Express"],         repo: "https://github.com/ShreyanshWillCode/House-Rental-",           live: "https://house-rental-blush.vercel.app/",                          fromY: 60 },
  { num: "02", cat: "WEB APP",     name: "MINI-SEARCH ENGINE",    desc: "A lightweight search engine that crawls, indexes, and ranks pages using TF-IDF and BFS — built from scratch.",                 category: "python",   img: "/projects/gravity search.png",         tech: ["Python", "TF-IDF", "BFS", "Algorithms"],          repo: "https://github.com/ShreyanshWillCode/Mini-Search-Engine",       live: "https://mini-search-engine-eight.vercel.app/",                   fromY: 80 },
  { num: "03", cat: "FREELANCE",   name: "ZAIGRO",               desc: "A freelance digital platform for a local food and grocery delivery service.",                                                    category: "freelance", img: "/projects/Zaigro.png",                 tech: ["React", "Web Delivery"],                          live: "https://zaigro.in/",                                              fromY: 60 },
  { num: "04", cat: "WEB APP",     name: "EWALLET",              desc: "A secure digital wallet for managing real money transactions, featuring a sleek modern interface.",                              category: "web",      img: "/projects/Ewallet.png",                tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"],    repo: "https://github.com/ShreyanshWillCode/User-Wallet-APP",         live: "https://ewallet-eight.vercel.app/",                               fromY: 80 },
  { num: "05", cat: "WEB APP",     name: "MARS ROVER NAV",       desc: "A simulation of the Mars Rover mission with pathfinding algorithms and terrain mapping capabilities.",                          category: "python",   img: "/projects/Mars-Rover.png",             tech: ["JavaScript", "Three.js", "WebGL", "Algorithms"],  repo: "https://github.com/ShreyanshWillCode/Mars_Rover_Navigation_",   live: "https://mars-rover-navigationfrontend.vercel.app/",              fromY: 60 },
  { num: "06", cat: "WEB APP",     name: "NOTIFICATION SERVICE", desc: "A real-time notification service built with WebSocket technology for instant message delivery.",                                category: "web",      img: "/projects/Notification_service.png",   tech: ["WebSocket", "Node.js", "Express", "React"],      repo: "https://github.com/ShreyanshWillCode/Notification_Service",     live: "https://notification-service-theta.vercel.app/",                 fromY: 80 },
  { num: "07", cat: "WEB APP",     name: "SHAABDKOSH",           desc: "A modern dictionary application with word definitions, synonyms, and examples.",                                               category: "web",      img: "/projects/Dictionary.png",             tech: ["React", "API Integration", "CSS"],                repo: "https://github.com/ShreyanshWillCode/Dictionary_APP",           live: "https://shaabdkosh.vercel.app/",                                  fromY: 60 },
  { num: "08", cat: "ML / AI",     name: "SPAM CLASSIFIER",      desc: "Machine learning model to classify emails as spam or not spam using NLP techniques.",                                           category: "python",   img: "/projects/Spam_email.png",             tech: ["Python", "Machine Learning", "NLP"],              repo: "https://github.com/ShreyanshWillCode/Spam_Email_Classifier",    live: "https://spam-email-classifier-five.vercel.app/",                 fromY: 80 },
  { num: "09", cat: "WEB APP",     name: "WEATHER APP",          desc: "Real-time weather application with location-based forecasts.",                                                               category: "web",      img: "/projects/Weather.png",                tech: ["React", "Weather API", "Geolocation"],            repo: "https://github.com/ShreyanshWillCode/Weather_app",              live: "https://weather-app-blot.vercel.app/",                           fromY: 60 },
  { num: "10", cat: "FREELANCE",   name: "DENTAL CLINIC DEMO",   desc: "A modern, responsive dental clinic website demo showcasing services, appointments, and clinic information.",                    category: "freelance", img: "/projects/dental.png",                 tech: ["React", "Responsive Design"],                    live: "https://dental-clinic-sample-swart.vercel.app/",                 fromY: 80 },
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
            <motion.h2
              className="works__headline"
              style={{ y: headY }}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease }}
            >
              |Our Works
            </motion.h2>
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
                  <img src={p.img} alt={p.name} className="project__screenshot" loading="lazy" />
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
