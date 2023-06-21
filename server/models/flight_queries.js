const sql = require("../db");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const { validateToken } = require("../middleware/auth");

// source, destination, departure, flight_type, arrival, airplane_id, base_price, duration, status
const Flight = function createFlight(flight) {
  let result = {};
  result.flight_code = uuidv4();
  result.source = flight.source;
  result.destination = flight.destination;
  result.departure =
    flight.departure_date.split(":")[0].split("T")[0] + " " + flight.departure;
  result.arrival =
    flight.departure_date.split(":")[0].split("T")[0] + " " + flight.arrival;
  // console.log(
  //   "moment_date",
  //   flight.departure_date,
  //   "hello",
  //   flight.arrival,
  //   moment(flight.departure_date + flight.arrival).format("YYYY-MM-DD HH:mm:ss")
  // );
  result.flight_type = flight.flight_type;

  // result.departure_date = flight.departure_date;
  // result.departure_time = flight.departure_time;
  // result.departure_city = flight.departure_airport_code;
  // result.arrival_date = flight.arrival_date;
  // result.arrival = moment(flight.arrival).format("YYYY-MM-DD HH:mm:ss");
  // result.arrival_time = flight.arrival_time;
  // result.arrival_city = flight.arrival_airport_code;
  result.airplane_id = flight.airplane_id;
  result.base_price = flight.base_price;
  result.duration = flight.duration;
  result.status = flight.status;
  return result;
};

Flight.Airport = function createAirport(airport) {
  let result = {};
  result.IATA_code = airport.IATA_code;
  result.airport_name = airport.airport_name;
  result.state = airport.state;
  result.country_name = airport.country_name;
  result.airport_id = uuidv4();
  return result;
};

Flight.Airplane = function createAirplane(airplane) {
  let result = {};
  result.airplane_id = uuidv4();
  result.model = airplane.model;
  result.range = parseFloat(airplane.range);
  result.capacity = parseInt(airplane.capacity);
  result.maintainance = parseInt(airplane.maintainance) || 0;
  result.status = airplane.status;
  result.airplane_name = airplane.airplane_name;
  return result;
};

Flight.Ticket = function createTicket(ticket) {
  let result = {};
  result.ticket_id = uuidv4();
  result.flight_code = ticket.flight_code;
  result.seat_number = ticket.seat_number;
  result.price = ticket.price;
  result.class = ticket.class;
  result.date_of_travel = ticket.date_of_travel;
  result.source = ticket.source;
  result.destination = ticket.destination;
  return result;
};

Flight.getAllFlights = (result) => {
  sql.query("call get_flight_schedule()", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    console.log("Flights: " + res);
    result(null, res);
  });
};

Flight.insertFlight = (flight, result) => {
  sql.query(
    "INSERT INTO flight_schedule VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?, ?)",
    [
      flight.flight_code,
      flight.source,
      flight.duration,
      flight.destination,
      flight.flight_type,
      flight.departure,
      flight.arrival,
      flight.status,
      flight.airplane_id,
      flight.base_price,
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      console.log("Inserted Flight: " + res);
      result(null, res);
    }
  );
};

Flight.insertAirport = (flight, result) => {
  sql.query(
    "INSERT INTO airport VALUES (?, ?, ?, ?, ?)",
    [
      flight.airport_name,
      flight.state,
      flight.country_name,
      flight.IATA_code,
      flight.airport_id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      console.log("Inserted Airport: " + res);
      result(null, res);
    }
  );
};

Flight.insertAirplane = (flight, result) => {
  sql.query(
    "INSERT INTO airplane VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      flight.airplane_id,
      flight.model,
      flight.range,
      flight.capacity,
      flight.maintainance,
      flight.status,
      flight.airplane_name,
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      console.log("Inserted Airplane: " + res);
      result(null, res);
    }
  );
};

Flight.getAllAirports = (result) => {
  sql.query("SELECT * FROM Airport", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    console.log("Airports: " + res);
    result(null, res);
  });
};

