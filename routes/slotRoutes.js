const express = require("express");

const router = express.Router();

const protect=require("../middlewares/authMiddleware");

const {
  getSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
  bookSlot,
  cancelBooking
} = require("../controllers/slotController");

router.get("/", getSlots);

router.get("/:id", getSlotById);

router.post("/", protect, createSlot);

router.put("/:id", updateSlot);

router.delete("/:id",protect, deleteSlot)

router.post("/:id/book", protect,bookSlot);

router.post("/:id/cancel",protect,cancelBooking);

module.exports = router;