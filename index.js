const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Slotify API"
  });
});

const slotRoutes = require("./routes/slotRoutes");

app.use("/slots", slotRoutes);

app.listen(3000, () => {
  console.log("Slotify server running on http://localhost:3000");
});