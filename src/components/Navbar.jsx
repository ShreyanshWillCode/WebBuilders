import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMenu();
  };

  const links = [
    { label: "WORK", href: "#work" },
    { label: "SERVICES", href: "#services" },
    { label: "PROCESS", href: "#process" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}`} id="navbar">
      <div className="nav__inner">
        <div className="nav__brand">
          <span className="nav__logo">WEBBUILDERS.DEV</span>
          <span className="nav__sub">WEB &amp; ANDROID DEVELOPMENT AGENCY</span>
        </div>

        <ul className="nav__links">
          {links.map((l) => (
            <li key={l.label}>
              <a className="nav__link" href={l.href} onClick={(e) => scrollTo(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn--nav" onClick={(e) => scrollTo(e, "#contact")}>
          START A PROJECT &rarr;
        </a>

        <button
          className="nav__hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </button>
      </div>

      {menuOpen && (
        <div className="nav__mobile">
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a className="nav__link" href={l.href} onClick={(e) => scrollTo(e, l.href)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn--nav" onClick={(e) => scrollTo(e, "#contact")}>
            START A PROJECT &rarr;
          </a>
        </div>
      )}
    </nav>
  );
}
