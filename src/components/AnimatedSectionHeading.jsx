import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function AnimatedSectionHeading({ children, className = "", direction }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  if (reduced || typeof children !== "string") {
    return <span className={`section__label ${className}`.trim()}>{children}</span>;
  }

  const chars = children.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // left to right typing speed
      }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 16, rotateX: 60 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.span
      ref={ref}
      className={`section__label ${className}`.trim()}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: "inline-flex", flexWrap: "wrap", perspective: "400px" }}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ 
            display: "inline-block", 
            whiteSpace: char === " " ? "pre" : "normal",
            willChange: "transform, opacity"
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
