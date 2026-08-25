import { hasAny, normalizeText } from "../../utils/robotAssistant/portfolio";

export const detectIntent = (question) => {
  const text = normalizeText(question);

  /* =====================================================
     GREETING
  ===================================================== */

  if (
    hasAny(text, [
      "hello",
      "hi",
      "hey",
      "namaste",
      "good morning",
      "good afternoon",
      "good evening",
    ])
  ) {
    return "greeting";
  }

  /* =====================================================
     THANKS
  ===================================================== */

  if (hasAny(text, ["thank", "thanks", "thank you", "thx", "appreciate it"])) {
    return "thanks";
  }

  /* =====================================================
     GOODBYE
  ===================================================== */

  if (hasAny(text, ["bye", "goodbye", "see you", "see ya", "talk later"])) {
    return "goodbye";
  }

  /* =====================================================
     HELP
  ===================================================== */

  if (
    hasAny(text, [
      "help",
      "what can you do",
      "what can i ask",
      "what can i ask you",
      "what questions can i ask",
    ])
  ) {
    return "help";
  }

  /* =====================================================
     GITHUB
     Specific GitHub questions BEFORE stats
  ===================================================== */

  if (
    hasAny(text, [
      "github",
      "git hub",
      "github username",
      "github profile",
      "github account",
      "github contributions",
      "github contribution",
      "github activity",
      "github repositories",
      "github repository",
      "github repo",
      "github repos",
      "visit github",
      "github link",
    ])
  ) {
    return "github";
  }

  /* =====================================================
     RESUME
  ===================================================== */

  if (
    hasAny(text, [
      "resume",
      "cv",
      "curriculum vitae",
      "download resume",
      "download cv",
      "view resume",
      "see resume",
    ])
  ) {
    return "resume";
  }

  /* =====================================================
     CONTACT
     Specific contact questions BEFORE general work questions
  ===================================================== */

  if (
    hasAny(text, [
      "contact daksh",
      "contact prince",
      "daksh email",
      "prince email",
      "email address",
      "contact email",
      "how can i contact",
      "how can i reach daksh",
      "reach daksh",
      "hire daksh",
      "hire prince",
      "hire him",
      "work with daksh",
      "work with prince",
    ])
  ) {
    return "contact";
  }

  /* =====================================================
     EDUCATION
  ===================================================== */

  if (
    hasAny(text, [
      "where did daksh study",
      "where did he study",
      "where did prince study",
      "which college did daksh attend",
      "which college did he attend",
      "what college did daksh attend",
      "what did daksh study",
      "what did he study",
      "what degree does daksh have",
      "what degree does he have",
      "when did daksh graduate",
      "when did he graduate",
      "when did daksh complete his degree",
      "education",
      "degree",
      "college",
      "university",
      "bca",
      "academic",
      "qualification",
      "graduation",
      "graduated",
    ])
  ) {
    return "education";
  }

  /* =====================================================
     EXPERIENCE
     Specific work/career questions
  ===================================================== */

  if (
    hasAny(text, [
      "what is daksh current role",
      "what is his current role",
      "what is daksh's current role",
      "what is prince's current role",
      "current role",
      "current job",
      "current position",
      "where does daksh work",
      "where does he work",
      "where is daksh working",
      "where is he working",
      "who does daksh work for",
      "current company",
      "previous experience",
      "previous work",
      "past experience",
      "work history",
      "career history",
      "professional experience",
      "how many years of experience",
      "years of experience",
      "years building software",
      "how long has daksh been coding",
    ])
  ) {
    return "experience";
  }

  /* =====================================================
     ABOUT
     Specific identity/profile questions
  ===================================================== */

  if (
    hasAny(text, [
      "who is daksh",
      "who is prince daksh",
      "who is prince",
      "tell me about daksh",
      "tell me about prince",
      "about daksh",
      "about prince",
      "what does daksh do",
      "what does he do",
      "what does prince do",
      "what kind of developer is daksh",
      "what type of developer is daksh",
      "which type of developer is daksh",
      "what kind developer",
      "what is daksh currently focused on",
      "what is he currently focused on",
      "what is daksh focused on",
      "what is his current focus",
      "what is daksh working on",
    ])
  ) {
    return "about";
  }

  /* =====================================================
     PROJECT COUNT / PORTFOLIO STATS
     Specific statistical questions BEFORE projects
  ===================================================== */

  if (
    hasAny(text, [
      "how many projects",
      "number of projects",
      "project count",
      "how many projects has daksh built",
      "how many projects has he built",
      "how many projects did daksh build",
      "how many projects did he build",
      "how many projects has daksh shipped",
      "how many projects has he shipped",
      "projects shipped",
      "how many technologies",
      "number of technologies",
      "technology count",
      "how many tech",
      "how many years coding",
      "how many years has daksh been coding",
      "portfolio stats",
      "portfolio statistics",
      "show me daksh's portfolio stats",
    ])
  ) {
    return "stats";
  }

  /* =====================================================
     PROJECTS
     ===================================================== */

  if (
    hasAny(text, [
      "dromstays",
      "drom stays",
      "tell me about dromstays",
      "what is dromstays",
      "what is drom stays",
      "dromstays project",
      "which project is he currently working on",
      "which project is daksh currently working on",
      "what project is daksh working on",
      "what project is he working on",
      "current project",
      "latest project",
      "recent project",
      "what projects has daksh worked on",
      "what projects has he worked on",
      "what has daksh built",
      "what has he built",
      "what did daksh build",
      "what did he build",
      "can i see his projects",
      "show me his projects",
      "show me daksh's projects",
      "show me his work",
      "show me daksh's work",
      "project",
      "projects",
      "application",
      "applications",
      "app",
      "apps",
      "products",
      "what have you made",
      "what have you built",
    ])
  ) {
    return "projects";
  }

  /* =====================================================
     SKILLS
     ===================================================== */

  if (
    hasAny(text, [
      "what technologies does daksh know",
      "what technologies does he know",
      "what tech does daksh know",
      "what is daksh's main tech stack",
      "what is his main tech stack",
      "what is daksh tech stack",
      "is daksh a mern developer",
      "is he a mern developer",
      "what are daksh's strongest skills",
      "what are his strongest skills",
      "what frontend technologies does daksh use",
      "what frontend technologies does he use",
      "what backend technologies does daksh use",
      "what backend technologies does he use",
      "what databases does daksh use",
      "what databases does he use",
      "frontend",
      "front end",
      "backend",
      "back end",
      "database",
      "databases",
      "mern",
      "mern stack",
      "tech stack",
      "technology",
      "technologies",
      "skill",
      "skills",
      "what can daksh code",
      "what can he code",
      "what is daksh good at",
      "what is he good at",
      "what does daksh know",
      "what does he know",
    ])
  ) {
    return "skills";
  }

  /* =====================================================
     GENERAL STATS
  ===================================================== */

  if (hasAny(text, ["stats", "statistics", "numbers", "portfolio numbers"])) {
    return "stats";
  }

  /* =====================================================
     FALLBACK
  ===================================================== */

  return null;
};
