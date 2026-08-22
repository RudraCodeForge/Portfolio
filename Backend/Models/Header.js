const mongoose = require("mongoose");

const HeaderSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
    },

    Resume: {
      type: String,
      required: true,
    },

    SocialLinks: {
      Github: {
        type: String,
        required: true,
      },

      Instagram: {
        type: String,
        required: true,
      },

      LinkedIn: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Header", HeaderSchema);
