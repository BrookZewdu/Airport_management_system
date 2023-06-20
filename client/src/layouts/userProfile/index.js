import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "layouts/userProfile/components/ProfileInfoCard";
import Header from "layouts/userProfile/components/Header";
import { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "authContext";

function Profile() {
  const { authenticated, currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    console.log("user:: ", u);
    setUser(u);
  }, []);
  return (
    <>
      {authenticated === true ? (
        <DashboardLayout>
          <DashboardNavbar />
          <MDBox mb={2} />
          <Header>
            {/* <MDBox mt={5} mb={3}> */}
            {/**
              date_of_birth
              email
              f_name
              l_name
              passenger_id
              passport_country
              passport_expiration
              passport_number
              password
              phone

              customerId,
              customerName,
              gender,
              dob,
              countryCode,
              phoneNo,
              email,
              address,
              profession,
              shadow,
             */}
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <ProfileInfoCard
                customerId={user.passenger_id}
                customerName={user.f_name + " " + user.l_name}
                email={user.email}
                gender=""
                dob={user.date_of_birth}
                countryCode={user.passport_country.slice(0, 3)}
                phoneNo={user.phone}
                address={user.passport_country}
                // isAdmin={user.ROLE !== "N" ? true : false}
                profession="Customer"
                shadow={true}
              />
            </Grid>
          </Header>
          <Footer />
        </DashboardLayout>
      ) : (
        <Navigate replace to="/dashboard" />
      )}
    </>
  );
}

export default Profile;
