import Styles from "../styles/Experience.module.css";
import { useSelector } from "react-redux";

const Experience = () => {
  const ExperienceData = useSelector(
    (state) => state.ExperienceData?.data || [],
  );

  return (
    <section id="experience" className={Styles.experienceSection}>
      <div className={Styles.experienceGrid}>
        {/* Intro */}
        <div className={Styles.introColumn}>
          <div className={Styles.sectionLabel}>
            <span>04</span>
            <span className={Styles.labelLine} />
            <span>THE JOURNEY</span>
          </div>

          <h2 className={Styles.heading}>
            Built through
            <span>experience.</span>
          </h2>

          <p className={Styles.introCopy}>
            Every project leaves you with better questions.
            <br />
            Here are a few places that shaped mine.
          </p>

          <div className={Styles.shippingNote}>
            <span className={Styles.briefcaseIcon} aria-hidden="true">
              ▣
            </span>

            <span>4+ years of shipping</span>
          </div>
          <div className={Styles.journeyStats}>
            <div className={Styles.journeyStat}>
              <strong>4+</strong>
              <span>
                Years
                <br />
                Building
              </span>
            </div>

            <div className={Styles.journeyStat}>
              <strong>18+</strong>
              <span>
                Technologies
                <br />
                Used
              </span>
            </div>

            <div className={Styles.journeyStat}>
              <strong>24+</strong>
              <span>
                Projects
                <br />
                Shipped
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className={Styles.timeline}>
          {ExperienceData.map((experience) => (
            <article className={Styles.experienceItem} key={experience._id}>
              <span className={Styles.timelineDot} aria-hidden="true" />

              <div className={Styles.itemHeader}>
                <p className={Styles.period}>{experience.Period}</p>

                <p className={Styles.location}>
                  <span aria-hidden="true">⌖</span> {experience.Location}
                </p>
              </div>

              <h3>{experience.Role}</h3>

              <p className={Styles.company}>{experience.Company}</p>

              <p className={Styles.description}>{experience.Description}</p>

              <div className={Styles.skillTags}>
                {experience.Skills?.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
