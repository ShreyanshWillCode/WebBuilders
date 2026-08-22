import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion";
import "./WhyUs.css";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

const cards = [
  { num: "01", title: "CUSTOM BY DEFAULT", text: "Your workflows shape the product — not the other way around.", cls: "why__card--light", depthY: -20 },
  { num: "02", title: "VISIBLE ALL THE WAY", text: "Milestones, decisions and progress stay clear from kickoff to launch.", cls: "why__card--orange", depthY: 0 },
  { num: "03", title: "BUILT TO MOVE", text: "A practical foundation that can evolve as your business grows.", cls: "why__card--yellow", depthY: 20 },
];

const ease = [0.25, 0.1, 0.25, 1];

const headlineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const lineV = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function WhyUs() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className="section why" id="about" ref={sectionRef}>
      <div className="section__inner">
        <motion.div
          className="section__header"
        >
          <AnimatedSectionHeading direction="left">01 / WHY US</AnimatedSectionHeading>
          <p className="section__aside">Seven clear steps. No disappearing acts between them.</p>
        </motion.div>

        <motion.h2
          className="section__headline"
          variants={reduced ? {} : headlineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span className="h-filled" variants={reduced ? {} : lineV}>A BUILD </motion.span>
          <motion.span className="h-outline" variants={reduced ? {} : lineV}>PARTNER,</motion.span>
          <br />
          <motion.span className="h-outline" variants={reduced ? {} : lineV}>NOT A </motion.span>
          <motion.span className="h-accent" variants={reduced ? {} : lineV}>VENDOR.</motion.span>
        </motion.h2>

        <div className="why__cards">
          {cards.map((c, i) => (
            <WhyCard key={c.num} card={c} index={i} reduced={reduced} isMobile={isMobile} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCard({ card, index, reduced, isMobile, scrollYProgress }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  /* Depth parallax — each card moves at its own rate */
  const yDepth = useTransform(
    scrollYProgress,
    [0, 1],
    reduced || isMobile ? [0, 0] : [card.depthY, -card.depthY * 0.5]
  );

  return (
    <motion.article
      ref={ref}
      className={`why__card ${card.cls}`}
      style={{ y: yDepth }}
      initial={reduced ? false : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: yDepth.get() } : {}}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease }}
      whileHover={reduced || isMobile ? {} : { y: -6, boxShadow: "7px 7px 0 #1a1a1a", transition: { duration: 0.2 } }}
    >
      <span className="why__num">{card.num}</span>
      <h3 className="why__title">{card.title}</h3>
      <p className="why__text">{card.text}</p>
      <span className="why__arrow">&#8599;</span>
    </motion.article>
  );
}
