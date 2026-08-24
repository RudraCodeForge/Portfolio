import Styles from "../../styles/RobotAssistant.module.css";

const ConversationChoice = ({ onContinue, onClear, onClose }) => {
  return (
    <div className={Styles.conversationChoice}>
      <div className={Styles.choiceRobotIcon}>🤖</div>

      <h3>Welcome back!</h3>

      <p>
        You have an existing conversation. Would you like to continue where you
        left off?
      </p>

      <div className={Styles.choiceActions}>
        <button
          type="button"
          className={Styles.continueButton}
          onClick={onContinue}
        >
          Continue
        </button>

        <button
          type="button"
          className={Styles.clearChatButton}
          onClick={onClear}
        >
          Clear Chat
        </button>
      </div>

      <button
        type="button"
        className={Styles.choiceCloseButton}
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};

export default ConversationChoice;
