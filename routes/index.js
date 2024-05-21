var express = require("express");
var router = express.Router();
const bookingModel = require("../models/booking");
const roomsModel = require("../models/rooms");

router.get("/booking", (req, res) => {
  res.render("booking");
});

router.post("/booking", async (req, res) => {
  const { name, age, checkInDate, checkOutDate, phoneNo, noOfRooms } = req.body;
  let bookingOfRoom = await bookingModel.create({
    name,
    age,
    phoneNo,
    checkInDate,
    checkOutDate,
    noOfRooms,
  });
  console.log(bookingOfRoom);

  let updatedRoomsDataWithBooking = await roomsModel.findOneAndUpdate(
    { type: "AC" },
    { $push: { currentBookings: bookingOfRoom } },
    { new: true }
  );

  const link = 'https://wa.me/919899622214?text=Name:'+name+'%0A'+'Age:'+age+'%0A'+"Phone Number:"+phoneNo+"%0A"+"Check in Date:"+checkInDate+"%0A"+"Check-out Date:"+checkOutDate+"%0A"+"Number of Rooms:"+noOfRooms;
  res.redirect(link);
});


module.exports = router;
