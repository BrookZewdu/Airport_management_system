const express = require("express");
const router = express.Router();
const { City } = require("../models/city_queries");

router.post("/addCity", async (req, res) => {
  City.insertCity(req.body, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/allCities", async (req, res) => {
  City.getAllCities((err, data) => {
    if (err) throw err;
    if (data.length === 0) return res.json({ error: "No cities found" });
    //console.log(data);
    res.send(data);
  });
});

module.exports = router;