Flight.getAllAirlines = (result) => {
  sql.query("SELECT * FROM Airline", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    console.log("Airlines: " + res);
    result(null, res);
  });
};

Flight.getAllAirplanes = (result) => {
  sql.query("SELECT * FROM Airplane", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    console.log("Airplanes: " + res);
    result(null, res);
  });
};

Flight.getSeatsTaken = (flight, result) => {
  console.log(flight.flight_code);
  sql.query(
    "SELECT seat_number FROM tickets where flight_code = ?",
    [flight.flight_code],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Flight.bookFlight = (flight, passenger, result) => {
  const ticket_id = uuidv4();
  sql.query(
    "INSERT INTO tickets VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      ticket_id,
      flight.flight_code,
      flight.source,
      flight.price,
      flight.destination,
      flight.class || "Economy",
      flight.date_of_travel,
      flight.seat_number,
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        // result(null, err);
        return;
      }
      console.log("Inserted Ticket: " + res);
      // result(null, res);
    }
  );
  console.log("passenger_______", passenger);
  sql.query(
    "INSERT INTO passenger_books_and_cancels_tickets VALUES (?, ?)",
    [passenger, ticket_id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      console.log("Inserted Ticket: " + res);
      result(null, res);
    }
  );
};

Flight.cancelTicket = (ticket, result) => {
  sql.query(
    "DELETE FROM passenger_books_and_cancels_tickets WHERE ticket_id = ?",
    [ticket],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Deleted from passenger_books_and_cancels_tickets");
      // result(null, null);
    }
  );

  sql.query("DELETE FROM tickets WHERE ticket_id = ?", [ticket], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("Deleted from tickets");
    result(null, null);
  });
};

// Flight.getAirplanesOwnedByAirline = (airline_name, result) => {
//     sql.query('SELECT * FROM airplane WHERE airline_name=?',
//     [airline_name], (err,res) => {
//         if (err) {
//             console.log("Error: ", err);
//             result(null,err);
//             return;
//         }
//         //console.log("Airlines: " + res);
//         result(null,res);
//     });
// };

Flight.searchForFlight = (source_city, dest_city, dep_date, result) => {
  sql.query(
    "SELECT * FROM flight_schedule join airplane using (airplane_id) WHERE source = ? AND destination = ? AND departure >= ? order by departure",
    [source_city, dest_city, dep_date],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      console.log("Flights: " + res);
      result(null, res);
      console.log(res);
    }
  );
};

Flight.getUpcomingFlights = (passenger_id, result) => {
  console.log(passenger_id);
  sql.query(
    `SELECT 
        flight_code,
        airplane_id,
        fs.source, 
        duration, 
        fs.destination, 
        flight_type, 
        departure, 
        arrival, 
        model, 
        maintainance, 
        airplane_name, 
        tickets.ticket_id, 
        tickets.date_of_travel as booked_date, 
        tickets.price, seat_number, 
        source_airport.country_name as src_country_name, 
        destination_airport.country_name as dst_country_name, 
        source_airport.airport_name as src_airport, 
        source_airport.IATA_code as srcIATA_code, 
        destination_airport.IATA_code as dstIATA_code, 
        destination_airport.airport_name as dst_airport
      FROM flight_schedule fs 
      join airplane using (airplane_id) 
      join tickets using (flight_code) 
      join passenger_books_and_cancels_tickets bcf on bcf.ticket_id = tickets.ticket_id
      left join airport as source_airport on source_airport.state = fs.source 
      left join airport as destination_airport on destination_airport.state = fs.destination 
      WHERE bcf.passenger_id = ? AND departure >= ? order by departure`,
    [passenger_id, new Date()],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      console.log("Flights: " + res);
      result(null, res);
      // console.log(res);
    }
  );
};

