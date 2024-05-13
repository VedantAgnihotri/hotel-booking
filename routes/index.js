var express = require('express');
var router = express.Router();
const userModel = require("C:/Users/vedant agnihotri/Desktop/Code/Backend/booking-prototype/models/user");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

router.post('/signup', function(req, res, next) {
   bcrypt.genSalt(10, function(err, salt) {
    const {name, email, password} = req.body;
    if (err) {
      console.error("Error generating salt:", err);
      return res.status(500).send("Internal Server Error");
    }
    bcrypt.hash(password, salt, async function(err, hash){
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("Internal Server Error");
      }

      try{
        const userCreated = await userModel.create({
          name,
          email,
          password: hash
        });
        const token = jwt.sign({ id: userCreated._id }, "secret");
        res.cookie("token", token);
        console.log("User created in database");

      }
      catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
      }
      //res.redirect("/home")
      res.send("user created")
    });
  });
});

router.post("/login", async(req, res)=>{
  let user = await userModel.findOne({email: req.body.email})
  if(!user){
    return res.status(404).send("email or password is wrong");
  };

  bcrypt.compare(req.body.password, user.password, function(err, result){
    if(err){throw err};
    if(result == false){
      return res.send("email or passowrd is wrong");
    };
    let token = jwt.sign({id: user._id}, "secret");
    res.cookie("token", token)
    // res.redirect("/home")
    res.send("login successful")
  })

})

module.exports = router;