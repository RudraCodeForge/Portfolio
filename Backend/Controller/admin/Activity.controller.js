const Activity = require("../../Models/Activity");

exports.getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error("GET RECENT ACTIVITIES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent activities",
    });
  }
};
