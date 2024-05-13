const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    maxcount: {
        type: Number,
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    currentBookings: {
        type: Array
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model("room", roomSchema);