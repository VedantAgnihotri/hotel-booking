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
    phoneNo: {
        type: Number,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    noOfRooms: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("booking", bookingSchema);