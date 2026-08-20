import Styles from "../styles/About.module.css";
import profileImage from "../assets/self.jpeg";

const About = () => {
  return (
    <section id="about" className={Styles.aboutSection}>
      <div className={Styles.aboutGrid}>
        <div className={Styles.introColumn}>
          <div className={Styles.sectionLabel}>
            <span>01</span>
            <span className={Styles.labelLine} />
            <span>ABOUT ME</span>
          </div>

          <h2 className={Styles.heading}>
            The person
            <span>behind the code.</span>
          </h2>

          <div className={Styles.profileTerminal}>
            <img
              className={Styles.profileImage}
              src={profileImage}
              alt="Prince Daksh"
            />
            <span className={Styles.terminalPath}>/profile/about_me</span>
            <div className={Styles.initials}>PD</div>
            <p>
              curious by nature.
              <br />
              intentionally by design.
            </p>
          </div>
        </div>

        <div className={Styles.copyColumn}>
          <p className={Styles.leadCopy}>
            I&apos;m a developer who believes the best digital products sit at
            the intersection of <span>clarity, craft, and curiosity.</span>
          </p>

          <div className={Styles.copyGrid}>
            <p>
              <span className={Styles.Points}>01 — Building with purpose</span>{" "}
              I’m a developer who enjoys turning complex ideas into simple,
              thoughtful digital experiences.
            </p>
            <p>
              <span className={Styles.Points}>02 — Full-stack mindset</span> I
              work across the stack, from crafting clean interfaces to building
              reliable backend systems that scale with the product.
            </p>

            <p>
              <span className={Styles.Points}>03 — Details matter</span> I care
              about clean code, intuitive experiences, and the small details
              that make a product feel polished and effortless.
            </p>

            <p>
              <span className={Styles.Points}>04 — Always exploring</span> I’m
              currently diving deeper into distributed systems, product
              strategy, and the intersection of technology and creativity.
            </p>
          </div>

          <div className={Styles.learningNote}>
            <span aria-hidden="true">✣</span>
            <span>
              Currently learning: distributed systems &amp; product strategy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
