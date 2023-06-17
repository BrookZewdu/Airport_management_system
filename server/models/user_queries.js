const sql = require('../db');
const { v4: uuidv4 } = require('uuid');

const Passenger = function createPassenger(passenger) {
    let result = {};
    result.email = passenger.email;
    result.password = passenger.password;
    result.f_name = passenger.f_name;
    result.l_name = passenger.l_name;
    result.phone = passenger.phone;
    result.passport_number = passenger.passport_number;
    result.passport_expiration = passenger.passport_expiration;
    result.passport_country = passenger.passport_country;
    result.date_of_birth = passenger.date_of_birth;
    return result;
}

// const Staff = function createStaff(staff) {
//     let result = {}
//     result.username = staff.username;
//     result.password = staff.password;
//     result.airline_name = staff.airline_name;
//     result.fname = staff.fname;
//     result.lname = staff.lname;
//     return result
// }

Passenger.getPassengerInfo = (email, result) => {
     sql.query('SELECT * FROM passenger WHERE email=?', [email], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }

        result(null, res);
        //console.log("Customer: " + res);
    });
};

// Staff.getStaffInfo = (staff_username, result) => {
//     sql.query('SELECT * FROM Airline_Staff WHERE username=?', staff_username, (err,res) => {
//         if (err) {
//             console.log("Error: ", err);
//             result(null,err);
//             return;
//         }
//         //console.log("Airline Staff: " + res);
//         result(null,res);
//     });
// };

Passenger.insertCustomer = (passenger, result) => {
    const uniqueId = uuidv4();
    // console.log(passenger);
    sql.query('INSERT INTO passenger VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [passenger.email, uniqueId,  passenger.f_name, passenger.l_name,
            passenger.phone, passenger.passport_number, passenger.passport_expiration,
            passenger.passport_country, passenger.date_of_birth, passenger.password], (err,res) => {
            if (err) {
                console.log("Error: ", err);
                return;
            }
            console.log("Inserted Customer: " + res);
        });
};

// Staff.insertStaff = (staff, result) => {
//     sql.query('INSERT INTO airline_staff VALUES (?, ?, ?, ?, ?)', 
//         [staff.username, staff.password, staff.airline_name, staff.fname, staff.lname], (err,res) => {
//             if (err) {
//                 console.log("Error: ", err);
//                 //result(null,err);
//                 return;
//             }
//             console.log("Inserted Airline Staff: " + res);
//             //result(null,res);
//         });
// };

// module.exports = { Passenger, Staff }
module.exports = { Passenger }
