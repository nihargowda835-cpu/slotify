const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const {
  getMyBookings
} = require("../controllers/bookingController");

router.get("/me", protect, getMyBookings);

module.exports = router;