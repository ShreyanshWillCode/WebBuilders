import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   TEXT SCATTER — characters fly/roll in from all directions
   Uses stable pseudo-random math based on character index
   to ensure they scatter from different areas and tumble in.
   ───────────────────────────────────────────────────────────── */
export default function TextScatter({ segments, style, className, reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });

  const parts = segments || [];
  
  const charArray = [];
  parts.forEach(part => {
    part.text.split("").forEach(char => {
      charArray.push({ char, className: part.className });
    });
  });

    const getTransform = (i) => {
    // Array of base directions to fly from (pushing further out)
    const directions = [
      { x: -200, y: -100, rZ: -180 },
      { x: 200,  y: 100,  rZ: 180 },
      { x: 0,    y: -200, rZ: -270 },
      { x: 0,    y: 200,  rZ: 270 },
      { x: -150, y: 150,  rZ: -90 },
      { x: 150,  y: -150, rZ: 90 },
    ];
    
    const dir = directions[i % directions.length];
    
    // Add organic pseudo-random variance
    const varX = ((i * 13) % 100) - 50;
    const varY = ((i * 17) % 100) - 50;
    const rX = ((i * 31) % 360) - 180; // 3D tumble X
    const rY = ((i * 37) % 360) - 180; // 3D tumble Y
    const rZ = dir.rZ + (((i * 23) % 90) - 45);

    return { 
      x: dir.x + varX, 
      y: dir.y + varY, 
      z: -400, // start deep in 3D space
      rotateX: rX,
      rotateY: rY,
      rotateZ: rZ,
      opacity: 0,
      scale: 0.1
    };
  };

  return (
    <motion.h2
      ref={ref}
      className={className}
      style={{ ...style, perspective: 1200 }} // Enable 3D space
      aria-label={parts.map(p => p.text).join("")}
    >
      {charArray.map((item, i) => {
        const { char, className: segmentClass } = item;
        const isSpace = char === " ";

        if (isSpace) {
          return <span key={i} style={{ display: "inline-block", width: "0.3em" }} />;
        }

        const initial = getTransform(i);

        return (
          <motion.span
            key={i}
            className={segmentClass}
            style={{ display: "inline-block", transformStyle: "preserve-3d" }}
            animate={
              inView && !reduced
                ? { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1, scale: 1 }
                : initial
            }
            transition={{
              type: "spring",
              damping: 12, // Lower damping = more wobbly/floaty settle (wave)
              stiffness: 90,
              mass: 1,
              delay: reduced ? 0 : i * 0.04, // Staggered wave timing
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.h2>
  );
}
