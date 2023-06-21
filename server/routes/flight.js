const express = require("express");
const router = express.Router();
const { Flight } = require("../models/flight_queries");
const { Passenger } = require("../models/user_queries");
const { validateToken } = require("../middleware/auth");

router.get("/allFlights", validateToken, async (req, res) => {
  // console.log('hello', Flight);
  Flight.getAllFlights((err, data) => {
    if (err) throw err;
    if (data.length === 0) return res.json({ error: "No flights found" });
    //console.log(data);
    res.send(data);
  });
});

router.get("/seatsTaken/:flight_code", async (req, res) => {
  Flight.getSeatsTaken(req.params, (err, data) => {
    if (err) throw err;
    if (data.length === 0)
      return res.json({ status: "No seats found", data: [] });

    const seatsTaken = data.map((seat) => seat.seat_number);

    res.status(200).json({
      status: "success",
      data: seatsTaken,
    });
  });
});

router.post("/addFlight", async (req, res) => {
  const flight = Flight(req.body);
  Flight.insertFlight(flight, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

router.post("/addAirplane", async (req, res) => {
  const airplane = Flight.Airplane(req.body);
  Flight.insertAirplane(airplane, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/allAirplanes", async (req, res) => {
  Flight.getAllAirplanes((err, data) => {
    if (err) throw err;
    if (data.length === 0) return res.json({ error: "No airplanes found" });
    res.send(data);
  });
});

router.post("/addAirport", async (req, res) => {
  const airport = Flight.Airport(req.body);
  Flight.insertAirport(airport, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/allAirports", async (req, res) => {
  Flight.getAllAirports((err, data) => {
    if (err) throw err;
    if (data.length === 0) return res.json({ error: "No airports found" });
    res.send(data);
  });
});

router.get(
  "/searchFlights/:source_city/:dest_city/:dep_date",
  async (req, res) => {
    Flight.searchForFlight(
      req.params.source_city,
      req.params.dest_city,
      req.params.dep_date,
      (err, data) => {
        if (err) throw err;
        res.status(200).json({
          status: "success",
          data: data,
        });
      }
    );
  }
);

router.post("/bookFlight", validateToken, async (req, res) => {
  console.log(
    res.locals.id,
    typeof res.locals.id,
    "*********************locals"
  );
  Passenger.getPassengerInfo(res.locals.email, (err, data) => {
    if (err) throw err;
    if (data.length === 0) res.json({ error: "User does not exist" });
    const passenger = Passenger(data[0]);
    Flight.bookFlight(req.body, res.locals.id, (err, data) => {
      if (err) throw err;
      res.status(200).json({
        status: "success",
        data: data,
      });
    });
  });
});

router.get("/getUpcomingFlights", validateToken, async (req, res) => {
  console.log("=================", res.locals, "locals");
  Flight.getUpcomingFlights(res.locals.id, (err, data) => {
    if (err) throw err;
    if (data.length === 0)
      return res.json({ status: "No upcoming flights", data: [] });
    res.status(200).json({
      status: "success",
      data: data,
    });
  });
});

router.post("/cancelFlight/:ticketId", validateToken, async (req, res) => {
  const ticket = req.params.ticketId;
  Flight.cancelTicket(ticket, (err, data) => {
    if (err) throw err;
    if (data === null) {
      res.json({ status: "Ticket Deleted", data: [] });
      return; // Stop execution here
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  });
});

// router.get("/searchFutureFlights/:source_city/:dest_city/:dep_date", async(req,res) => {
//     Flight.searchFutureFlight(req.params.source_city, req.params.dest_city, req.params.dep_date, (err,data) => {
//         if(err) throw err;
//         res.send(data);
//     });
// });

// router.get("/searchReturnFlights/:source_city/:dest_city/:dep_date/:ret_date", async(req,res) => {
//     Flight.searchReturnFlight(req.params.source_city, req.params.dest_city, req.params.dep_date, req.params.ret_date, (err,data) => {
//         if(err) throw err;
//         res.send(data);
//     });
// });

// router.get("/getStatus/:al_name/:flight_num/:dep_date/:arr_date", async(req,res) => {
//     Flight.getFlightStatus(req.params.al_name, req.params.flight_num, req.params.dep_date, req.params.dep_date, (err,data) => {
//         if (err) throw err;
//         res.send(data);
//     });
// });

module.exports = router;
