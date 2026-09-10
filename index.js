const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes=require("./routes/bookingRoutes");
require("dotenv").config();

const app = express();


app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Slotify API"
  });
});

const slotRoutes = require("./routes/slotRoutes");

app.use("/slots", slotRoutes);

app.use("/bookings",bookingRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Slotify server running on port ${PORT}`);
});