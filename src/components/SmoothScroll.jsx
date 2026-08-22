import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion();

  // Disable smooth scrolling for accessibility if requested
  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.08,             // Momentum scroll amount
        duration: 1.2,          // Smoothness duration
        smoothWheel: true,      // Smooth scrolling on mouse wheel
        syncTouch: false,       // Do NOT force smooth scroll on touch devices (keep native feel)
      }}
    >
      {children}
    </ReactLenis>
  );
}
