const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hotel").then(console.log("DB connected"));

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    noOfRooms: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("booking", bookingSchema);