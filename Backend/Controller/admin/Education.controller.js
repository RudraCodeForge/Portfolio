const Education = require("../../Models/Education");

const getPayload = (body) => ({
  Period: body.Period?.trim() || "",
  Course: body.Course?.trim() || "",
  College: body.College?.trim() || "",
  Desc: body.Desc?.trim() || "",
});

const isValid = (body) =>
  [body.Period, body.Course, body.College, body.Desc].every(
    (value) => typeof value === "string" && value.trim(),
  );

exports.createEducation = async (req, res) => {
  if (!isValid(req.body)) {
    return res.status(400).json({
      success: false,
      message: "Period, course, college, and description are required",
    });
  }

  try {
    const education = await Education.create(getPayload(req.body));
    return res.status(201).json({
      success: true,
      message: "Education created successfully",
      education,
    });
  } catch (error) {
    console.error("CREATE EDUCATION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create education",
    });
  }
};

exports.updateEducation = async (req, res) => {
  if (!isValid(req.body)) {
    return res.status(400).json({
      success: false,
      message: "Period, course, college, and description are required",
    });
  }

  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      getPayload(req.body),
      { new: true, runValidators: true },
    );

    if (!education) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Education updated successfully",
      education,
    });
  } catch (error) {
    console.error("UPDATE EDUCATION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update education",
    });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (!education) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Education deleted successfully",
      educationId: education._id,
    });
  } catch (error) {
    console.error("DELETE EDUCATION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete education",
    });
  }
};
