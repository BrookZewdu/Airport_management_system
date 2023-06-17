const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "Airport_Management_system", 
    port: 3306,
});
// console.log(process.env.MYSQL_PASSWORD);
connection.getConnection(function(err) {
    if (err) {
        console.error("Connection err: " + err.stack);
        return;
    }
    console.log("Connected to MySQL");
})

module.exports = connection;
