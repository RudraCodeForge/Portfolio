import Styles from "../styles/Skills.module.css";
import { SkillsData } from "../data/skills";
const Skills = () => {
  const iconByType = {
    faCode: "</>",
    faServer: "▤",
    faDatabase: "▱",
  };

  const formatLevel = (level) =>
    level.replace("Advance", "Advanced").replace("Intermedate", "Intermediate");

  return (
    <section id="skills" className={Styles.skillsSection}>
      <div className={Styles.skillsInner}>
        <div className={Styles.skillsHeader}>
          <div>
            <div className={Styles.sectionLabel}>
              <span>02</span>
              <span className={Styles.labelLine} />
              <span>CAPABILITIES</span>
            </div>
            <h2 className={Styles.heading}>
              A stack built for
              <span>real-world impact.</span>
            </h2>
          </div>
          <p className={Styles.headerCopy}>
            Tools are just tools. It&apos;s how they&apos;re combined that makes
            the difference.
          </p>
        </div>

        <div className={Styles.skillsGrid}>
          {SkillsData.map((category) => (
            <article className={Styles.skillCard} key={category.Name}>
              <div className={Styles.categoryIcon} aria-hidden="true">
                {iconByType[category.Icon] ?? "✦"}
              </div>
              <h3>{category.Name}</h3>

              <div className={Styles.skillList}>
                {category.FrontendData.map((skill) => (
                  <div className={Styles.skillItem} key={skill.SkillName}>
                    <div className={Styles.skillMeta}>
                      <span>{skill.SkillName}</span>
                      <span>{formatLevel(skill.Level)}</span>
                    </div>
                    <div className={Styles.skillTrack}>
                      <span
                        style={{ "--skill-level": `${skill.Percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
