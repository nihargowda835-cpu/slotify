const express = require("express");

const router = express.Router();

const {
  getSlots,
  getSlotById,
  createSlot,
  deleteSlot
} = require("../controllers/slotController");

router.get("/", getSlots);

router.get("/:id", getSlotById);

router.post("/", createSlot);

router.delete("/:id", deleteSlot)

module.exports = router;