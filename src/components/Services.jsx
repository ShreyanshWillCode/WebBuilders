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
    <motion.section 
      className="section services" 
      id="services" 
      ref={sectionRef} 
      initial={reduced ? false : { opacity: 0.001 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <div className="section__inner">
        <AnimatedSectionHeading direction="left">
          03 / SERVICES
        </AnimatedSectionHeading>

        <div className="services__tags">
          {tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <h2 className="section__headline section__headline--full">
          <span className="h-filled">|YOUR BUSINESS. </span>
          <span className="h-outline">YOUR RULES. </span>
          <span className="h-filled">OUR BUILD.</span>
        </h2>

        <div className="services__grid">
          {services.map((s, i) => (
            <ServiceCard 
              key={s.num} 
              service={s} 
              index={i} 
              reduced={reduced} 
              isMobile={isMobile} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ServiceCard({ service, index, reduced, isMobile, scrollYProgress }) {
  // Create a continuous wave parallax based on the index and scroll position
  const waveAmplitude = 30; // px
  const offset = index % 2 === 0 ? waveAmplitude : -waveAmplitude;
  const yParallax = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.article
      className={`service__card ${service.cls}`}
      style={{ y: reduced || isMobile ? 0 : yParallax }}
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
