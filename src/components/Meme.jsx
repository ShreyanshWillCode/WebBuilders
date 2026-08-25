import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion";
import "./Meme.css";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

const ease = [0.25, 0.1, 0.25, 1];

export default function Meme() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Independent parallax layers */
  const headingY  = useTransform(scrollYProgress, [0, 1], reduced || isMobile ? [0, 0] : [-20, 20]);
  const avatarY   = useTransform(scrollYProgress, [0, 1], reduced || isMobile ? [0, 0] : [30, -30]);
  const bubbleY   = useTransform(scrollYProgress, [0, 1], reduced || isMobile ? [0, 0] : [10, -20]);
  const bubbleX   = useTransform(scrollYProgress, [0, 1], reduced || isMobile ? [0, 0] : [-8, 8]);

  return (
    <section className="meme" aria-label="Fun highlight" ref={sectionRef}>
      <div className="meme__inner">
        <AnimatedSectionHeading direction="left" className="meme__label">
          05 / THE NANA MEME
        </AnimatedSectionHeading>

        <div className="meme__left">

          <motion.h2
            className="meme__headline"
            style={{ y: headingY }}
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease }}
          >
            YOUR NEXT SITE<br />
            COULD <span className="meme__here">LIVE HERE !!</span>
          </motion.h2>
        </div>

        <div className="meme__right">
          <div className="meme__illustration">
            <motion.div
              className="meme__bubble"
              style={{ y: bubbleY, x: bubbleX }}
              initial={reduced ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
            >
              <p className="meme__quote">
                "Bhagwan Ka Diya Hua Sab Kuch Hai&hellip; Bas{" "}
                <strong>WEBSITE Nahi Hai</strong>, Aa Jao Bana Denge."
              </p>
              <span className="meme__attribution">&mdash; Nana Patekar, probably</span>
            </motion.div>

            <motion.div
              className="meme__avatar"
              aria-hidden="true"
              style={{ y: avatarY }}
              initial={reduced ? false : { opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.25, type: "spring", stiffness: 200, damping: 20 }}
            >
              <img src="/nana_patekar_graphic (1).svg" alt="Nana Patekar Graphic" style={{ width: "100%", height: "auto", display: "block" }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
