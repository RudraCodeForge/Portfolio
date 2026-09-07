const Experience = require("../../Models/Experience");
const Activity = require("../../Models/Activity");

const parseSkills = (value) =>
  Array.isArray(value)
    ? value.map((skill) => String(skill).trim()).filter(Boolean)
    : String(value || "")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

const getPayload = (body) => ({
  Period: body.Period?.trim() || "",
  Role: body.Role?.trim() || "",
  Company: body.Company?.trim() || "",
  Location: body.Location?.trim() || "",
  Description: body.Description?.trim() || "",
  Skills: parseSkills(body.Skills),
});

const isValid = (body) =>
  [body.Period, body.Role, body.Company, body.Location, body.Description].every(
    (value) => typeof value === "string" && value.trim(),
  );

exports.createExperience = async (req, res) => {
  if (!isValid(req.body)) {
    return res.status(400).json({
      success: false,
      message: "Period, role, company, location, and description are required",
    });
  }

  try {
    const experience = await Experience.create(getPayload(req.body));
    await Activity.create({
      title: "Experience added",
      description: `${experience.Role} at ${experience.Company} was added`,
      icon: "briefcase",
      tone: "yellow",
    });
    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      experience,
    });
  } catch (error) {
    console.error("CREATE EXPERIENCE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create experience",
    });
  }
};

exports.updateExperience = async (req, res) => {
  if (!isValid(req.body)) {
    return res.status(400).json({
      success: false,
      message: "Period, role, company, location, and description are required",
    });
  }

  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      getPayload(req.body),
      { new: true, runValidators: true },
    );

    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    await Activity.create({
      title: "Experience updated",
      description: `${experience.Role} at ${experience.Company} was updated`,
      icon: "briefcase",
      tone: "yellow",
    });

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      experience,
    });
  } catch (error) {
    console.error("UPDATE EXPERIENCE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update experience",
    });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    await Activity.create({
      title: "Experience deleted",
      description: "Experience details were removed",
      icon: "briefcase",
      tone: "warning",
    });

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
      experienceId: experience._id,
    });
  } catch (error) {
    console.error("DELETE EXPERIENCE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete experience",
    });
  }
};
