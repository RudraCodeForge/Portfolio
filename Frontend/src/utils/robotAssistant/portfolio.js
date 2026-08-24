export const normalizeText = (text = "") =>
  text
    .toLowerCase()
    .replace(/[?!.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const hasAny = (text, words) =>
  words.some((word) => text.includes(word));

export const getAllTechnologies = (skills = []) => [
  ...new Set(
    skills.flatMap((category) =>
      (category.Skills || []).map((skill) => skill.SkillName).filter(Boolean),
    ),
  ),
];

export const getCategorySkills = (skills, categoryNames) => {
  const category = skills.find((item) =>
    categoryNames.some((name) => item.Name?.toLowerCase().includes(name)),
  );

  return (
    category?.Skills?.map((skill) => skill.SkillName).filter(Boolean) || []
  );
};

export const getProjectName = (project) =>
  project.Name ||
  project.Title ||
  project.ProjectName ||
  project.name ||
  project.title;

export const getProjectDescription = (project) =>
  project.Description || project.DescriptionText || project.description || "";

export const getGithubUsername = (github = {}) =>
  github.username ||
  github.Username ||
  github.githubUsername ||
  github.GithubUsername ||
  github.userName ||
  github.login ||
  "";

export const getGithubUrl = (github = {}) =>
  github.url ||
  github.Url ||
  github.htmlUrl ||
  github.profileUrl ||
  github.githubUrl ||
  "";

export const getEmail = (header = {}) =>
  header.Email ||
  header.email ||
  header.ContactEmail ||
  header.contactEmail ||
  "the email address shown in the Contact section";

export const formatContributions = (value = 0) => {
  const number = Number(value) || 0;

  return number >= 1000 ? `${(number / 1000).toFixed(1)}k` : String(number);
};
