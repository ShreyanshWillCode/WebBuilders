import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./Footer.css";

const nav = [
  { title: "EXPLORE", links: [{ label: "Work", href: "#work" }, { label: "Services", href: "#services" }, { label: "Process", href: "#process" }] },
  { title: "COMPANY", links: [{ label: "About", href: "#about" }, { label: "Contact", href: "#contact" }, { label: "Blog", href: "#" }] },
  { title: "CONNECT", links: [{ label: "hello@webbuilders.dev", href: "mailto:hello@webbuilders.dev" }, { label: "LinkedIn", href: "#" }, { label: "Instagram", href: "#" }] },
];

const ease = [0.25, 0.1, 0.25, 1];

export default function Footer() {
  const reduced = useReducedMotion();

  return (
    <motion.footer
      className="footer"
      role="contentinfo"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">WEBBUILDERS.DEV</span>
          <span className="footer__sub">Web &amp; Android Development Agency</span>
          <span className="footer__tagline">BUILD WITH CLARITY. GROW WITH CONFIDENCE.</span>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          {nav.map((col) => (
            <div className="footer__col" key={col.title}>
              <h3 className="footer__col-title">{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="footer__link">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="footer__bottom">
        <span>&copy; 2026 WebBuilders.dev</span>
        <span>All rights reserved</span>
      </div>
    </motion.footer>
  );
}
