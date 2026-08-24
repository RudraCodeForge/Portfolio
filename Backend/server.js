require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const DataRouter = require("./Routes/DataRoute.route");
const ContactRouter = require("./Routes/Contact.route");
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/storage", express.static(path.join(__dirname, "storage")));

// ------------------ MONGO DB CONNECTION ------------------ //
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MONGO DB CONNECTED SUCCESSFULLY");
  })
  .catch((err) => {
    console.log("ERROR WHILE CONNECTING TO MONGO DB :", err);
  });

// ------------------ ROUTES ------------------ //
app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.use("/PortfolioData", DataRouter);

app.use("/Contact", ContactRouter);

// ------------------ SERVER START ------------------ //
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
