import Styles from "../../styles/RobotAssistant.module.css";
import {
  CATEGORY_QUESTIONS,
  QUESTION_CATEGORIES,
} from "../../data/RobotAssistant/questions";

const QuestionList = ({ category, onBack, onSelect }) => {
  const questions = CATEGORY_QUESTIONS[category] || [];

  const categoryData = QUESTION_CATEGORIES.find((item) => item.id === category);

  return (
    <div className={Styles.questionArea}>
      <div className={Styles.questionHeader}>
        <button type="button" className={Styles.backButton} onClick={onBack}>
          ←
        </button>

        <span>
          {categoryData?.icon} {categoryData?.label}
        </span>
      </div>

      <div className={Styles.questionList}>
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            className={Styles.questionButton}
            onClick={() => onSelect(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
