const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    ProjectImage: {
      type: String,
      default: "",
      trim: true,
    },

    LiveLink: {
      type: String,
      default: "",
      trim: true,
    },

    Category: {
      type: String,
      required: true,
      trim: true,
    },

    Note: {
      type: String,
      default: "",
      trim: true,
    },

    Title: {
      type: String,
      required: true,
      trim: true,
    },

    Description: {
      type: String,
      required: true,
      trim: true,
    },

    TechStack: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", ProjectSchema);
