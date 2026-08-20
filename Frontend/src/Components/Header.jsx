import Styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMdb,
  faNode,
  faNodeJs,
  faReact,
  faTypescript,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const stats = [
  { value: "24+", label: "Projects shipped" },
  { value: "18", label: "Technologies" },
  { value: "4+", label: "Years of craft" },
  { value: "1.2k", label: "Github contributions" },
];

const Header = () => {
  return (
    <header className={Styles.headerShell}>
      <div className={Styles.headerInner}>
        <div className={Styles.statusRow}>
          <span className={Styles.statusDot} />
          <span>AVAILABLE FOR SELECT PROJECTS</span>
          <span className={Styles.statusSlash}>/</span>
          <span>{new Date().getFullYear()}</span>
        </div>

        <div className={Styles.heroGrid}>
          <div className={Styles.textBlock}>
            <h1>
              Digital
              <br />
              products
              <br />
              <span className={Styles.lineBreak}>with </span> <br />
              <span className={Styles.gradientText}>purpose.</span>
            </h1>

            <p>
              I turn complex product ideas into fast, thoughtful digital
              experiences. Focused on clean architecture, meaningful interfaces,
              and software that scales with your ambition.
            </p>

            <div className={Styles.actionRow}>
              <button type="button" className={Styles.primaryBtn}>
                View projects <span aria-hidden="true">↗</span>
              </button>
              <button type="button" className={Styles.secondaryBtn}>
                Contact me <span aria-hidden="true">›</span>
              </button>
              <button type="button" className={Styles.ghostBtn}>
                <span className={Styles.downloadIcon}>↓</span> Resume
              </button>
            </div>

            <div className={Styles.socialRow}>
              <span>FIND ME ON</span>
              <div className={Styles.iconGroup}>
                <a
                  className={Styles.iconCircle}
                  href="https://github.com/RudraCodeForge"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  className={Styles.iconCircle}
                  href="mailto:jitandradaksh533@icloud.com"
                  aria-label="Email"
                  title="Email"
                >
                  ✉
                </a>
                <a
                  className={Styles.iconCircle}
                  href="https://www.linkedin.com/in/prince-jaiveer-8285a43a1/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  className={Styles.iconCircle}
                  href="https://www.instagram.com/princedaksh52?igsi=MTI5c240NDE3azRocg%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>

          <div className={Styles.previewCard}>
            <div className={Styles.previewTopbar}>
              <div className={Styles.windowDots}>
                <span className={Styles.redDot} />
                <span className={Styles.yellowDot} />
                <span className={Styles.greenDot} />
              </div>
              <span className={Styles.fileName}>developer.tsx</span>
            </div>

            <div className={Styles.codeArea}>
              <div className={Styles.codeLine}>
                <span className={Styles.lineNumber}>1</span>
                <span className={Styles.lineText}>const developer = {"{"}</span>

                <span className={Styles.lineNumber}>2</span>
                <span className={Styles.lineText}>
                  {"   "}name: "Prince Daksh",
                </span>

                <span className={Styles.lineNumber}>3</span>
                <span className={Styles.lineText}>
                  {"   "} role: "MERN Developer",
                </span>

                <span className={Styles.lineNumber}>4</span>
                <span className={Styles.lineText}>
                  {"   "} focus: {"["}"
                </span>

                <span className={Styles.lineNumber}>5</span>
                <span className={Styles.lineText}>
                  {"      "} "clean interface",
                </span>

                <span className={Styles.lineNumber}>6</span>
                <span className={Styles.lineText}>
                  {"      "} "scalable systems",
                </span>

                <span className={Styles.lineNumber}>7</span>
                <span className={Styles.lineText}>
                  {"      "} "human outcomes",
                </span>

                <span className={Styles.lineNumber}>8</span>
                <span className={Styles.lineText}>
                  {"   "} {"]"},
                </span>

                <span className={Styles.lineNumber}>9</span>
                <span className={Styles.lineText}>
                  {"   "} available: true,
                </span>

                <span className={Styles.lineNumber}>10</span>
                <span className={Styles.lineText}>{"}"};</span>

                <span className={Styles.lineNumber}>11</span>
                <span className={`${Styles.lineText} ${Styles.commentText}`}>
                  // let's build something great
                </span>

                <span className={Styles.lineNumber}>12</span>
                <span className={Styles.lineText}>
                  export default developer
                  <span className={Styles.BarBlink}>_</span>
                </span>
              </div>
            </div>

            <div className={Styles.previewFooter}>
              <div className={Styles.footerTag}>
                <div className={Styles.Confidance}>
                  <span className={Styles.footerBadge}>●</span>
                  <span>STACK CONFIDENCE</span>
                </div>
                <div className={Styles.ConfidanceIcon}>
                  <FontAwesomeIcon icon={faNodeJs} title="Node.js" />
                  <FontAwesomeIcon icon={faReact} title="React" />
                  <FontAwesomeIcon icon={faNode} title="Node" />
                  <FontAwesomeIcon icon={faTypescript} title="TypeScript" />
                  <FontAwesomeIcon icon={faMdb} title="MongoDB" />
                  <span className={Styles.expressIcon} title="Express">
                    ex
                  </span>
                </div>
              </div>
              <div className={Styles.footerPill}>
                <span className={Styles.pillDot} />
                <span>open to work</span>
              </div>
            </div>
          </div>
        </div>

        <div className={Styles.statsRow}>
          {stats.map((stat) => (
            <div key={stat.label} className={Styles.statBox}>
              <div className={Styles.statValue}>{stat.value}</div>
              <div className={Styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
