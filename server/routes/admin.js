const express = require("express");
const router = express.Router();
const User = require("../models/user_queries");
const { validateToken } = require("../middleware/auth");

router.post("/updateToEmployee", validateToken, async (req, res) => {
  //   console.log(req.locals);
  const { email } = res.locals;
  if (!email) return res.status(401).json({ error: "Invalid Token" });

  User.Passenger.updateToEmployee(email, (err, data) => {
    if (err) throw err;
    if (data.length === 0) return res.json({ error: "User does not exist" });
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
