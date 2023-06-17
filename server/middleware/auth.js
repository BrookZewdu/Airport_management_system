const { verify } = require("jsonwebtoken");
require('dotenv').config();

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if (!accessToken) return res.json({error: "Not logged in"});
    try {
        const secret = process.env.JWT_SECRET | "secret";
        const validToken = verify(accessToken, secret);
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } 
    catch (err) {
        return res.json({error: err});
    }
};

module.exports = { validateToken }