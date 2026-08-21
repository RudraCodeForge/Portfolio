import Styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={Styles.footer}>
      <div className={Styles.footerInner}>
        <div className={Styles.footerTop}>
          <div>
            <p className={Styles.footerKicker}>BUILT WITH INTENTION</p>
            <Link className={Styles.brand} to="/">
              princedaksh<span>.dev</span>
            </Link>
            <p className={Styles.footerCopy}>
              Full-stack developer crafting clear, useful digital experiences.
            </p>
          </div>
          <nav className={Styles.footerNav} aria-label="Footer navigation">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className={Styles.footerSocials}>
            <a
              href="https://github.com/RudraCodeForge"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>
        <div className={Styles.footerBottom}>
          <span>© {year} Prince Daksh</span>
          <span>Designed &amp; built on the open web</span>
          <a href="#" aria-label="Back to top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
