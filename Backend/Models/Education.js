const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    Period: {
      type: String,
      required: true,
      trim: true,
    },

    Course: {
      type: String,
      required: true,
      trim: true,
    },

    College: {
      type: String,
      required: true,
      trim: true,
    },

    Desc: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Education", EducationSchema);
