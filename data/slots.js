const slots = [
  {
    id: 1,
    date: "2026-08-20",
    time: "10:00",
    duration: 30,
    isBooked: false
  },
  {
    id: 2,
    date: "2026-08-20",
    time: "11:00",
    duration: 30,
    isBooked: true
  },
  {
    id: 3,
    date: "2026-08-21",
    time: "14:00",
    duration: 60,
    isBooked: false
  }
];
const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;

module.exports = slots;