import Styles from "../styles/Education.module.css";
import { useSelector } from "react-redux";
import EducationCard from "../Components/EducationCard";

const EMPTY_ARRAY = [];

const Education = () => {
  const EducationData = useSelector(
    (state) => state.EducationData?.data ?? EMPTY_ARRAY,
  );

  return (
    <section id="education" className={Styles.educationSection}>
      <div className={Styles.educationGrid}>
        <div className={Styles.introColumn}>
          <div className={Styles.sectionLabel}>
            <span>05</span>
            <span className={Styles.labelLine} />
            <span>FOUNDATIONS</span>
          </div>

          <h2 className={Styles.heading}>
            Always a student
            <span>of the craft.</span>
          </h2>
        </div>

        <div className={Styles.educationList}>
          {EducationData.map((education) => (
            <EducationCard education={education} key={education._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
