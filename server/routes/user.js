const express = require("express");
const router = express.Router();
const User = require("../models/user_queries");
const { validateToken } = require("../middleware/auth");
const { Passenger } = require("../models/user_queries");

router.get("/profile", validateToken, async (req, res) => {
  console.log(req.locals);
  const { email } = res.locals;
  if (!email) return res.status(401).json({ error: "Invalid Token" });

  User.Passenger.getPassengerInfo(email, (err, data) => {
    if (err) throw err;
    if (data.length === 0) res.json({ error: "User does not exist" });
    else {
      console.log(data);
      console.log(data[0].password);

      console.log(data);
      res.json({
        status: "success",
        data: {
          user: data[0],
        },
      });
    }
  });
});

router.post("/updateProfile", validateToken, async (req, res) => {
  const { email } = res.locals;
  if (!email) return res.status(401).json({ error: "Invalid Token" });
  await User.Passenger.updatePassenger(req.body, (err, data) => {
    if (err) throw err;
    else {
      res.json({
        status: "success",
        data: {
          user: data[0],
        },
      });
    }
  });
});

module.exports = router;
