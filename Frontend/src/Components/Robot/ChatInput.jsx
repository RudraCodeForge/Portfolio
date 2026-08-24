import Styles from "../../styles/RobotAssistant.module.css";

const ChatInput = ({ value, onChange, onSubmit, disabled }) => {
  return (
    <form
      className={Styles.chatInputArea}
      onSubmit={(event) => {
        event.preventDefault();

        if (!value.trim() || disabled) return;

        onSubmit(value.trim());
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask me anything..."
        autoComplete="off"
        disabled={disabled}
      />

      <button
        type="submit"
        disabled={!value.trim() || disabled}
        aria-label="Send message"
      >
        ➤
      </button>
    </form>
  );
};

export default ChatInput;
