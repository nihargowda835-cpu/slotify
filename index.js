const express = require("express");

const app = express();

const PORT = 3000;

app.use((req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Slotify API"
  });
});

app.listen(PORT, () => {
  console.log(`Slotify server running on http://localhost:${PORT}`);
});