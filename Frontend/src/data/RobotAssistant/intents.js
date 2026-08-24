import { hasAny, normalizeText } from "../../utils/robotAssistant/portfolio";

export const detectIntent = (question) => {
  const text = normalizeText(question);

  if (hasAny(text, ["hello", "hi", "hey", "namaste"])) {
    return "greeting";
  }

  if (hasAny(text, ["thank", "thanks", "thank you"])) {
    return "thanks";
  }

  if (hasAny(text, ["bye", "goodbye", "see you"])) {
    return "goodbye";
  }

  if (
    hasAny(text, [
      "who are you",
      "what are you",
      "yourself",
      "who is daksh",
      "who is prince",
      "about daksh",
      "about prince",
      "tell me about daksh",
    ])
  ) {
    return "about";
  }

  if (
    hasAny(text, [
      "education",
      "study",
      "studied",
      "degree",
      "college",
      "university",
      "bca",
      "academic",
      "qualification",
    ])
  ) {
    return "education";
  }

  if (
    hasAny(text, [
      "experience",
      "career",
      "work history",
      "previous work",
      "previous experience",
      "current role",
      "currently working",
      "current work",
      "where do you work",
      "where does daksh work",
    ])
  ) {
    return "experience";
  }

  if (
    hasAny(text, [
      "github",
      "git hub",
      "contribution",
      "contributions",
      "repository",
      "repositories",
      "repo",
      "repos",
    ])
  ) {
    return "github";
  }

  if (hasAny(text, ["resume", "cv", "curriculum vitae"])) {
    return "resume";
  }

  if (
    hasAny(text, [
      "contact",
      "email",
      "e mail",
      "hire",
      "hiring",
      "reach you",
      "reach daksh",
      "work with you",
      "work with daksh",
    ])
  ) {
    return "contact";
  }

  if (
    hasAny(text, [
      "how many projects",
      "number of projects",
      "projects shipped",
      "how many have you built",
      "how many did you build",
      "portfolio stats",
      "portfolio statistics",
      "how many technologies",
      "how many tech",
      "how many years",
    ])
  ) {
    return "stats";
  }

  if (
    hasAny(text, [
      "project",
      "projects",
      "built",
      "build",
      "created",
      "developed",
      "application",
      "applications",
      "app",
      "apps",
      "product",
      "products",
      "what have you made",
      "what have you built",
      "what did you build",
      "show me your work",
      "show me his work",
    ])
  ) {
    return "projects";
  }

  if (
    hasAny(text, [
      "skill",
      "skills",
      "technology",
      "technologies",
      "tech stack",
      "stack",
      "frontend",
      "front end",
      "backend",
      "back end",
      "database",
      "databases",
      "what can you code",
      "what can daksh code",
      "what are you good at",
      "what is he good at",
      "what do you know",
      "what does he know",
    ])
  ) {
    return "skills";
  }

  if (hasAny(text, ["stats", "statistics", "numbers"])) {
    return "stats";
  }

  if (hasAny(text, ["help", "what can you do", "what can i ask"])) {
    return "help";
  }

  return null;
};
