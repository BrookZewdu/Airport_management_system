import React, { useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CountryCode from "layouts/form/data/countryCode.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axiosInstance";
import Spinner from "components/Spinner";
import { getLinearProgressUtilityClass } from "@mui/material";

const theme = createTheme();

export default function FlightPath({ addNewFlightPath, handleClose }) {
  const [airports, setAirports] = useState([]);
  const [flightId, setFlightId] = useState("");
  const [srcId, setSrcId] = useState("");
  const [destId, setDestId] = useState("");
  const [deptTime, setDeptTime] = useState(null);
  const [arrTime, setArrTime] = useState(null);
  const [baseFare, setBaseFare] = useState(null);
  const [durHour, setDurHour] = useState("");
  const [durMin, setDurMin] = useState("");
  const [rows, setRows] = useState(null);
  const [cols, setCols] = useState(null);
  const [departureDate, setdepartureDate] = useState(null);
  const [flight_type, setflight_type] = useState(() => []);
  const [loading, setLoading] = useState(false);

  const handleflight_type = (event, newflight_type) => {
    setflight_type(newflight_type);
  };

  const getAirports = () => {
    axios
      .get(`flights/allAirports`)
      .then((res) => {
        console.log("aiports", res);
        console.log("data.data: ", res.data);
        console.log(res.data.map((e) => e.state));
        setAirports(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAirports();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("week: ", flight_type);
    // let days_string = "";
    // const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // weekNames.forEach((day) => {
    //   if (flight_type.includes(day)) days_string += "1";
    //   else days_string += "0";
    // });

    // const departureDateString = new Date(
    //   new Date(departureDate).getTime() -
    //     new Date(departureDate).getTimezoneOffset() * 60000
    // )
    //   .toISOString()
    //   .split("T")[0];

    const dt = new Date(deptTime);

    const deptTimeString = `${
      (dt.getUTCHours() + 3) % 24
    }:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const at = new Date(arrTime);
    const arrTimeString = `${
      (at.getUTCHours() + 3) % 24
    }:${at.getUTCMinutes()}:${at.getUTCSeconds()}`;

    console.log("abeni", deptTimeString, arrTimeString);
    /**
 *   flight.flight_code,
      flight.source,
      flight.duration,
      flight.destination,
      flight.flight_type,
      flight.departure,
      flight.arrival,
      flight.status,
      flight.airplane_id,
      flight.base_price,
 */
    const flight = {
      source: srcId,
      duration: durMin,
      destination: destId,
      flight_type: flight_type[0],
      departure: deptTimeString,
      arrival: arrTimeString,
      status: "A",
      airplane_id: flightId,
      base_price: baseFare,
      departure_date: departureDate,
    };

    const data = {};
    axios
      .post(`flights/addFlight`, flight)
      .then((res) => {
        console.log("posted flight; ", res.data);
        setLoading(false);
        addNewFlightPath(flight);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        handleClose();
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid
              container
              spacing={3}
              display="flex"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="flightID"
                  label="Airplane ID"
                  value={flightId}
                  onChange={(e) => setFlightId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={airports}
                  groupBy={(option) => option.COUNTRY}
                  getOptionLabel={(option) => option.state}
                  onChange={(event, value) => {
                    setSrcId(value.state);
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      id="source"
                      label="Source"
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={airports}
                  groupBy={(option) => option.COUNTRY}
                  getOptionLabel={(option) => option.state}
                  onChange={(event, value) => {
                    setDestId(value.state);
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      id="destination"
                      label="Destination"
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    value={deptTime}
                    onChange={(newTime) => {
                      setDeptTime(newTime);
                    }}
                    label="Departure Time"
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        id="departureTime"
                        label="Departure Time"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    value={arrTime}
                    onChange={(newTime) => {
                      setArrTime(newTime);
                    }}
                    label="Arrival Time"
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        id="arrivalTime"
                        label="Arrival Time"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="baseFare"
                  required
                  fullWidth
                  id="baseFare"
                  label="Base Fare"
                  type="number"
                  value={baseFare}
                  onChange={(e) => setBaseFare(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: -1.8 }}>
                <Typography> Duration </Typography>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="hour"
                  label="Hour"
                  type="number"
                  value={durHour}
                  onChange={(e) => setDurHour(e.target.value)}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="minutes"
                  required
                  fullWidth
                  id="minutes"
                  label="Minutes"
                  type="number"
                  value={durMin}
                  onChange={(e) => setDurMin(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12} sx={{ mb: -1.8 }}>
                <Typography> Capacity </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="rows"
                  label="Rows"
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(e.target.value)}
                />
              </Grid> */}
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  name="minutes"
                  required
                  fullWidth
                  id="columns"
                  label="Columns"
                  type="number"
                  value={cols}
                  onChange={(e) => setCols(e.target.value)}
                />
              </Grid> */}
              <Grid item xs={12} sx={{ mb: -1.8 }}>
                <Typography> Flight Class </Typography>
              </Grid>
              <Grid item xs={12}>
                <ToggleButtonGroup
                  value={flight_type}
                  onChange={handleflight_type}
                  aria-label="flight_type"
                >
                  <ToggleButton
                    sx={{ width: "150px" }}
                    value="Economy"
                    aria-label="Economy"
                    color="primary"
                  >
                    Economy
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "150px" }}
                    value="Business"
                    aria-label="Business"
                    color="primary"
                  >
                    Business
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    value={departureDate}
                    onChange={(newDate) => setdepartureDate(newDate)}
                    minDate={new Date()}
                    label="Departure Date"
                    id="dob"
                    name="dob"
                    fullWidth
                    renderInput={(params) => (
                      <TextField fullWidth required {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            {loading === true ? (
              <Spinner />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                ADD FLIGHT
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
