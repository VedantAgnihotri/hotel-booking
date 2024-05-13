var express = require('express');
var router = express.Router();
const bookingModel = require("C:/Users/vedant agnihotri/Desktop/Code/github desktop/hotel-booking/models/booking");
const roomsModel = require("C:/Users/vedant agnihotri/Desktop/Code/github desktop/hotel-booking/models/rooms");

router.get("/", (req, res)=>{
    res.render("booking")
})

router.post("/", async(req, res)=>{
    const{name, age, checkInDate, checkOutDate, phoneNo, noOfRooms} = req.body
    let bookingOfRoom = await bookingModel.create({
        name,
        age,
        phoneNo,
        checkInDate,
        checkOutDate,
        noOfRooms
    });
    console.log(bookingOfRoom);
    res.redirect("/")

    let newRoomsData =  await roomsModel.findOneAndUpdate(
      {"type": "Non-AC"},
      {$push: {currentBookings: bookingOfRoom} }
    );
})

module.exports = router;