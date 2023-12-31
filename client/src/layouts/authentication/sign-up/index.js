import { Link, Navigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Grid,
  Box,
  Container,
  MenuItem,
  CssBaseline,
  Card,
  TextField,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/sign-in/2.jpg";
import CountryCode from "layouts/form/data/countryCode.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axiosInstance";
import AuthContext from "authContext";
import Spinner from "components/Spinner";

function Cover() {
  const [gender, setGender] = React.useState("M");
  const [countryCode, setCountryCode] = React.useState("IN");
  const [dateValue, setDateValue] = React.useState(new Date());
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [nameVal, setNameVal] = useState("");
  const [firstNameVal, setfirstNameVal] = useState("");
  const [lastnameVal, setLastnameVal] = useState("");
  const [addressVal, setAddressVal] = useState("");
  const [professionVal, setProfessionVal] = useState("OTHER");
  const [roleVal, setRoleVal] = useState("N");
  const [phoneVal, setPhoneVal] = useState("");
  const { authenticated, updateAuthData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [passPortVal, setPassportNumber] = useState("");
  const [passExpDateValue, setPassportExpDateValue] = useState(new Date());
  // const [error, setError] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    axios
      .post(`/register/passenger`, {
        email: emailVal,
        password: passVal,
        f_name: firstNameVal,
        l_name: lastnameVal,
        phone: phoneVal,
        passport_number: passPortVal,
        passport_expiration: passExpDateValue,
        passport_country: addressVal,
        date_of_birth: dateValue,
        // CUSTOMER_ID: firstNameVal,
        // CNAME: nameVal,
        // f_name: firstNameVal,
        // l_name: lastnameVal,
        // email: emailVal,
        // PASSWORD: passVal,
        // GENDER: gender,
        // DOB: dateValue,
        // ROLE: roleVal,
        // PROFESSION: professionVal,
        // COUNTRY_CODE: countryCode,
        // PHONE_NO: phoneVal,
        // ADDRESS: addressVal,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
        updateAuthData(
          true,
          res.data.data.user,
          res.data.data.user.ROLE === "W" || res.data.data.user.ROLE === "R",
          res.data.data.user.ROLE === "W"
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDateChange = (newDate) => {
    setDateValue(newDate);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRoleVal(event.target.value);
  };

  // const handleSubmit = () => {};

  return (
    <>
      {authenticated === false ? (
        <BasicLayout image={bgImage}>
          <Card sx={{ marginTop: 8 }}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Sign Up
              </MDTypography>
            </MDBox>
            <Box pt={4} pb={0} px={3}>
              <Box component="form" role="form">
                <Grid
                  container
                  spacing={2}
                  sx={{ maxHeight: "50vh", overflowY: "scroll" }}
                >
                  <Grid item xs={12} sm={6}>
                    <MDInput
                      // autoComplete="given-name"
                      name="firstname"
                      required
                      fullWidth
                      id="name"
                      label="firstName"
                      autoFocus
                      value={firstNameVal}
                      onChange={(e) => setfirstNameVal(e.target.value)}
                    />
                  </Grid>{" "}
                  <Grid item xs={12} sm={6}>
                    <MDInput
                      // autoComplete="given-name"
                      name="lastname"
                      required
                      fullWidth
                      id="name"
                      label="Lastname"
                      autoFocus
                      value={lastnameVal}
                      onChange={(e) => setLastnameVal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDInput
                      // autoComplete="given-name"
                      name="password"
                      required
                      fullWidth
                      id="name"
                      label="Password"
                      type="password"
                      value={passVal}
                      onChange={(e) => setPassVal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        // label="Date of Journey"
                        inputFormat="dd/MM/yyyy"
                        value={dateValue}
                        onChange={handleDateChange}
                        maxDate={new Date()}
                        // defaultValue={dateValue}
                        label="Birth Date"
                        id="dob"
                        name="dob"
                        // fullWidth
                        renderInput={(params) => (
                          <MDInput fullWidth required {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
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
                  {/* passport_number */}
                  <Grid item xs={12} sm={6}>
                    <MDInput
                      // autoComplete="given-name"
                      name="passport_number"
                      required
                      fullWidth
                      id="passport_number"
                      label="Passport Number"
                      autoFocus
                      value={passPortVal}
                      onChange={(e) => setPassportNumber(e.target.value)}
                    />
                  </Grid>
                  {/* passport_expiration */}
                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        value={passExpDateValue}
                        onChange={handleDateChange}
                        maxDate={new Date()}
                        // defaultValue={dateValue}
                        label="Passport Expiration"
                        id="passport_expiration"
                        name="passport_expiration"
                        // fullWidth
                        renderInput={(params) => (
                          <MDInput fullWidth required {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <MDInput
                      name="contactNo"
                      required
                      fullWidth
                      id="contactNo"
                      label="Contact Number"
                      value={phoneVal}
                      onChange={(e) => setPhoneVal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <MDInput
                      multiline
                      required
                      fullWidth
                      name="address"
                      label="Country"
                      id="address"
                      value={addressVal}
                      onChange={(e) => setAddressVal(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color={loading ? "disabled" : "info"}
                    disabled={loading}
                    fullWidth
                    onClick={handleSignUp}
                  >
                    {loading ? (
                      <Spinner color="dark" size={30} />
                    ) : (
                      "create account"
                    )}
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={2} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Already have an account?{" "}
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-in"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign In
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </Box>
            </Box>
          </Card>
        </BasicLayout>
      ) : (
        <Navigate replace to="/searchFlights" />
      )}
    </>
  );
}

export default Cover;
