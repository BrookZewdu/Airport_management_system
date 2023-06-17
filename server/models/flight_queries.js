const sql = require('../db');
const { v4: uuidv4 } = require('uuid');


const Flight = function createFlight(flight) {
    let result = {};
    result.airline_name = flight.airline_name || "Ethiopian Airlines";
    result.flight_code = flight.flight_code;
    result.departure = moment(`${flight.departure_date} ${flight_departure_time}`).format('YYYY-MM-DD HH:mm:ss');
    // result.departure_date = flight.departure_date;
    // result.departure_time = flight.departure_time;
    result.departure_city = flight.departure_airport_code;
    result.arrival_date = flight.arrival_date;
    result.arrival = moment(`${flight.arrival_date} ${flight.arrival_time}`).format('YYYY-MM-DD HH:mm:ss');
    // result.arrival_time = flight.arrival_time;
    // result.arrival_city = flight.arrival_airport_code;
    result.airplane_id = fligfht.airplane_id;
    result.base_price = flight.base_price;
    result.duration = flight.duration;
    result.status = flight.status;
    return result;
};

Flight.Airport = function createAirport(airport) {
    let result = {};
    result.airport_name = airport.airport_name;
    result.state = airport.state;
    result.country_name = airport.country_name;
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

Flight.getAllFlights = (result) => {
    sql.query('call get_flight_schedule(curdate())', (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Flights: " + res);
        result(null,res);
    });
};

Flight.insertFlight = (flight, result) => {
    sql.query('INSERT INTO flight_schedule VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?)',
    [flight.flight_code, flight.departure_city, flight.duration, flight.destination_city,
    flight.flight_type, flight.departure, flight.arrival,
    flight.status, flight.airplane_id], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Inserted Flight: " + res);
        result(null,res);
    });
};

Flight.insertAirport = (flight, result) => {
    sql.query('INSERT INTO airport VALUES (?, ?, ?)',
    [flight.airport_name, flight.state, flight.country_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Inserted Airport: " + res);
        result(null,res);
    });
}

Flight.insertAirplane = (flight, result) => {
    sql.query('INSERT INTO airplane VALUES (?, ?, ?, ?, ?, ?, ?)',
    [flight.airplane_id, flight.model, flight.range, flight.capacity, flight.maintainance, flight.status, flight.airplane_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Inserted Airplane: " + res);
        result(null,res);
    });
}

Flight.getAllAirports = (result) => {
    sql.query('SELECT * FROM Airport', (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Airports: " + res);
        result(null,res);
    });
};

Flight.getAllAirlines = (result) => {
    sql.query('SELECT * FROM Airline', (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Airlines: " + res);
        result(null,res);
    });
};

Flight.getAllAirplanes = (result) => {
    sql.query('SELECT * FROM Airplane', (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Airplanes: " + res);
        result(null,res);
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

// Flight.searchForFlight = (source_city, dest_city, dep_date, result) => {
//     sql.query('SELECT * FROM Flight WHERE departure_airport_code = ? AND arrival_airport_code = ? AND departure_date = ?', 
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

module.exports = { Flight }

