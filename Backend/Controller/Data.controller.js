exports.GET_DATA = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Header data fetched successfully",
      data: {
        Email: "jitandradaksh533@icloud.com",
        Resume:
          "https://drive.google.com/uc?export=download&id=11MbNqU0FApIOfhA_UbjbxWraBDdiSInL",
        SocialLinks: {
          Github: "https://github.com/RudraCodeForge",
          Instagram: "https://www.instagram.com/princedaksh52/",
          Linkdin: "https://www.linkedin.com/in/prince-jaiveer-8285a43a1/",
        },
      },
    });
  } catch (error) {
    console.error("GET_DATA ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch header data",
    });
  }
};
