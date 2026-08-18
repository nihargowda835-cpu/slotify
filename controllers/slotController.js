const slots = require("../data/slots");

const getSlots = (req, res) => {
  res.status(200).json(slots);
};

module.exports = {
  getSlots
};