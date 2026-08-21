const express = require("express");

const router = express.Router();

const {
  getSlots,
  getSlotById,
  createSlot
} = require("../controllers/slotController");

router.get("/", getSlots);

router.get("/:id", getSlotById);

router.post("/", createSlot);

module.exports = router;