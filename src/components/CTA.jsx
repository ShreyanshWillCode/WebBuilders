import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./CTA.css";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

const ease = [0.25, 0.1, 0.25, 1];

export default function CTA() {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "start 20%"],
  });

  /* CTA panel scales in from 0.97 → 1 on approach */
  const panelScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.97, 1]);
  const panelOp    = useTransform(scrollYProgress, [0, 0.4], reduced ? [1, 1] : [0, 1]);

  return (
    <motion.section
      className="cta"
      id="contact"
      aria-labelledby="cta-heading"
      ref={sectionRef}
      style={{ scale: panelScale, opacity: panelOp }}
    >
      <div className="cta__inner">
        <div className="cta__left">
          <AnimatedSectionHeading direction="left" className="cta__label">
            07 / READY WHEN YOU ARE
          </AnimatedSectionHeading>

          <motion.h2
            className="cta__headline"
            id="cta-heading"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.05, ease }}
          >
            HAVE AN IDEA?<br />LET&apos;S BUILD IT.
          </motion.h2>

          <motion.p
            className="cta__body"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.2, ease }}
          >
            Bring the business problem. We&apos;ll help turn it into a clear, practical digital product.
          </motion.p>
        </div>

        <div className="cta__right">
          <motion.a
            href="mailto:hello@webbuilders.dev"
            className="btn btn--cta"
            initial={reduced ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.3, ease }}
            whileHover={reduced ? {} : { scale: 1.02, transition: { duration: 0.15 } }}
            whileTap={reduced ? {} : { scale: 0.98 }}
          >
            START A PROJECT &rarr;
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