// Flight.searchFutureFlight = (source_city, dest_city, dep_date, result) => {
//     sql.query('SELECT * FROM Flight WHERE departure_airport_code = ? AND arrival_airport_code = ? AND departure_date > (SELECT CURDATE()) AND departure_date = ?',
//     [source_city, dest_city, dep_date], (err,res) => {
//         if (err) {
//             console.log("Error: ", err);
//             result(null,err);
//             return;
//         }
//         console.log("Flights: " + res);
//         result(null,res);
//     });
// };

// Flight.searchReturnFlight = (source_city, dest_city, dep_date, ret_date, result) => {
//     sql.query('SELECT * FROM Flight WHERE departure_airport_code = ? AND arrival_airport_code = ? AND arrival_date > ? AND arrival_date = ?',
//     [source_city, dest_city, dep_date, ret_date], (err,res) => {
//         if (err) {
//             console.log("Error: ", err);
//             result(null,err);
//             return;
//         }
//         console.log("Return Flights: " + res);
//         result(null,res);
//     });
// };

// Flight.getAirlineFlight = (airline_name, result) => {
//     sql.query('SELECT * FROM Flight WHERE airline_name = ? AND departure_date BETWEEN CURRENT_DATE() AND DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY)', [airline_name], (err,res) => {
//         if (err) {
//             console.log("Error: ", err);
//             result(null,err);
//             return;
//         }
//         //console.log(airline_name + " Flights: " + res);
//         result(null,res);
//     });
// };

// Flight.searchAirlineFlight = (airline_name, source_city, dest_city, dateA, dateB, result) => {
//     sql.query('SELECT * FROM Flight WHERE airline_name = ? AND departure_airport_code = ? AND arrival_airport_code = ? AND (departure_date BETWEEN ? AND ?)',
//     [airline_name, source_city, dest_city, dateA, dateB], (err,res) => {
//         if (err) {
//             result(null,err);
//             return;
//         }
//         console.log("Searched Airline Flights: " + res);
//         result(null,res);
//     });
// }

// Flight.getFlightStatus = (al_name, flight_num, dep_date, arr_date, result) => {
//     sql.query('SELECT airline_name, flight_number, status FROM Flight WHERE airline_name = ? AND flight_number = ? AND departure_date = ? AND arrival_date = ?',
//     [al_name, flight_num, dep_date, arr_date], (err,res) => {
//         if (err) {
//             console.log("Error: ", err);
//             result(null,err);
//             return;
//         }
//         console.log("Flights: " + res);
//         result(null,res);
//     });
// };

// Flight.updateFlightStatus = (al_name, flight_num, dep_date, dep_time, new_status, result) => {
//     sql.query('UPDATE flight SET status=? WHERE airline_name=? AND flight_number=? AND departure_date=? AND departure_time=?',
//     [new_status, al_name, flight_num, dep_date, dep_time], (err,res) => {
//         if (err) {
//             console.log("Error: ", err);
//             result(null,err);
//             return;
//         }
//         console.log(res.affectedRows + " record(s) updated");
//         console.log("Updated Flight: " + res);
//         result(null,res);
//     });
// };

// Flight.insertAirplane = (airplane_id, airline_name, num_seats, manufacturing_company, age, result) => {
//     sql.query('INSERT INTO Airplane VALUES (?, ?, ?, ?, ?)', [airplane_id, airline_name, num_seats,
//     manufacturing_company, age], (err,res) => {
//         if (err) {
//             console.log("Error: ", err);
//             result(null,err);
//             return;
//         }
//         console.log("Inserted Airplane: " + res);
//         result(null,res);
//     });
// };

// Flight.insertAirport = (airport_code, name, city, country, airport_type, result) => {
//     sql.query('INSERT INTO Airport VALUES (?, ?, ?, ?, ?)', [airport_code, name, city, country, airport_type],
//     (err,res) => {
//         if (err) {
//             console.log("Error: ", err);
//             result(null,err);
//             return;
//         }
//         console.log("Inserted Airport: " + res);
//         result(null,res);
//     });
// };

module.exports = { Flight };
