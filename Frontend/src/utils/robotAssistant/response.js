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

export const getPortfolioResponse = (question, portfolio) => {
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

  switch (intent) {
    case "greeting":
      return "Hey! 👋 I'm Prince Daksh's portfolio assistant. What would you like to know?";

    case "thanks":
      return "You're welcome! 🤖 Glad I could help.";

    case "goodbye":
      return "See you around! 👋 Feel free to explore the rest of the portfolio.";

    case "about":
      return "Prince Daksh is a software developer focused on building full-stack applications, scalable backend systems, and real-world digital products. He works mainly with the MERN stack and enjoys taking products from an idea to a working application.";

    case "skills": {
      if (hasAny(text, ["frontend", "front end", "react"])) {
        const skills = getCategorySkills(Skills, [
          "frontend",
          "front end",
          "ui",
        ]);

        if (skills.length) {
          return `For frontend development, Prince works with ${skills.join(", ")}.`;
        }
      }

      if (hasAny(text, ["backend", "back end", "node", "express", "api"])) {
        const skills = getCategorySkills(Skills, [
          "backend",
          "back end",
          "server",
        ]);

        if (skills.length) {
          return `For backend development, Prince works with ${skills.join(", ")}.`;
        }

        return "Prince primarily works with Node.js and Express.js for backend development, including REST APIs, authentication, business logic, and database integration.";
      }

      if (
        hasAny(text, [
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

        if (skills.length) {
          return `Prince works with databases including ${skills.join(", ")}.`;
        }
      }

      return technologies.length
        ? `Prince works with ${technologies.join(", ")}. His primary stack is the MERN ecosystem, along with other tools used across his projects.`
        : "The current skills data isn't available in the portfolio state.";
    }

    case "projects": {
      if (!Projects.length) {
        return "The project data isn't available in the portfolio state right now.";
      }

      if (hasAny(text, ["dromstays", "drom stays"])) {
        const project = Projects.find((item) =>
          `${getProjectName(item) || ""}`.toLowerCase().includes("drom"),
        );

        if (project) {
          return (
            getProjectDescription(project) ||
            `${getProjectName(project)} is one of Prince's portfolio projects.`
          );
        }

        return (
          latestExperience?.Description ||
          "DromStays is a full-stack rental and local services platform connecting tenants, property owners, and service partners."
        );
      }

      if (hasAny(text, ["how many", "number", "count"])) {
        return `Prince currently has ${Projects.length} project${Projects.length === 1 ? "" : "s"} in his portfolio. 🚀`;
      }

      const projectDetails = Projects.slice(0, 6)
        .map((project) => {
          const name = getProjectName(project);

          if (!name) return null;

          const description = getProjectDescription(project);

          return description ? `${name}: ${description}` : name;
        })
        .filter(Boolean);

      return projectDetails.length
        ? `Here are some of Prince's projects:\n\n${projectDetails.join("\n\n")}`
        : `Prince has ${Projects.length} projects in his portfolio.`;
    }

    case "experience":
      if (!Experience.length) {
        return "The experience data isn't available in the portfolio state right now.";
      }

      if (
        hasAny(text, [
          "current",
          "currently",
          "now",
          "present",
          "where do you work",
          "where does daksh work",
        ])
      ) {
        return latestExperience
          ? `Prince is currently ${latestExperience.Role} at ${latestExperience.Company} (${latestExperience.Period}). ${latestExperience.Description}`
          : "Current experience information isn't available right now.";
      }

      return `Prince's experience includes:\n\n${Experience.map(
        (item) => `${item.Role} — ${item.Company} (${item.Period})`,
      ).join("\n")}`;

    case "education":
      return Education.length
        ? Education.map(
            (item) =>
              `${item.Course} at ${item.College} (${item.Period}). ${item.Desc || ""}`,
          ).join("\n\n")
        : "The education data isn't available in the portfolio state right now.";

    case "github": {
      const username = getGithubUsername(Github);
      const url = getGithubUrl(Github);

      const contributions =
        Github.totalContributions ??
        Github.TotalContributions ??
        Github.contributions ??
        0;

      let response = username
        ? `Prince's GitHub username is ${username}. `
        : "Prince's GitHub profile is part of the portfolio. ";

      response += `He currently has ${formatContributions(contributions)} contributions.`;

      if (url) {
        response +=
          " You can visit his GitHub profile from the GitHub link in the portfolio.";
      }

      return response;
    }

    case "stats":
      return stats.length
        ? stats.map((item) => `${item.value} ${item.label}`).join(" • ")
        : `Prince currently has ${Projects.length} projects and works with ${technologies.length} technologies.`;

    case "resume":
      return "You can find Prince Daksh's resume through the Resume section of the portfolio.";

    case "contact": {
      const email = getEmail(Header);

      return `You can contact Prince through the portfolio's Contact section. ${
        email.startsWith("the email")
          ? "The current contact email is available there."
          : `The contact email is ${email}.`
      }`;
    }

    case "help":
      return "I can help you explore Prince's skills, projects, experience, education, GitHub, portfolio stats, resume, and contact information.";

    default:
      if (
        hasAny(text, [
          "can you build",
          "can daksh build",
          "can you develop",
          "can daksh develop",
          "are you able to build",
        ])
      ) {
        return technologies.length
          ? `Based on the portfolio, Prince has experience building full-stack applications using ${technologies.slice(0, 8).join(", ")}.`
          : "Based on the portfolio, Prince focuses on full-stack application development.";
      }

      if (hasAny(text, ["freelance", "freelancing", "available for work"])) {
        return "The portfolio doesn't currently specify detailed availability information. You can use the Contact section to reach Prince directly about a project or collaboration.";
      }

      return "I couldn't match that question to a specific piece of portfolio information yet. 🤖 Try asking about Daksh's projects, skills, experience, education, GitHub, or current work.";
  }
};
