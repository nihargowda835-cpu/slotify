const Slot = require("../models/Slot");

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Slot.find({
      bookedBy: req.user.userId,
      isBooked: true
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings"
    });
  }
};

module.exports = {
  getMyBookings
};