
const formattedFlights = [];

backendData.data.forEach(flight => {
  const numRows = Math.floor(flight.capacity / 4);

  const formattedFlight = {
    "FLIGHT_ID": flight.flight_code,
    "DEP_TS": flight.departure,
    "DELAYED_BY": "00:00:00", 
    "DURATION": `00:${flight.duration}:00`, 
    "ARR_TS": flight.arrival,
    "TICKET_PRICE": parseInt(flight.base_price),
    "FLIGHT_DATE_ID": null,
    "NUM_ROWS": numRows,
    "NUM_COLS": 4,
  };

  formattedFlights.push(formattedFlight);
});

const formattedData = {
  "status": "success",
  "data": formattedFlights
};

console.log(formattedData);