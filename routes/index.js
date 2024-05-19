var express = require("express");
var router = express.Router();
const emailjs = import("emailjs")
const bookingModel = require("C:/Users/vedant agnihotri/Desktop/Code/github desktop/hotel-booking/models/booking");
const roomsModel = require("C:/Users/vedant agnihotri/Desktop/Code/github desktop/hotel-booking/models/rooms");

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

  const templateParams = {
    name: bookingOfRoom.name,
    age: bookingOfRoom.age,
    phoneNo: bookingOfRoom.phoneNo,
    checkOutDate: bookingOfRoom.checkOutDate,
    checkOutDate: bookingOfRoom.checkOutDate,
    noOfRooms: bookingOfRoom.noOfRooms
  };

  
  emailjs.send("service_6csr6ul", "template_k8lqbos", templateParams, {
      publicKey: "lHLUIDEgLJ8_QNjvU",
      privateKey: "y0rjAY-OmnZrC7DnDikax",
    })
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (err) => {
        console.log("FAILED...", err);
      }
    );

  res.redirect("/confirmation/" + bookingOfRoom._id);
  //const link = 'https://wa.me/919899622214?text=Name:'+name+'%0A'+'Age:'+age+'%0A'+"Phone Number:"+phoneNo+"%0A"+"Check in Date:"+checkInDate+"%0A"+"Check-out Date:"+checkOutDate+"%0A"+"Number of Rooms:"+noOfRooms;
  //res.redirect(link);
});

router.get("/confirmation/:id", async (req, res) => {
  const bookingData = await bookingModel.findById(req.params.id);
  res.render("confirm", { bookingData: [bookingData] });
});

module.exports = router;
