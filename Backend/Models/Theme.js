const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema(
  {
    themeId: { type: String, required: true, default: "mint" },
    name: { type: String, required: true },
    variables: { type: Map, of: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Theme", ThemeSchema);
