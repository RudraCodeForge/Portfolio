import { useCallback, useEffect, useRef, useState } from "react";

import RobotScene from "./RobotScene";

import Styles from "../../styles/RobotAssistant.module.css";

const INITIAL_MESSAGE = {
  id: "welcome-message",
  sender: "bot",
  text: "Hello! I'm Prince Daksh's personal assistant. How can I help you?",
};

// ==========================================
// QUESTION → ANSWER
// ==========================================

const getDemoResponse = (question) => {
  const text = question.toLowerCase().trim();

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey") ||
    text.includes("namaste")
  ) {
    return "Hey! 👋 I'm Prince Daksh's portfolio assistant. What would you like to know about him?";
  }

  if (
    text.includes("who are you") ||
    text.includes("what are you") ||
    text.includes("yourself")
  ) {
    return "I'm Prince Daksh's personal portfolio assistant 🤖. I can help you explore his skills, projects, experience, and development journey.";
  }

  if (
    text.includes("who is daksh") ||
    text.includes("about daksh") ||
    text.includes("about prince")
  ) {
    return "Prince Daksh is a software developer focused on building modern full-stack applications, scalable backend systems, and thoughtful user experiences.";
  }

  if (
    text.includes("skill") ||
    text.includes("technology") ||
    text.includes("technologies") ||
    text.includes("tech stack") ||
    text.includes("stack")
  ) {
    return "Prince Daksh primarily works with the MERN stack — MongoDB, Express.js, React, and Node.js. He also works with TypeScript and other modern development technologies.";
  }

  if (text.includes("mern") || text.includes("mern stack")) {
    return "MERN stands for MongoDB, Express.js, React, and Node.js. It's one of the primary stacks Prince Daksh uses for full-stack application development.";
  }

  if (
    text.includes("react") ||
    text.includes("frontend") ||
    text.includes("front end")
  ) {
    return "React is one of Prince Daksh's main frontend technologies. He uses it to build responsive, interactive interfaces with reusable component architecture.";
  }

  if (
    text.includes("backend") ||
    text.includes("back end") ||
    text.includes("node") ||
    text.includes("express")
  ) {
    return "For backend development, Prince Daksh mainly works with Node.js and Express.js, focusing on APIs, authentication, business logic, and scalable application architecture.";
  }

  if (
    text.includes("mongodb") ||
    text.includes("database") ||
    text.includes("mongo")
  ) {
    return "MongoDB is one of the primary databases Prince Daksh uses for full-stack applications, especially with the MERN stack.";
  }

  if (
    text.includes("project") ||
    text.includes("projects") ||
    text.includes("portfolio")
  ) {
    return "You can explore Prince Daksh's projects through the Projects section of this portfolio. Each project demonstrates different aspects of his development skills.";
  }

  if (
    text.includes("experience") ||
    text.includes("work") ||
    text.includes("developer")
  ) {
    return "Prince Daksh focuses on practical software development, particularly full-stack applications, backend architecture, APIs, databases, and modern React interfaces.";
  }

  if (
    text.includes("github") ||
    text.includes("contribution") ||
    text.includes("repository") ||
    text.includes("repositories")
  ) {
    return "You can explore Prince Daksh's GitHub profile to see his repositories, projects, and contribution activity.";
  }

  if (text.includes("resume") || text.includes("cv")) {
    return "You can download Prince Daksh's resume using the Resume button available on the portfolio.";
  }

  if (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("hire") ||
    text.includes("reach")
  ) {
    return "You can contact Prince Daksh using the Contact Me button or the contact information available throughout the portfolio.";
  }

  if (
    text.includes("ai") ||
    text.includes("artificial intelligence") ||
    text.includes("chatbot")
  ) {
    return "AI integration is one of the areas being explored in this portfolio. This assistant is currently running with a demo question-answer system, and a real AI backend can be connected later.";
  }

  if (text.includes("typescript") || text.includes("type script")) {
    return "TypeScript is also part of Prince Daksh's technology stack and can be used to make JavaScript applications more predictable and maintainable.";
  }

  if (text.includes("help") || text.includes("what can you do")) {
    return "I can currently answer questions about Prince Daksh, his skills, MERN stack, React, backend development, projects, GitHub, resume, contact information, and AI integration.";
  }

  if (text.includes("thank") || text.includes("thanks")) {
    return "You're welcome! 🤖 Happy to help.";
  }

  if (text.includes("bye") || text.includes("goodbye")) {
    return "See you around! 👋 Feel free to explore the rest of the portfolio.";
  }

  return "Hmm, I don't have an answer for that yet 🤖. Try asking me about Prince Daksh's skills, projects, MERN stack, experience, GitHub, resume, or contact information.";
};

