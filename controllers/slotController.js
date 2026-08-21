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

module.exports = {
  getSlots,
  getSlotById
};