const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "settings",
      trim: true,
    },
    tone: {
      type: String,
      enum: ["mint", "blue", "yellow", "warning"],
      default: "mint",
    },
  },
  {
    timestamps: true,
  },
);

ActivitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

module.exports = mongoose.model("Activity", ActivitySchema);
