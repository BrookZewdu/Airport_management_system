import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axiosInstance";
import Spinner from "components/Spinner";

const theme = createTheme();

export default function Airport({ handleClose }) {
  const [IATA_code, setIATA_code] = useState("");
  const [airport_name, setairport_name] = useState("");
  const [state, setState] = useState("");
  const [country_name, setCountry_name] = useState("");
  const [offsetHour, setOffsetHour] = useState(null);
  const [offsetMin, setOffsetMin] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      AIRPORT_ID: IATA_code.toUpperCase(),
      AIRPORT_NAME: airport_name.toUpperCase(),
      STATE: state.toUpperCase(),
      COUNTRY_NAME: country_name.toUpperCase(),
      OFFSET: 0,
    };

    axios
      .post(`airport`, data)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        handleClose();
      })
      .catch((err) => {
        console.log(err.response.data);
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
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="IATA_code"
                  label="Airport ID"
                  value={IATA_code}
                  onChange={(e) => setIATA_code(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="airport_name"
                  label="Airport Name"
                  value={airport_name}
                  onChange={(e) => setairport_name(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="country_name"
                  label="Country_name"
                  value={country_name}
                  onChange={(e) => setCountry_name(e.target.value)}
                />
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
                // onClick={handleSubmit}
              >
                ADD AIRPORT
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
