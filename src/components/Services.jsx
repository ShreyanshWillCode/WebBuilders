import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion";
import "./Services.css";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

const services = [
  { num: "01", title: "WEB DEVELOPMENT",      text: "Business sites, dashboards, portals and web apps.",       cls: "service__card--light",  entryY: 20 },
  { num: "02", title: "ANDROID DEVELOPMENT",  text: "Custom Android applications around your workflow.",       cls: "service__card--teal",   entryY: 35 },
  { num: "03", title: "UI / UX DESIGN",       text: "Interfaces built for clarity, usability and conversion.", cls: "service__card--yellow", entryY: 15 },
  { num: "04", title: "CUSTOM SOFTWARE",      text: "Internal tools and systems that remove manual work.",     cls: "service__card--orange", entryY: 35 },
  { num: "05", title: "MAINTENANCE + GROWTH", text: "Updates, optimization and long-term product support.",    cls: "service__card--blush",  entryY: 20 },
];

const tags = ["Web", "Mobile", "Cloud", "Design", "Custom", "Digital"];
const ease = [0.25, 0.1, 0.25, 1];

export default function Services() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className="section services" id="services" ref={sectionRef}>
      <div className="section__inner">
        <AnimatedSectionHeading direction="left">
          03 / SERVICES
        </AnimatedSectionHeading>

        <div className="services__tags">
          {tags.map((t, i) => (
            <motion.span
              className="tag"
              key={t}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05, ease }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        <motion.h2
          className="section__headline section__headline--full"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="h-filled">|YOUR BUSINESS. </span>
          <span className="h-outline">YOUR RULES. </span>
          <span className="h-filled">OUR BUILD.</span>
        </motion.h2>

        <div className="services__grid">
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} reduced={reduced} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, reduced, isMobile }) {
  return (
    <motion.article
      className={`service__card ${service.cls}`}
      initial={reduced ? false : { opacity: 0, y: service.entryY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={
        reduced || isMobile
          ? {}
          : {
              y: -6,
              rotate: index % 2 === 0 ? 0.5 : -0.5,
              boxShadow: "7px 7px 0 #1a1a1a",
              transition: { duration: 0.2 },
            }
      }
    >
      <span className="service__num">{service.num}</span>
      <h3 className="service__title">{service.title}</h3>
      <p className="service__text">{service.text}</p>
      <span className="service__arrow">&#8599;</span>
    </motion.article>
  );
}
