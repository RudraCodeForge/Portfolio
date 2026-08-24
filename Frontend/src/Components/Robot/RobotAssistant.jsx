import { useCallback, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import RobotScene from "./RobotScene";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import QuestionCategories from "./QuestionCategories";
import QuestionList from "./QuestionList";
import ChatInput from "./ChatInput";
import ConversationChoice from "./ConversationChoice";

import Styles from "../../styles/RobotAssistant.module.css";

import { getPortfolioResponse } from "../../utils/robotAssistant/response";
import { getRobotReaction } from "../../utils/robotAssistant/reaction";

const RobotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [robotAction, setRobotAction] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showConversationChoice, setShowConversationChoice] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Hey! 👋 I'm Prince Daksh's portfolio assistant. What would you like to know?",
    },
  ]);

  const messagesEndRef = useRef(null);

  const Header = useSelector((state) => state.HeaderData?.data || {});

  const Github = useSelector((state) => state.GithubData?.data || {});

  const Skills = useSelector((state) => state.SkillData?.data || []);

  const Projects = useSelector((state) => state.ProjectData?.data || []);

  const Experience = useSelector((state) => state.ExperienceData?.data || []);

  const Education = useSelector((state) => state.EducationData?.data || []);

  const stats = useSelector((state) => state.StatsData?.data || []);

  const portfolio = useMemo(
    () => ({
      Header,
      Github,
      Skills,
      Projects,
      Experience,
      Education,
      stats,
    }),
    [Header, Github, Skills, Projects, Experience, Education, stats],
  );

  const hasConversation = messages.some((message) => message.sender === "user");

  const handleRobotClick = useCallback(() => {
    setIsOpen(true);

    if (hasConversation) {
      setShowConversationChoice(true);
    }
  }, [hasConversation]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSelectedCategory(null);
    setShowConversationChoice(false);
  }, []);

  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  const handleAsk = useCallback(
    (question) => {
      if (!question.trim() || isTyping) return;

      const answer = getPortfolioResponse(question, portfolio);

      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          sender: "user",
          text: question,
        },
      ]);

      setInput("");
      setIsTyping(true);

      setTimeout(() => {
        setMessages((previous) => [
          ...previous,
          {
            id: crypto.randomUUID(),
            sender: "bot",
            text: answer,
          },
        ]);

        setIsTyping(false);
        setRobotAction(getRobotReaction(question));

        setTimeout(() => {
          setRobotAction(null);
        }, 1500);
      }, 700);
    },
    [isTyping, portfolio],
  );

  const handleClearChat = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Hey! 👋 I'm Prince Daksh's portfolio assistant. What would you like to know?",
      },
    ]);

    setSelectedCategory(null);
    setShowConversationChoice(false);
    setInput("");
    setIsTyping(false);
  }, []);

  return (
    <>
      <div
        className={`${Styles.robotButton} ${isOpen ? Styles.robotOpen : ""}`}
      >
        <RobotScene
          onRobotClick={handleRobotClick}
          isAssistantOpen={isOpen}
          robotAction={robotAction}
        />
      </div>

      {isOpen && (
        <section className={Styles.chatWindow}>
          {showConversationChoice ? (
            <ConversationChoice
              onContinue={() => setShowConversationChoice(false)}
              onClear={handleClearChat}
              onClose={handleClose}
            />
          ) : (
            <>
              <ChatHeader onClose={handleClose} />

              <ChatMessages
                messages={messages}
                isTyping={isTyping}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                onQuestionSelect={handleAsk}
                onBack={handleBack}
                messagesEndRef={messagesEndRef}
              />

              <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={handleAsk}
                disabled={isTyping}
              />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default RobotAssistant;
