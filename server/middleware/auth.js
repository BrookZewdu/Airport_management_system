const { verify } = require("jsonwebtoken");
require("dotenv").config();

// const validateToken = (req, res, next) => {
//     const accessToken = req.header("accessToken");
//     if (!accessToken) return res.json({error: "Not logged in"});
//     try {
//         const secret = process.env.JWT_SECRET | "secret";
//         const validToken = verify(accessToken, secret);
//         req.user = validToken;
//         if (validToken) {
//             return next();
//         }
//     }
//     catch (err) {
//         return res.json({error: err});
//     }
// };
const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token !== null) {
    try {
      // console.log(process.env.JWT_SECRET);
      const payload = verify(token, process.env.JWT_SECRET);
      console.log(payload, "payload");
      res.locals = JSON.parse(JSON.stringify(payload));
      return next();
    } catch (error) {
      console.log(token);
      return res.status(403).json({ message: "Invalid Token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { validateToken };
