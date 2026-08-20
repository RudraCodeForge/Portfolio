import { useState } from "react";
import Styles from "../styles/Navbar.module.css";

const navItems = [
  { id: "01", label: "About" },
  { id: "02", label: "Skills" },
  { id: "03", label: "Projects" },
  { id: "04", label: "Experience" },
  { id: "05", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={Styles.navbar}>
      <div className={Styles.brand}>
        <span className={Styles.logo}>PD</span>
        <span className={Styles.brandText}>princedaksh.dev</span>
      </div>

      <nav
        className={`${Styles.nav} ${menuOpen ? Styles.open : ""}`}
        aria-label="Main navigation"
      >
        {navItems.map(({ id, label }) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className={Styles.navLink}
            onClick={() => setMenuOpen(false)}
          >
            <span>{id}.</span>
            {label}
          </a>
        ))}
      </nav>

      <a href="#contact" className={Styles.ctaButton}>
        Let&apos;s talk <span aria-hidden="true">→</span>
      </a>

      <button
        type="button"
        className={`${Styles.hamburger} ${menuOpen ? Styles.active : ""}`}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
};

export default Navbar;
