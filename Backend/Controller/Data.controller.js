const Header = require("../Models/Header");

exports.GET_DATA = async (req, res) => {
  try {
    const headerData = await Header.findOne();

    if (!headerData) {
      return res.status(404).json({
        success: false,
        message: "Header data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Header data fetched successfully",
      data: headerData,
    });
  } catch (error) {
    console.error("GET_DATA ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch header data",
    });
  }
};
