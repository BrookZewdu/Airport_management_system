import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { useMaterialUIController } from "context";
import Grid from "@mui/material/Grid";
import { IconButton, Divider } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import backgroundImage from "assets/images/sign-in/11.jpg";
import logoName from "assets/images/logos/logo-name.png";
import { AccessTime } from "@mui/icons-material";

function Ticket({
  ticketId,
  flightId,
  srcId,
  srcAirportName,
  srcCity,
  srcCountry,
  // srcOffset,
  destId,
  destAirportName,
  destCountry,
  destCity,
  // destOffset,
  departure,
  arrival,
  duration,
  fare,
  bookedDate,
  departureDate,
  isUpcoming,
  seat,
  isCancelled,
  cancelConfirmation,
  noGutter,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const titleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  const ticketDetails = (
    <Grid
      container
      display="flex"
      // direction="column"
      justifyContent="space-around"
      // alignItems="center"
      spacing={0}
      pt={2}
    >
      <Grid item xs={12}>
        <Divider
          orientation="horizontal"
          sx={{ mx: 10, height: "1px", background: "gray" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        // md={4}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          SRC&nbsp;-&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${srcAirportName}, ${srcCity}, ${srcCountry}`}
        </MDTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        // md={4}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          DEST&nbsp;-&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${destAirportName}, ${destCity}, ${destCountry}`}
        </MDTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        // md={4}
        display="flex"
        // alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          SEAT&nbsp;-&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${seat}`}
        </MDTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        // md={4}
        display="flex"
        // alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          FARE&nbsp;-&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          ETB {`${fare}`}
        </MDTypography>
      </Grid>
    </Grid>
  );

  return (
    <MDBox
      bgColor={darkMode ? "transparent" : "grey-200"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <Grid
        container
        // component="li"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        spacing={5}
      >
        <Grid item display="flex">
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <MDTypography variant="h6" fontWeight="light">
                  {new Date(
                    new Date(bookedDate).getTime() -
                      new Date().getTimezoneOffset() * 60000
                  )
                    .toString()
                    .substring(0, 24)}
                </MDTypography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item display="flex" justify="center">
          <List>
            <ListItem disablePadding>
              {/* <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon> */}
              <ListItemText sx={{ ml: -3 }}>
                <Grid display="flex">
                  <MDTypography variant="h6" fontWeight="medium">
                    Ticket ID: &nbsp;
                  </MDTypography>
                  <MDTypography variant="h6" fontWeight="light">
                    {ticketId}
                  </MDTypography>
                </Grid>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        {isUpcoming === true ? (
          <Grid
            item
            // lg={4}
            // sm={3}
            // xs={7}
            display="flex"
            //direction="column"
            alignItems="flex-end"
            justify="flex-end"
            //  sx={{ ml: -2 }}
          >
            {isCancelled === true ? (
              <MDButton variant="outlined" color="dark" disabled size="small">
                <CancelPresentationIcon></CancelPresentationIcon>&nbsp;CANCEL
              </MDButton>
            ) : (
              <MDButton
                variant="outlined"
                color="info"
                size="small"
                onClick={() => cancelConfirmation(ticketId)}
              >
                <CancelPresentationIcon></CancelPresentationIcon>&nbsp;CANCEL
              </MDButton>
            )}
          </Grid>
        ) : null}
        <Grid item display="flex">
          <MDButton variant="outlined" color="info" size="small">
            PRINT
          </MDButton>
        </Grid>
      </Grid>
      <Divider
        orientation="horizontal"
        sx={{ mx: 10, height: "1px", background: "gray" }}
      />
      <Grid
        container
        // component="li"
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        // mx="auto"
      >
        <MDBox mr={2} ml={-1}>
          <MDButton
            variant="contained"
            color="info"
            iconOnly
            circular
            size="small"
            onClick={toggleCollapse}
          >
            <Icon sx={{ fontWeight: "bold" }}>
              {collapsed ? "expand_less" : "expand_more"}
            </Icon>
          </MDButton>
        </MDBox>
        <Grid
          item
          lg={2}
          sm={3}
          xs={7}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
        >
          {/* <MDBox borderColor={"black"} border={"2px"}> */}
          {/* <Stack spacing={0} textAlign="center"> */}
          <MDTypography fontWeight="medium">{srcId}</MDTypography>
          <MDTypography variant="h4" fontWeight="bold" sx={{ mr: -4, ml: 2 }}>
            {new Date(departure).toTimeString().substring(0, 5)}
            {/* <MDTypography variant="overline" verticalAlign="super">
              {srcOffset[0] !== "-"
                ? `(+${srcOffset.substring(0, 5)})`
                : `(${srcOffset.substring(0, 6)})`}
            </MDTypography> */}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {new Date(departure).toDateString()}
          </MDTypography>
          {/* <MDTypography variant="h6" fontWeight="light">
            {srcCity}
          </MDTypography> */}
          {/* </Stack> */}
          {/* </MDBox> */}
        </Grid>

        <Grid
          item
          lg={2}
          sm={3}
          xs={7}
          sx={{ ml: 4, mr: 2 }}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
          justifyContent={"center"}
        >
          {/* <Stack spacing={0} textAlign="center"> */}
          <AccessTime />
          {/* <Divider flexItem> */}
          <MDTypography variant="h6" fontWeight="medium" color="secondary">
            676776
          </MDTypography>
          {/* </Divider> */}
          {/* </Stack> */}
        </Grid>

        <Grid
          item
          lg={2}
          sm={3}
          xs={7}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
        >
          {/* <Stack spacing={0} textAlign="center"> */}
          <MDTypography fontWeight="medium">{destId}</MDTypography>
          <MDTypography variant="h4" fontWeight="bold" sx={{ mr: -4, ml: 2 }}>
            {new Date(arrival).toTimeString().substring(0, 5)}
            {/* <MDTypography variant="overline" verticalAlign="super">
              {destOffset[0] !== "-"
                ? `(+${destOffset.substring(0, 5)})`
                : `(${destOffset.substring(0, 6)})`}
            </MDTypography> */}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {new Date(arrival).toDateString()}
          </MDTypography>
          {/* <MDTypography variant="h6" fontWeight="light">
            {destCity}
          </MDTypography> */}
          {/* </Stack> */}
        </Grid>
        <Grid
          item
          lg={2}
          sm={3}
          xs={7}
          sx={{ ml: 5 }}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
        >
          <MDTypography variant="h6" fontWeight="regular">
            Flight ID
          </MDTypography>
          <MDTypography variant="p" fontSize="12px">
            {flightId}
          </MDTypography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Collapse in={collapsed}>{ticketDetails}</Collapse>
      </Grid>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Ticket.defaultProps = {
  noGutter: false,
};

export default Ticket;
