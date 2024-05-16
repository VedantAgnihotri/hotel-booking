var express = require('express');
var router = express.Router();
const bookingModel = require("C:/Users/vedant agnihotri/Desktop/Code/github desktop/hotel-booking/models/booking");

async function getAvailableRooms(checkInDate, checkOutDate) {
    try {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        console.log("Check-in Date:", checkIn);
        console.log("Check-out Date:", checkOut);

        // Find bookings that overlap with the specified date range
        const bookingsWithinRange = await bookingModel.find({
            $or: [
                { checkInDate: { $lte: checkOut }, checkOutDate: { $gte: checkIn } }, // Check for overlapping bookings
                { checkInDate: { $gte: checkIn, $lte: checkOut } }, // Check for bookings that start within the range
                { checkOutDate: { $gte: checkIn, $lte: checkOut } } // Check for bookings that end within the range
            ]
        });

        console.log("Bookings within range:", bookingsWithinRange);

        const bookedRoomIds = bookingsWithinRange.map(booking => booking.noOfRooms);

        console.log("Booked Room IDs:", bookedRoomIds);
        const bookedRoomsCount = bookedRoomIds.length;

        // Calculate the number of available rooms
        const totalRooms = 25;
        const availableRooms = totalRooms - bookedRoomsCount;

        return availableRooms;

    } catch (error) {
        console.error("Error fetching available rooms:", error);
        throw error;
    }
};

router.get("/", async(req, res)=>{
    res.render("room")
});

router.post("/checkAvailability", async (req, res)=>{
    const availableRooms = await getAvailableRooms(req.body.checkInDate, req.body.checkOutDate); 
    //res.render("room", { availableRooms });
    console.log(availableRooms);
});

module.exports = router;
