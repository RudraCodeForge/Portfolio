import Styles from "../../styles/RobotAssistant.module.css";
import QuestionCategories from "./QuestionCategories";
import QuestionList from "./QuestionList";

const ChatMessages = ({
  messages,
  isTyping,
  selectedCategory,
  onCategorySelect,
  onQuestionSelect,
  onBack,
  messagesEndRef,
}) => {
  return (
    <div className={Styles.chatMessages}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={
            message.sender === "user" ? Styles.userMessage : Styles.botMessage
          }
        >
          {message.text.split("\n").map((line, index) => (
            <span key={index}>
              {line}

              {index < message.text.split("\n").length - 1 && <br />}
            </span>
          ))}
        </div>
      ))}

      {isTyping && (
        <div className={Styles.botMessage}>
          <span className={Styles.typingIndicator}>
            <span />
            <span />
            <span />
          </span>
        </div>
      )}

      {!isTyping && !selectedCategory && (
        <QuestionCategories onSelect={onCategorySelect} />
      )}

      {!isTyping && selectedCategory && (
        <QuestionList
          category={selectedCategory}
          onBack={onBack}
          onSelect={onQuestionSelect}
        />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
