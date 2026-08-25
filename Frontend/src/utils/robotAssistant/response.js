import { detectIntent } from "../../data/RobotAssistant/intents";

import {
  getAllTechnologies,
  getCategorySkills,
  getEmail,
  getGithubUrl,
  getGithubUsername,
  getProjectDescription,
  getProjectName,
  formatContributions,
  hasAny,
  normalizeText,
} from "./portfolio";

const STARTING_YEAR = 2020;

const includes = (text, words = []) => hasAny(text, words);

const getProjectByName = (projects, name) =>
  projects.find((project) =>
    String(getProjectName(project) || "")
      .toLowerCase()
      .includes(name.toLowerCase()),
  );

const formatProject = (project) => {
  if (!project) return null;

  const name = getProjectName(project);
  const description = getProjectDescription(project);

  if (!name) return null;

  return description ? `${name}: ${description}` : name;
};

const getExperienceYears = () =>
  Math.max(0, new Date().getFullYear() - STARTING_YEAR);

const getContributions = (github = {}) =>
  github.totalContributions ??
  github.TotalContributions ??
  github.contributions ??
  0;

export const getPortfolioResponse = (question = "", portfolio = {}) => {
  const text = normalizeText(question);

  const {
    Header = {},
    Github = {},
    Skills = [],
    Projects = [],
    Experience = [],
    Education = [],
    stats = [],
  } = portfolio;

  const technologies = getAllTechnologies(Skills);
  const latestExperience = Experience[0];
  const intent = detectIntent(question);

  if (intent === "greeting") {
    return "Hey! 👋 I'm Prince Daksh's portfolio assistant. Ask me anything about his projects, skills, experience, education, GitHub, or current work.";
  }

  if (intent === "thanks") {
    return "You're welcome! 🤖 Glad I could help.";
  }

  if (intent === "goodbye") {
    return "See you around! 👋 Feel free to explore the rest of Daksh's portfolio.";
  }

  if (intent === "help") {
    return "I can answer specific questions about Daksh's projects, skills, MERN stack, experience, education, GitHub activity, portfolio statistics, resume, and contact information. 🤖";
  }

  if (intent === "about") {
    // Current focus
    if (
      includes(text, [
        "currently focused",
        "current focus",
        "focus right now",
        "focused on",
        "what is daksh focused on",
        "what is he currently focused on",
      ])
    ) {
      return latestExperience
        ? `Daksh is currently focused on his work as ${latestExperience.Role} at ${latestExperience.Company}. ${
            latestExperience.Description || ""
          }`
        : "Daksh is currently focused on full-stack development, backend systems, and building real-world digital products.";
    }

    // Type of developer
    if (
      includes(text, [
        "what kind of developer",
        "what type of developer",
        "which type of developer",
      ])
    ) {
      return "Daksh is a full-stack software developer with a strong focus on the MERN ecosystem, backend development, APIs, databases, and building real-world applications.";
    }

    // What does Daksh do
    if (
      includes(text, [
        "what does daksh do",
        "what does he do",
        "what does prince do",
      ])
    ) {
      return "Daksh works as a software developer, mainly building full-stack web applications, backend systems, APIs, and real-world digital products.";
    }

    // Default about
    return "Prince Daksh is a software developer focused on full-stack development, backend engineering, and building practical digital products. His primary development stack is the MERN ecosystem.";
  }

  if (intent === "skills") {
    // Frontend
    if (
      includes(text, [
        "frontend",
        "front end",
        "ui technologies",
        "client side",
      ])
    ) {
      const skills = getCategorySkills(Skills, ["frontend", "front end", "ui"]);

      return skills.length
        ? `For frontend development, Daksh works with ${skills.join(", ")}.`
        : "Daksh's frontend stack includes technologies from the React ecosystem and other tools used for modern web interfaces.";
    }

    // Backend
    if (
      includes(text, [
        "backend",
        "back end",
        "server side",
        "server-side",
        "api",
        "apis",
      ])
    ) {
      const skills = getCategorySkills(Skills, [
        "backend",
        "back end",
        "server",
      ]);

      return skills.length
        ? `For backend development, Daksh works with ${skills.join(", ")}.`
        : "Daksh primarily works with Node.js and Express.js for backend development, including APIs, authentication, business logic, and database integration.";
    }

    // Database
    if (
      includes(text, [
        "database",
        "databases",
        "mongodb",
        "mongo",
        "mysql",
        "sql",
      ])
    ) {
      const skills = getCategorySkills(Skills, [
        "database",
        "databases",
        "sql",
      ]);

      return skills.length
        ? `Daksh works with databases including ${skills.join(", ")}.`
        : "Daksh works with databases as part of his full-stack development workflow, particularly within the MERN ecosystem.";
    }

    // MERN
    if (
      includes(text, [
        "mern",
        "mern developer",
        "main tech stack",
        "primary tech stack",
        "tech stack",
      ])
    ) {
      return "Yes. Daksh primarily works with the MERN stack — MongoDB, Express.js, React, and Node.js — along with supporting tools used across his projects.";
    }

    // Strongest skills
    if (
      includes(text, [
        "strongest skills",
        "best skills",
        "main skills",
        "key skills",
        "core skills",
      ])
    ) {
      return technologies.length
        ? `Daksh's core technical skills include ${technologies
            .slice(0, 8)
            .join(
              ", ",
            )}. His strongest area is full-stack development, particularly around the MERN ecosystem.`
        : "Daksh's strongest area is full-stack development, particularly around the MERN ecosystem.";
    }

    // Technology count
    if (
      includes(text, [
        "how many technologies",
        "number of technologies",
        "technology count",
      ])
    ) {
      return `Daksh currently has ${technologies.length} technologies listed in his portfolio.`;
    }

    // Default skills
    return technologies.length
      ? `Daksh works with ${technologies.join(", ")}. His primary stack is the MERN ecosystem.`
      : "The current skills data isn't available in the portfolio state.";
  }

  if (intent === "projects") {
    if (!Projects.length) {
      return "The project data isn't available in the portfolio state right now.";
    }

    // Technologies used in projects
    if (
      includes(text, [
        "what technologies are used in his projects",
        "technologies used in his projects",
        "tech used in projects",
        "technology used in projects",
      ])
    ) {
      return technologies.length
        ? `Across his projects, Daksh uses technologies such as ${technologies.join(", ")}.`
        : "The technology information for his projects isn't available right now.";
    }

    // DromStays
    if (includes(text, ["dromstays", "drom stays", "drom"])) {
      const project = getProjectByName(Projects, "drom");

      return project
        ? getProjectDescription(project) ||
            `${getProjectName(project)} is one of Daksh's portfolio projects.`
        : "DromStays is a full-stack rental and local services platform connecting tenants, property owners, and service partners.";
    }

    // Current / latest project
    if (
      includes(text, [
        "which project is he currently",
        "which project is daksh currently",
        "what project is daksh working on",
        "what project is he working on",
        "current project",
        "latest project",
        "recent project",
      ])
    ) {
      const currentProject =
        Projects.find((project) => {
          const value = JSON.stringify(project).toLowerCase();

          return (
            value.includes("current") ||
            value.includes("ongoing") ||
            value.includes("active")
          );
        }) || Projects[0];

      const formatted = formatProject(currentProject);

      return formatted
        ? `Daksh's current/recent project is ${formatted}`
        : "Daksh's current project information isn't available right now.";
    }

    // Can I see projects
    if (
      includes(text, [
        "can i see his projects",
        "show me projects",
        "view projects",
        "see projects",
        "portfolio projects",
      ])
    ) {
      return `Yes! 🚀 Daksh has ${Projects.length} project${
        Projects.length === 1 ? "" : "s"
      } available in the Projects section of the portfolio.`;
    }

    // Project count
    if (
      includes(text, [
        "how many projects",
        "number of projects",
        "project count",
      ])
    ) {
      return `Daksh currently has ${Projects.length} project${
        Projects.length === 1 ? "" : "s"
      } in his portfolio. 🚀`;
    }

    // Project list
    const projectDetails = Projects.slice(0, 8)
      .map(formatProject)
      .filter(Boolean);

    return projectDetails.length
      ? `Here are some of Daksh's projects:\n\n${projectDetails.join("\n\n")}`
      : `Daksh has ${Projects.length} projects in his portfolio.`;
  }

  if (intent === "experience") {
    if (!Experience.length) {
      return "The experience data isn't available in the portfolio state right now.";
    }

    // Current role
    if (
      includes(text, [
        "current role",
        "current job",
        "current position",
        "what is his current role",
        "what is daksh current role",
      ])
    ) {
      return latestExperience
        ? `Daksh is currently ${latestExperience.Role} at ${latestExperience.Company}.`
        : "Daksh's current role information isn't available right now.";
    }

    // Company
    if (
      includes(text, [
        "where does daksh work",
        "where does he work",
        "where is daksh working",
        "where is he working",
        "who does daksh work for",
        "current company",
      ])
    ) {
      return latestExperience
        ? `Daksh currently works at ${latestExperience.Company} as ${latestExperience.Role}.`
        : "Daksh's current company information isn't available right now.";
    }

    // Current work
    if (
      includes(text, [
        "what is daksh currently working on",
        "what is he currently working on",
        "currently working",
        "working currently",
      ])
    ) {
      return latestExperience
        ? `Daksh is currently working as ${latestExperience.Role} at ${latestExperience.Company}. ${
            latestExperience.Description || ""
          }`
        : "Daksh's current work information isn't available right now.";
    }

    // Years
    if (
      includes(text, [
        "how many years",
        "years of experience",
        "years building software",
        "how long has daksh",
        "how long has he",
      ])
    ) {
      return `Daksh has around ${getExperienceYears()} years of software development experience, based on a starting year of ${STARTING_YEAR}.`;
    }

    // Previous experience
    if (
      includes(text, [
        "previous experience",
        "past experience",
        "previous work",
        "worked before",
        "work history",
      ])
    ) {
      const previous = Experience.slice(1);

      return previous.length
        ? `Daksh's previous experience includes:\n\n${previous
            .map(
              (item) =>
                `${item.Role} — ${item.Company} (${item.Period})${
                  item.Description ? `\n${item.Description}` : ""
                }`,
            )
            .join("\n\n")}`
        : "The portfolio doesn't currently list previous experience separately.";
    }

    // Kind of work
    if (
      includes(text, [
        "what kind of work has he done",
        "what kind of work has daksh done",
        "what work has he done",
        "what work has daksh done",
        "what kind of work",
      ])
    ) {
      return Experience.map(
        (item) =>
          `${item.Role} — ${item.Company} (${item.Period})${
            item.Description ? `\n${item.Description}` : ""
          }`,
      ).join("\n\n");
    }

    // Full experience
    return `Daksh's experience includes:\n\n${Experience.map(
      (item) =>
        `${item.Role} — ${item.Company} (${item.Period})${
          item.Description ? `\n${item.Description}` : ""
        }`,
    ).join("\n\n")}`;
  }

  if (intent === "education") {
    if (!Education.length) {
      return "The education data isn't available in the portfolio state right now.";
    }

    // Degree
    if (
      includes(text, [
        "what degree",
        "degree does he have",
        "degree does daksh have",
        "qualification",
      ])
    ) {
      const degrees = Education.map((item) => item.Course).filter(Boolean);

      return degrees.length
        ? `Daksh has studied ${degrees.join(", ")}.`
        : "Daksh's degree information isn't available right now.";
    }

    // College
    if (
      includes(text, [
        "which college",
        "what college",
        "where did daksh study",
        "where did he study",
        "college did he attend",
      ])
    ) {
      const colleges = Education.map((item) => item.College).filter(Boolean);

      return colleges.length
        ? `Daksh studied at ${colleges.join(", ")}.`
        : "Daksh's college information isn't available right now.";
    }

    // Course / What did he study
    if (
      includes(text, [
        "what did daksh study",
        "what did he study",
        "course did he study",
      ])
    ) {
      return Education.map(
        (item) => `${item.Course} at ${item.College} (${item.Period}).`,
      ).join("\n\n");
    }

    // Graduation / Completion
    if (
      includes(text, [
        "when did he complete",
        "when did daksh complete",
        "when did he graduate",
        "when did daksh graduate",
        "graduated",
        "graduation",
        "completed degree",
      ])
    ) {
      return Education.map((item) => `${item.Course} — ${item.Period}.`).join(
        "\n\n",
      );
    }

    // Full education
    return Education.map(
      (item) =>
        `${item.Course} at ${item.College} (${item.Period}). ${
          item.Desc || ""
        }`,
    ).join("\n\n");
  }

  if (intent === "github") {
    const username = getGithubUsername(Github);
    const url = getGithubUrl(Github);
    const contributions = getContributions(Github);

    // Username
    if (
      includes(text, [
        "github username",
        "username",
        "what is his github username",
      ])
    ) {
      return username
        ? `Daksh's GitHub username is ${username}.`
        : "Daksh's GitHub username isn't available right now.";
    }

    // Contributions
    if (
      includes(text, [
        "contributions",
        "github contributions",
        "how many contributions",
        "contribution count",
      ])
    ) {
      return `Daksh currently has ${formatContributions(
        contributions,
      )} GitHub contributions.`;
    }

    // Activity
    if (
      includes(text, [
        "how active",
        "github active",
        "active on github",
        "github activity",
      ])
    ) {
      return `Daksh is actively using GitHub, with ${formatContributions(
        contributions,
      )} contributions currently recorded in the portfolio data.`;
    }

    // Profile / Visit
    if (
      includes(text, [
        "visit github",
        "github profile",
        "github link",
        "can i visit",
      ])
    ) {
      return url
        ? `Yes! You can visit Daksh's GitHub profile through the GitHub link in the portfolio.`
        : "Daksh's GitHub profile is available through the GitHub section of the portfolio.";
    }

    // What can I find
    if (
      includes(text, [
        "what can i find on github",
        "what is on github",
        "github projects",
      ])
    ) {
      return "You can explore Daksh's repositories, development work, and contribution activity on his GitHub profile.";
    }

    // General GitHub
    return username
      ? `Daksh's GitHub username is ${username}, with ${formatContributions(
          contributions,
        )} contributions.`
      : `Daksh currently has ${formatContributions(
          contributions,
        )} GitHub contributions.`;
  }

  if (intent === "stats") {
    // Projects shipped
    if (
      includes(text, [
        "how many projects shipped",
        "projects shipped",
        "number of projects",
      ])
    ) {
      return `Daksh has shipped ${Projects.length} project${
        Projects.length === 1 ? "" : "s"
      } according to the current portfolio data. 🚀`;
    }

    // Technologies count
    if (
      includes(text, [
        "how many technologies",
        "technology count",
        "number of technologies",
      ])
    ) {
      return `Daksh currently has ${technologies.length} technologies listed in his portfolio.`;
    }

    // Coding years
    if (
      includes(text, [
        "how many years coding",
        "years coding",
        "how many years has daksh been coding",
      ])
    ) {
      return `Daksh has around ${getExperienceYears()} years of coding/software development experience, based on a starting year of ${STARTING_YEAR}.`;
    }

    // General portfolio stats
    return stats.length
      ? stats.map((item) => `${item.value} ${item.label}`).join(" • ")
      : `Daksh currently has ${Projects.length} projects and works with ${technologies.length} technologies.`;
  }

  if (intent === "resume") {
    // Download
    if (
      includes(text, [
        "download",
        "download cv",
        "download resume",
        "get resume",
        "get cv",
      ])
    ) {
      return "Yes. You can access Daksh's resume from the Resume section of the portfolio.";
    }

    // View
    if (includes(text, ["see resume", "view resume", "resume", "cv"])) {
      return "You can view Daksh's resume through the Resume section of the portfolio.";
    }

    return "Daksh's resume is available through the Resume section of the portfolio.";
  }

  if (intent === "contact") {
    const email = getEmail(Header);

    // Email
    if (includes(text, ["email", "email address", "contact email"])) {
      return email.startsWith("the email")
        ? "Daksh's contact email is available in the Contact section of the portfolio."
        : `Daksh's contact email is ${email}.`;
    }

    // Hiring / Collaboration
    if (
      includes(text, [
        "hire daksh",
        "hire him",
        "work with daksh",
        "work with him",
        "freelance",
        "collaboration",
      ])
    ) {
      return "Yes! If you'd like to work with Daksh on a project or collaboration, you can reach him through the Contact section of the portfolio.";
    }

    return "You can contact Daksh through the Contact section of the portfolio.";
  }

  if (
    includes(text, [
      "can you build",
      "can daksh build",
      "can you develop",
      "can daksh develop",
      "able to build",
      "can he build",
    ])
  ) {
    return technologies.length
      ? `Yes. Based on Daksh's portfolio, he can build full-stack applications using technologies such as ${technologies
          .slice(0, 8)
          .join(", ")}.`
      : "Based on the portfolio, Daksh focuses on full-stack application development.";
  }

  if (
    includes(text, [
      "freelance",
      "freelancing",
      "available for work",
      "available for projects",
      "available to work",
    ])
  ) {
    return "The portfolio doesn't currently specify Daksh's detailed availability. You can use the Contact section to reach him about a project or collaboration.";
  }

  if (includes(text, ["dromstays", "drom stays"])) {
    const project = getProjectByName(Projects, "drom");

    return project
      ? getProjectDescription(project) ||
          `${getProjectName(project)} is one of Daksh's portfolio projects.`
      : "DromStays is a full-stack rental and local services platform connecting tenants, property owners, and service partners.";
  }
  return "I couldn't find a specific portfolio detail for that question yet. 🤖 Try asking about a particular project, technology, role, education detail, GitHub statistic, or something Daksh is currently working on.";
};
