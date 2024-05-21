var express = require('express');
var router = express.Router();
const bookingModel = require("../models/booking");

async function getAvailableRooms(checkInDate, checkOutDate) {
    try {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        console.log("Check-in Date:", checkIn);
        console.log("Check-out Date:", checkOut);

        const bookingsWithinRange = await bookingModel.find({
            $or: [
                { checkInDate: { $lte: checkOut }, checkOutDate: { $gte: checkIn } }, 
                { checkInDate: { $gte: checkIn, $lte: checkOut } }, 
                { checkOutDate: { $gte: checkIn, $lte: checkOut } } 
            ]
        });


        const bookedRoomIds = bookingsWithinRange.map(booking => booking.noOfRooms);

        let bookedRoomsCount = 0
        for (let i = 0; i < bookedRoomIds.length; i++) {
            bookedRoomsCount += bookedRoomIds[i];
        }
        
        const totalRooms = 25;
        const availableRooms = totalRooms - bookedRoomsCount;

        return availableRooms;

    } catch (error) {
        console.error("Error fetching available rooms:", error);
        throw error;
    }
};

router.get("/", async(req, res)=>{
   let availableRooms = "dd";
    res.render("AvailableRoom", {availableRooms})
});

router.post("/checkAvailability", async (req, res)=>{
    const availableRooms = await getAvailableRooms(req.body.checkInDate, req.body.checkOutDate);
    res.render("AvailableRoom", { availableRooms });
});

module.exports = router;
