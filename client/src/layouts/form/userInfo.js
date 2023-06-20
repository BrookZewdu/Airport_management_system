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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import axios from "axiosInstance";
import AuthContext from "authContext";
import Spinner from "components/Spinner";

const theme = createTheme();

export default function UserInfo({ handleClose }) {
  const [dateVal, setDateVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [nameVal, setNameVal] = useState("");
  const [addressVal, setAddressVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("----------------", dateVal);

    const dateString = new Date(
      new Date(dateVal).getTime() -
        new Date(dateVal).getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    let data = new Object();
    data.f_name = nameVal.split(" ")[0];
    data.l_name = nameVal.split(" ")[1];
    data.email = emailVal;
    data.passenger_id = currentUser.passenger_id;
    data.passport_country = addressVal;
    data.passport_expiration = dateString;
    data.passport_number = currentUser.passport_number;
    // data.password = currentUser.password;
    // data.GENDER = genderVal;
    // data.PROFESSION = professionVal;
    // data.COUNTRY_CODE = countryCodeVal;
    data.phone = phoneVal;
    data.date_of_birth = dateString;

    if (Object.keys(data).length === 0) {
      console.log("NO CHANGE");
      setLoading(false);
      handleClose();
      return;
    }

    console.log(data);

    axios
      .post(`user/updateProfile`, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        // updateAuthData(true, {
        //   CUSTOMER_NAME: nameVal,
        //   EMAIL_ID: emailVal,
        //   GENDER: genderVal,
        //   PROFESSION: professionVal,
        //   COUNTRY_CODE: countryCodeVal,
        //   PHONE_NO: phoneVal,
        //   ADDRESS: addressVal,
        //   DOB: dateString,
        //   CUSTOMER_ID: currentUser.CUSTOMER_ID,
        //   ROLE: currentUser.ROLE,
        // });
        handleClose();
        axios.get("user/profile").then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          setNameVal(res.f_name + " " + currentUser.l_name);
          setEmailVal(res.email);
          setDateVal(res.date_of_birth);
          setPhoneVal(res.phone);
          setAddressVal(res.passport_country);
        });
        // window.location.replace("/user/profile");
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
        handleClose();
      });
  };

  useEffect(() => {
    console.log(currentUser);
    setNameVal(currentUser.f_name + " " + currentUser.l_name);
    setEmailVal(currentUser.email);
    setDateVal(currentUser.date_of_birth);
    setPhoneVal(currentUser.phone);
    setAddressVal(currentUser.passport_country);
  }, []);

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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  value={nameVal}
                  onChange={(e) => setNameVal(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    value={dateVal}
                    onChange={(newDate) => setDateVal(newDate)}
                    maxDate={new Date()}
                    label="Birth Date"
                    id="dob"
                    name="dob"
                    fullWidth
                    renderInput={(params) => (
                      <TextField fullWidth required {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  name="countryCode"
                  required
                  fullWidth
                  select
                  id="CountryCode"
                  label="Country Code"
                  value={countryCodeVal}
                  onChange={(e) => setCountryCodeVal(e.target.value)}
                >
                  {CountryCode.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.name + " (" + option.dial_code + ")"}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="contactNo"
                  required
                  fullWidth
                  id="contactNo"
                  label="Contact Number"
                  value={phoneVal}
                  onChange={(e) => setPhoneVal(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  multiline
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  value={addressVal}
                  onChange={(e) => setAddressVal(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="profession"
                  select
                  label="Profession"
                  value={professionVal}
                  onChange={(e) => setProfessionVal(e.target.value)}
                >
                  {[
                    { value: "OTHER", label: "Other" },
                    { value: "STUDENT", label: "Student" },
                    { value: "ARMYPERSONNEL", label: "Army Personnel" },
                    { value: "SENIORCITIZEN", label: "Senior Citizen" },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */}
            </Grid>
            {loading === true ? (
              <Spinner />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={handleSubmit}
              >
                SAVE CHANGES
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
