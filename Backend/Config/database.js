const mongoose = require("mongoose");

const connectDatabase = async () => {
  const connectionString = process.env.MONGO_URI;

  if (!connectionString) {
    throw new Error("MONGO_URI is missing from the environment");
  }

  const connection = await mongoose.connect(connectionString);
  console.log(`MongoDB connected: ${connection.connection.host}`);
};

module.exports = connectDatabase;
