const Header = require("../Models/Header");
const { fetchGithubData } = require("../services/github.service");
const { formatGithubData } = require("../Filters/github.filter");
const Skill = require("../Models/Skills");
const Project = require("../Models/Project");
const Experience = require("../Models/Experience");
const Education = require("../Models/Education");

const calculateStats = ({ projects, skills, experience, github }) => {
  const projectCount = projects.length;

  const technologies = new Set();

  skills.forEach((category) => {
    category.Skills?.forEach((skill) => {
      if (skill.SkillName) {
        technologies.add(skill.SkillName);
      }
    });
  });

  const startYears = experience
    .map((item) => {
      const match = item.Period?.match(/\d{4}/);
      return match ? Number(match[0]) : null;
    })
    .filter(Boolean);

  const currentYear = new Date().getFullYear();

  const earliestYear =
    startYears.length > 0 ? Math.min(...startYears) : currentYear;

  const yearsOfCraft = Math.max(1, currentYear - earliestYear);

  const githubContributions = github?.totalContributions ?? 0;

  const formattedContributions =
    githubContributions >= 1000
      ? `${(githubContributions / 1000).toFixed(1)}k`
      : `${githubContributions}`;

  return [
    {
      value: `${projectCount}+`,
      label: "Projects shipped",
    },
    {
      value: `${technologies.size}`,
      label: "Technologies",
    },
    {
      value: `${yearsOfCraft}+`,
      label: "Years of craft",
    },
    {
      value: formattedContributions,
      label: "Github contributions",
    },
  ];
};

const getSkillLevel = (percentage) => {
  if (percentage >= 90) return "Expert";
  if (percentage >= 70) return "Advanced";
  if (percentage >= 40) return "Intermediate";
  return "Beginner";
};

const formatSkillData = (skills) => {
  return skills.map((category) => ({
    ...category.toObject(),
    Skills: category.Skills.map((skill) => ({
      ...skill.toObject(),
      Level: getSkillLevel(skill.Percentage),
    })),
  }));
};

exports.GET_DATA = async (req, res) => {
  try {
    const headerData = await Header.findOne();
    const SkillData = await Skill.find();
    const ProjectData = await Project.find();
    const ExperienceData = await Experience.find();
    const EducationData = await Education.find();

    if (!headerData) {
      return res.status(404).json({
        success: false,
        message: "Header data not found",
      });
    }

    if (!SkillData || SkillData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Skill data not found",
      });
    }

    const Data = await fetchGithubData();
    const GithubData = formatGithubData(Data);
    const FormattedSkillData = formatSkillData(SkillData);

    const stats = calculateStats({
      projects: ProjectData,
      skills: SkillData,
      experience: ExperienceData,
      github: GithubData,
    });

    return res.status(200).json({
      success: true,
      message: "Portfolio data fetched successfully",
      Header: headerData,
      Github: GithubData,
      Skills: FormattedSkillData,
      Projects: ProjectData,
      Experience: ExperienceData,
      Education: EducationData,
      stats,
    });
  } catch (error) {
    console.error("GET_DATA ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio data",
    });
  }
};