// ==========================================
// ROBOT REACTION
// ==========================================

const getRobotReaction = (question) => {
  const text = question.toLowerCase().trim();

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey") ||
    text.includes("namaste")
  ) {
    return "wave";
  }

  if (
    text.includes("thank") ||
    text.includes("thanks") ||
    text.includes("thank you")
  ) {
    return "jump";
  }

  if (text.includes("wrong") || text.includes("no")) {
    return "no";
  }

  if (text.includes("yes") || text.includes("correct")) {
    return "yes";
  }

  return "thumbsUp";
};

// ==========================================
// COMPONENT
// ==========================================

const RobotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([INITIAL_MESSAGE]);

  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const [robotAction, setRobotAction] = useState(null);

  // New state
  const [showConversationChoice, setShowConversationChoice] = useState(false);

  const messagesEndRef = useRef(null);

  const responseTimersRef = useRef(new Set());

  const reactionTimersRef = useRef(new Set());

  // ==========================================
  // CHECK IF REAL CONVERSATION EXISTS
  // ==========================================

  const hasConversation = messages.some((message) => message.sender === "user");

  // ==========================================
  // SCROLL CHAT
  // ==========================================

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  useEffect(() => {
    if (isOpen && !showConversationChoice) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, showConversationChoice, scrollToBottom]);

  // ==========================================
  // CLEANUP
  // ==========================================

  useEffect(() => {
    return () => {
      responseTimersRef.current.forEach((timer) => {
        clearTimeout(timer);
      });

      reactionTimersRef.current.forEach((timer) => {
        clearTimeout(timer);
      });

      responseTimersRef.current.clear();
      reactionTimersRef.current.clear();
    };
  }, []);

  // ==========================================
  // CLEAR PENDING TIMERS
  // ==========================================

  const clearPendingTimers = useCallback(() => {
    responseTimersRef.current.forEach((timer) => {
      clearTimeout(timer);
    });

    reactionTimersRef.current.forEach((timer) => {
      clearTimeout(timer);
    });

    responseTimersRef.current.clear();
    reactionTimersRef.current.clear();

    setIsTyping(false);
    setRobotAction(null);
  }, []);

  // ==========================================
  // ROBOT CLICK
  // ==========================================

  const handleRobotClick = useCallback(() => {
    setIsOpen(true);

    // If conversation exists,
    // ask whether to continue or clear.
    if (hasConversation) {
      setShowConversationChoice(true);
    } else {
      setShowConversationChoice(false);
    }
  }, [hasConversation]);

  // ==========================================
  // CLOSE CHAT
  // ==========================================

  const handleClose = useCallback(() => {
    setIsOpen(false);

    // IMPORTANT:
    // Do NOT clear messages here.
    // Conversation stays in memory.

    clearPendingTimers();

    setShowConversationChoice(false);
  }, [clearPendingTimers]);

  // ==========================================
  // CONTINUE CONVERSATION
  // ==========================================

  const handleContinueConversation = useCallback(() => {
    setShowConversationChoice(false);

    // Make sure the chat opens normally.
    setIsOpen(true);
  }, []);

  // ==========================================
  // CLEAR CONVERSATION
  // ==========================================

  const handleClearConversation = useCallback(() => {
    clearPendingTimers();

    setMessages([INITIAL_MESSAGE]);

    setInput("");

    setShowConversationChoice(false);

    setIsOpen(true);
  }, [clearPendingTimers]);

  // ==========================================
  // ROBOT REACTION
  // ==========================================

  const triggerRobotReaction = useCallback((action) => {
    setRobotAction(action);

    reactionTimersRef.current.forEach((timer) => {
      clearTimeout(timer);
    });

    reactionTimersRef.current.clear();

    const durationMap = {
      wave: 1900,
      thumbsUp: 1700,
      yes: 1800,
      no: 1800,
      jump: 900,
    };

    const duration = durationMap[action] ?? 1700;

    const timer = setTimeout(() => {
      setRobotAction(null);

      reactionTimersRef.current.delete(timer);
    }, duration);

    reactionTimersRef.current.add(timer);
  }, []);

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const question = input.trim();

      if (!question || isTyping) {
        return;
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          sender: "user",
          text: question,
        },
      ]);

      setInput("");

      setIsTyping(true);

      const answer = getDemoResponse(question);

      const reaction = getRobotReaction(question);

      const timer = setTimeout(() => {
        setMessages((previousMessages) => [
          ...previousMessages,
          {
            id: crypto.randomUUID(),
            sender: "bot",
            text: answer,
          },
        ]);

        setIsTyping(false);

        // Robot reacts after answer
        triggerRobotReaction(reaction);

        responseTimersRef.current.delete(timer);
      }, 700);

      responseTimersRef.current.add(timer);
    },
    [input, isTyping, triggerRobotReaction],
  );

  return (
    <>
      {/* =====================================
          ROBOT
      ===================================== */}

      <div
        className={`${Styles.robotButton} ${isOpen ? Styles.robotOpen : ""}`}
        aria-label="Open Daksh AI Assistant"
      >
        <RobotScene
          onRobotClick={handleRobotClick}
          isAssistantOpen={isOpen}
          robotAction={robotAction}
        />
      </div>

      {/* =====================================
          CHAT
      ===================================== */}

      {isOpen && (
        <section className={Styles.chatWindow} aria-label="Daksh AI Assistant">
          {/* =================================
              CONTINUE / CLEAR CHOICE
          ================================= */}

          {showConversationChoice ? (
            <div className={Styles.conversationChoice}>
              <div className={Styles.choiceRobotIcon}>🤖</div>

              <h3>Welcome back!</h3>

              <p>
                You have an existing conversation. Would you like to continue
                where you left off?
              </p>

              <div className={Styles.choiceActions}>
                <button
                  type="button"
                  className={Styles.continueButton}
                  onClick={handleContinueConversation}
                >
                  Continue
                </button>

                <button
                  type="button"
                  className={Styles.clearChatButton}
                  onClick={handleClearConversation}
                >
                  Clear Chat
                </button>
              </div>

              <button
                type="button"
                className={Styles.choiceCloseButton}
                onClick={handleClose}
              >
                ×
              </button>
            </div>
          ) : (
            <>
              {/* ===============================
                  HEADER
              =============================== */}

              <header className={Styles.chatHeader}>
                <div>
                  <strong>Daksh AI Assistant</strong>

                  <span>Portfolio Assistant</span>
                </div>

                <button
                  type="button"
                  className={Styles.closeButton}
                  onClick={handleClose}
                  aria-label="Close assistant"
                >
                  ×
                </button>
              </header>

              {/* ===============================
                  MESSAGES
              =============================== */}

              <div
                className={Styles.chatMessages}
                aria-live="polite"
                aria-label="Conversation"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.sender === "user"
                        ? Styles.userMessage
                        : Styles.botMessage
                    }
                  >
                    {message.text}
                  </div>
                ))}

                {/* Typing */}

                {isTyping && (
                  <div className={Styles.botMessage}>
                    <span className={Styles.typingIndicator}>
                      <span />
                      <span />
                      <span />
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ===============================
                  INPUT
              =============================== */}

              <form className={Styles.chatInputArea} onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask me anything..."
                  aria-label="Ask Daksh AI Assistant"
                  autoComplete="off"
                  disabled={isTyping}
                />

                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!input.trim() || isTyping}
                >
                  ➤
                </button>
              </form>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default RobotAssistant;
