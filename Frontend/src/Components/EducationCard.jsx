import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Styles from "../styles/Education.module.css";

const EducationCard = ({ education }) => (
  <article
    className={Styles.educationCard}
    key={`${education.Period}-${education.Course}`}
  >
    <div className={Styles.educationIcon} aria-hidden="true">
      <FontAwesomeIcon icon={faGraduationCap} />
    </div>
    <div className={Styles.educationContent}>
      <p className={Styles.period}>{education.Period}</p>
      <h3>{education.Course}</h3>
      <p className={Styles.college}>{education.College}</p>
      <p className={Styles.description}>{education.Desc}</p>
    </div>
  </article>
);

export default EducationCard;
