const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user_queries");
const { sign } = require("jsonwebtoken");
const { validateToken } = require('../middleware/auth')
require('dotenv').config();

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    await User.Passenger.getPassengerInfo(email, (err,data) => {
        if (err) throw err;
        if (data.length === 0) res.json({error: "User does not exist"});
        else {
            console.log(data);
            console.log(data[0].password);
            bcrypt.compare(password, data[0].password).then((match) => {
                console.log({ error: "Checking password"});
                if (!match) {
                    console.log("did not match");
                    res.json({ error: "Wrong Username And Password Combination" });
                    return;
                }
                console.log("Matched!");
                const secret = process.env.JWT_SECRET || "secret";
                const accessToken = sign({email_address: data[0].email_address}, secret);
                console.log(data);
                res.json({
                    status: "success",
                    token : accessToken,
                    data : {
                        user : data[0]
                    }
                });
                /*
                {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiZW5pIiwiaWF0IjoxNjg3MDA3ODk3LCJleHAiOjE2ODcwOTQyOTd9.ZTaZtuDOTjCC3FDbI7a0t0lquEZw1x5pZEN_itLpOVo",
    "data": {
        "user": {
            "CUSTOMER_ID": "abeni",
            "PASSWORD": "$2a$10$CZVoQRBTtrI.4wR9Ke9wd.nVYqBkhSkuxyfNqNmON1hrleiRpaZ22",
            "EMAIL_ID": "abeni@gmail.com",
            "CUSTOMER_NAME": "Abeni abeni",
            "GENDER": "M",
            "DOB": "2011-06-16T21:00:00.000Z",
            "ROLE": "N",
            "PROFESSION": "STUDENT",
            "COUNTRY_CODE": "ET",
            "PHONE_NO": "0922006222",
            "ADDRESS": "Belay zeleke rd"
        }
    }
}
                */
            });
        }
    });
});

// router.post("/staff", async(req,res) => {
//     const { username, password } = req.body;
//     User.Staff.getStaffInfo(username, (err,data) => {
//         if (err) throw err;
//         if (data.length == 0) res.json({error: "User does not exist"});
//         else {
//             bcrypt.compare(password, data[0].password).then((match) => {
//                 if (!match) {
//                     res.json({ error: "Wrong Username And Password Combination" });
//                     return;
//                 }
//                 const accessToken = sign({staff: data[0]}, "secret");
//                 res.json(accessToken);
//             });
//         }
//     });
// });

router.get('/auth', validateToken, (req,res) => {
    res.json(req.user);
});

module.exports = router;