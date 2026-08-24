import Styles from "../../styles/RobotAssistant.module.css";
import { QUESTION_CATEGORIES } from "../../data/RobotAssistant/questions";

const QuestionCategories = ({ onSelect }) => {
  return (
    <div className={Styles.questionArea}>
      <p className={Styles.questionTitle}>What would you like to know?</p>

      <div className={Styles.categoryList}>
        {QUESTION_CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            className={Styles.categoryButton}
            onClick={() => onSelect(category.id)}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCategories;
