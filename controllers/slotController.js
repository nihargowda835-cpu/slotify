const slots = require("../data/slots");

const getSlots = (req, res) => {
  res.status(200).json(slots);
};

const getSlotById = (req, res) => {
  const id = Number(req.params.id);

  const slot = slots.find((slot) => slot.id === id);

  if (!slot) {
    return res.status(404).json({
      message: "Slot not found"
    });
  }

  res.status(200).json(slot);
};

const createSlot = (req, res) => {
  const { date, time, duration } = req.body;

  if (!date || !time || !duration) {
    return res.status(400).json({
      message: "date, time and duration are required"
    });
  }

  const newSlot = {
    id: slots.length + 1,
    date,
    time,
    duration,
    isBooked: false
  };

  slots.push(newSlot);

  res.status(201).json(newSlot);
};

const deleteSlot = (req, res) => {
  const id = Number(req.params.id);

  const slotIndex = slots.findIndex((slot) => slot.id === id);

  if (slotIndex === -1) {
    return res.status(404).json({
      message: "Slot not found"
    });
  }

  const deletedSlot = slots.splice(slotIndex, 1);

  res.status(200).json({
    message: "Slot deleted successfully",
    slot: deletedSlot[0]
  });
};

module.exports = {
  getSlots,
  getSlotById,
  createSlot,
  deleteSlot
};