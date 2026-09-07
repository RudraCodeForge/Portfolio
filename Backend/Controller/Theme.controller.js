const Theme = require("../Models/Theme");
const Activity = require("../Models/Activity");

exports.getTheme = async (req, res) => {
  const theme = await Theme.findOne().lean();
  return res.status(200).json({ success: true, theme: theme || null });
};

exports.updateTheme = async (req, res) => {
  try {
    const { themeId, name, variables, effects } = req.body;

    if (!themeId || !name || !variables || typeof variables !== "object") {
      return res
        .status(400)
        .json({ success: false, message: "Theme data is required" });
    }

    const theme = await Theme.findOneAndUpdate(
      {},
      { themeId, name, variables, effects: effects || {} },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    ).lean();
    await Activity.create({
      title: "Portfolio settings updated",
      description: "The portfolio theme was updated",
      icon: "settings",
      tone: "yellow",
    });

    return res.status(200).json({ success: true, theme });
  } catch (error) {
    console.error("UPDATE THEME ERROR:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update theme" });
  }
};
