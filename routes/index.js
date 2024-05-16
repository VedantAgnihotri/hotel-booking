var express = require('express');
var router = express.Router();
const bookingModel = require("C:/Users/vedant agnihotri/Desktop/Code/github desktop/hotel-booking/models/booking");
const roomsModel = require("C:/Users/vedant agnihotri/Desktop/Code/github desktop/hotel-booking/models/rooms");

router.get("/booking", (req, res)=>{
    res.render("booking");
});

router.post("/booking", async(req, res)=>{
    const{name, age, checkInDate, checkOutDate, phoneNo, noOfRooms} = req.body;
    let bookingOfRoom = await bookingModel.create({
        name,
        age,
        phoneNo,
        checkInDate,
        checkOutDate,
        noOfRooms
    });
    console.log(bookingOfRoom);
    
    let roomType = "Non-AC";
    let roomsData = await roomsModel.findOne({"type": roomType});
    let newMaxCount = roomsData.maxcount - noOfRooms;

    let updatedRoomsData = await roomsModel.findOneAndUpdate(
        {"type": roomType},
        {$set: {maxcount: newMaxCount}},
        {new: true}
    );
    let updatedRoomsDataWithBooking = await roomsModel.findOneAndUpdate(
        {"type": roomType},
        {$push: {currentBookings: bookingOfRoom}},
        {new: true}
    );

    res.redirect("/booking");
});

module.exports = router;