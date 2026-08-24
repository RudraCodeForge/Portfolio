const mongoose = require("mongoose");

const SkillItemSchema = new mongoose.Schema(
  {
    SkillName: {
      type: String,
      required: true,
      trim: true,
    },

    Percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { _id: false },
);

const SkillSchema = new mongoose.Schema(
  {
    Icon: {
      type: String,
      required: true,
      trim: true,
    },

    Name: {
      type: String,
      required: true,
      trim: true,
    },

    Skills: {
      type: [SkillItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Skill", SkillSchema);
