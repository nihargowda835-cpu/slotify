const Slot = require("../models/Slot");

// GET /slots
const getSlots = async (req, res) => {
  try {
    const filter = {};

    if (req.query.available === "true") {
      filter.isBooked = false;
    }

    const slots = await Slot.find(filter);

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

// POST /slots
const createSlot = async (req, res) => {
  try {
    const { date, time, duration, isBooked } = req.body;

    if (!date || !time || !duration) {
      return res.status(400).json({
        message: "date, time and duration are required"
      });
    }

    const [hours, minutes] = time.split(":").map(Number);

    const newStart = hours * 60 + minutes;
    const newEnd = newStart + duration;

    const existingSlots = await Slot.find({ date });

    const hasConflict = existingSlots.some((slot) => {
      const [existingHours, existingMinutes] = slot.time
        .split(":")
        .map(Number);

      const existingStart =
        existingHours * 60 + existingMinutes;

      const existingEnd =
        existingStart + slot.duration;

      return (
        newStart < existingEnd &&
        newEnd > existingStart
      );
    });

    if (hasConflict) {
      return res.status(409).json({
        message: "Slot conflicts with an existing slot"
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

// PUT /slots/:id
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

// DELETE /slots/:id
const deleteSlot = async (req, res) => {
  try {
    const deletedSlot = await Slot.findByIdAndDelete(
      req.params.id
    );

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

// POST /slots/:id/book
const bookSlot = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found"
      });
    }

    if (slot.isBooked) {
      return res.status(409).json({
        message: "Slot is already booked"
      });
    }

    slot.isBooked = true;
    slot.bookedBy = req.user.userId;

    await slot.save();

    res.status(200).json({
      message: "Slot booked successfully",
      slot
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to book slot"
    });
  }
};

// POST /slots/:id/cancel
const cancelBooking = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found"
      });
    }

    if (!slot.isBooked) {
      return res.status(400).json({
        message: "Slot is not booked"
      });
    }

    if (!slot.bookedBy) {
      return res.status(400).json({
        message: "Booking owner not found"
      });
    }

    const bookedById = String(slot.bookedBy);
    const currentUserId = String(req.user.userId);

    if (bookedById !== currentUserId) {
      return res.status(403).json({
        message: "You are not allowed to cancel this booking"
      });
    }

    slot.isBooked = false;
    slot.bookedBy = null;

    await slot.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      slot
    });
  } catch (error) {
    console.error("Cancel error:", error.message);

    res.status(400).json({
      message: "Failed to cancel booking"
    });
  }
};

module.exports = {
  getSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
  bookSlot,
  cancelBooking
};