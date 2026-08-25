const Slot = require("../models/Slot");

// GET /slots
const getSlots = async (req, res) => {
  try {
    const slots = await Slot.find();

    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch slots"
    });
  }
};

// GET /slots/:id
const getSlotById = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found"
      });
    }

    res.status(200).json(slot);
  } catch (error) {
    res.status(400).json({
      message: "Invalid slot ID"
    });
  }
};

// POST /slots - we will migrate this next
const createSlot = async (req, res) => {
  try {
    const { date, time, duration, isBooked } = req.body;

    if (!date || !time || !duration) {
      return res.status(400).json({
        message: "date, time and duration are required"
      });
    }

    const newSlot = await Slot.create({
      date,
      time,
      duration,
      isBooked
    });

    res.status(201).json(newSlot);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create slot"
    });
  }
};

const deleteSlot = async (req, res) => {
  try {
    const deletedSlot = await Slot.findByIdAndDelete(req.params.id);

    if (!deletedSlot) {
      return res.status(404).json({
        message: "Slot not found"
      });
    }

    res.status(200).json({
      message: "Slot deleted successfully",
      slot: deletedSlot
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid slot ID"
    });
  }
};
const updateSlot = async (req, res) => {
  try {
    const updatedSlot = await Slot.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedSlot) {
      return res.status(404).json({
        message: "Slot not found"
      });
    }

    res.status(200).json(updatedSlot);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update slot"
    });
  }
};
module.exports = {
  getSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot
};