import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TextRoll({ text, segments, style, className, reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });

  // Support either a flat string or an array of styled segments
  const parts = segments || [{ text: text || "", className: "" }];
  
  const charArray = [];
  parts.forEach(part => {
    part.text.split("").forEach(char => {
      charArray.push({ char, className: part.className });
    });
  });

  return (
    <motion.h2
      ref={ref}
      className={className}
      style={style}
      aria-label={text || parts.map(p => p.text).join("")}
    >
      {charArray.map((item, i) => {
        const { char, className: segmentClass } = item;
        const isSpace = char === " ";
        const fromY = i % 2 === 0 ? "150%" : "-150%";

        if (isSpace) {
          return <span key={i} style={{ display: "inline-block", width: "0.3em" }} />;
        }

        return (
          <span
            key={i}
            className={segmentClass}
            style={{
              display: "inline-block",
              verticalAlign: "bottom",
              clipPath: "inset(-30% -100% -30% -100%)",
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
