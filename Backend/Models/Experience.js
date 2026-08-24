const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    Period: {
      type: String,
      required: true,
      trim: true,
    },

    Role: {
      type: String,
      required: true,
      trim: true,
    },

    Company: {
      type: String,
      required: true,
      trim: true,
    },

    Location: {
      type: String,
      required: true,
      trim: true,
    },

    Description: {
      type: String,
      required: true,
      trim: true,
    },

    Skills: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Experience", ExperienceSchema);
