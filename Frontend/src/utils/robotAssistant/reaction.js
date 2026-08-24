import { hasAny, normalizeText } from "./portfolio";

export const getRobotReaction = (question) => {
  const text = normalizeText(question);

  if (hasAny(text, ["hello", "hi", "hey", "namaste"])) {
    return "wave";
  }

  if (hasAny(text, ["thank", "thanks"])) {
    return "jump";
  }

  if (hasAny(text, ["wrong", "no"])) {
    return "no";
  }

  if (hasAny(text, ["yes", "correct"])) {
    return "yes";
  }

  return "thumbsUp";
};
