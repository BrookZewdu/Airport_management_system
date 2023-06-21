const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user_queries");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/auth");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  await User.Passenger.getPassengerInfo(email, (err, data) => {
    if (err) throw err;
    if (data.length === 0) res.json({ error: "User does not exist" });
    else {
      // console.log(data);
      // console.log(data[0].password);

      bcrypt.compare(password, data[0].password).then((match) => {
        console.log({ error: "Checking password" });

        if (!match) {
          console.log("did not match");
          res.json({ error: "Wrong Username And Password Combination" });
          return;
        }

        console.log("Matched!");
        const secret = process.env.JWT_SECRET || "secret";
        const accessToken = sign(
          { id: data[0].passenger_id, email: data[0].email },
          secret
        );

        const hold = data[0];
        User.Passenger.isEmployee(email, (err, data) => {
          // console.log("what", data);
          res.json({
            status: "success",
            token: accessToken,
            data: {
              user: { ...hold, ROLE: data ? "W" : undefined },
            },
          });
        });
      });
    }
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
