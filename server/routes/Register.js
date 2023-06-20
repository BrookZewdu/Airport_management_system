const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user_queries");

router.post("/passenger", async (req, res) => {
  // console.log(req.body);
  // console.log('hello world');

  User.Passenger.getPassengerInfo(req.body.email, (err, data) => {
    if (err) throw err;
    if (data.length !== 0) res.json({ error: "User already exists" });
    return;
  });

  req.body.password = await bcrypt.hash(req.body.password, 10);
  const passenger = User.Passenger(req.body);
  User.Passenger.insertCustomer(passenger);
  res.json("success");
});

// router.post("/staff", async (req,res) => {
//     console.log(req.body);
//     User.Staff.getStaffInfo(req.body.username, (err,data) => {
//         if (err) throw err;
//         if (data.length !== 0) res.json({error: "Airline Staff Member already exists"});
//         return;
//     });
//     req.body.password = await bcrypt.hash(req.body.password, 10);
//     const staff = User.Staff(req.body);
//     User.Staff.insertStaff(staff);
//     res.json("success");
// });

module.exports = router;
