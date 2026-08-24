import Styles from "../../styles/RobotAssistant.module.css";

const ChatHeader = ({ onClose }) => {
  return (
    <header className={Styles.chatHeader}>
      <div>
        <strong>Daksh AI Assistant</strong>
        <span>Portfolio Assistant</span>
      </div>

      <button
        type="button"
        className={Styles.closeButton}
        onClick={onClose}
        aria-label="Close assistant"
      >
        ×
      </button>
    </header>
  );
};

export default ChatHeader;
