const Header = require("../Models/Header");
const { fetchGithubData } = require("../services/github.service");
const { formatGithubData } = require("../Filters/github.filter");
const Skill = require("../Models/Skills");

const stats = [
  { value: "24+", label: "Projects shipped" },
  { value: "18", label: "Technologies" },
  { value: "4+", label: "Years of craft" },
  { value: "1.2k", label: "Github contributions" },
];

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

    res.status(200).json({
      success: true,
      message: "Portfolio data fetched successfully",

      Header: headerData,

      Github: GithubData,

      Skills: FormattedSkillData,

      stats,
    });
  } catch (error) {
    console.error("GET_DATA ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio data",
    });
  }
};
