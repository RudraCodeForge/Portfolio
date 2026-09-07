const Skill = require("../../Models/Skills");
const Activity = require("../../Models/Activity");

const parseSkills = (value) => {
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const getPayload = (body) => ({
  Icon: body.Icon?.trim() || "",
  Name: body.Name?.trim() || "",
  Skills: parseSkills(body.Skills),
});

const isValid = (body) =>
  Boolean(
    body.Icon?.trim() &&
    body.Name?.trim() &&
    Array.isArray(parseSkills(body.Skills)),
  );

exports.createSkill = async (req, res) => {
  if (!isValid(req.body)) {
    return res.status(400).json({
      success: false,
      message: "Name, icon, and a valid skills JSON array are required",
    });
  }

  try {
    const skill = await Skill.create(getPayload(req.body));
    await Activity.create({
      title: "New skill added",
      description: `${skill.Name} was added to your profile`,
      icon: "code",
      tone: "blue",
    });
    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    console.error("CREATE SKILL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create skill",
    });
  }
};

exports.updateSkill = async (req, res) => {
  if (!isValid(req.body)) {
    return res.status(400).json({
      success: false,
      message: "Name, icon, and a valid skills JSON array are required",
    });
  }

  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      getPayload(req.body),
      { new: true, runValidators: true },
    );

    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }

    await Activity.create({
      title: "Skill category updated",
      description: `${skill.Name} was updated`,
      icon: "code",
      tone: "blue",
    });

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    console.error("UPDATE SKILL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update skill",
    });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }

    await Activity.create({
      title: "Skill category deleted",
      description: "A skill category was removed",
      icon: "code",
      tone: "warning",
    });

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
      skillId: skill._id,
    });
  } catch (error) {
    console.error("DELETE SKILL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete skill",
    });
  }
};
