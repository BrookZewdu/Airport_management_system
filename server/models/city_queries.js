const sql = require('../db');

const City = function createCity(city) {
    let result = {};
    result.city_name = city.city_name;
    return result;
};

City.insertCity = (city, result) => {
    sql.query('INSERT INTO city VALUES (?, ?, ?)',
    [city.country_name, city.state, city.city_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            //result(null,err);
            return;
        }
        console.log("Inserted City: " + res);
        result(null,res);
    });
};

City.getAllCities = (result) => {
    sql.query('SELECT * FROM city', (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Cities: " + res);
        result(null,res);
    });
};

module.exports = { City }

