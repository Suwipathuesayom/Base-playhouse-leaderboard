import React, { useState } from "react";
import { db, firebase } from "../../config/firebase";
import "../../assets/styles/AdminDashboard.css";
import circle1 from "../../assets/images/circle1.png";
import AdminTable from "../../components/AdminTable";
import { Link } from "react-router-dom";
import SplashScreen from "../../components/SplashScreen";
import { useMediaQuery, useTheme } from "@mui/material";
import { AddCircle, Logout } from "@mui/icons-material";
import color from "../../constant/color";
import Navbar from './../../components/Navbar';

function AdminLeaderboard() {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [projectDashboard, setProjectDashboard] = useState([]);
  console.log(projectDashboard);

  const handleLogout = async () => {
    try {
      await firebase
        .auth()
        .signOut()
        .then(() => console.log("Singed Out"));
    } catch (error) {
      console.log(error);
    }
  };

  const queryProjectDashboard = async () => {
    let tempProjectDashboard = [];
    try {
      await db
        .collection("users")
        .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
        .collection("projectDashboard")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            tempProjectDashboard.push(doc.data());
          });
          console.log(tempProjectDashboard);
          setProjectDashboard(tempProjectDashboard);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (!!projectDashboard.length) {
    return (
      <div className="adminLeaderboard">
      <Navbar />
        <img src={circle1} alt="circle1" className="circle1" />
        <div className="admin-header">
          <h1 style={{ fontSize: smallScreen ? 60 : 72 }}>LEADERBOARD</h1>
          <div className="admin-header__newLeaderboard">
            <Link to="/new-project">
              <AddCircle sx={{ fontSize: 40, color: color.primaryOrange }} />
            </Link>
            <h2>New Leaderboard</h2>
            <Link to="/">
              <Logout
                sx={{ fontSize: 40, color: color.primaryOrange }}
                onClick={() => {
                  handleLogout();
                }}
              />
            </Link>
          </div>
        </div>
        <div className="admin-body">
          <AdminTable projectDashboard={projectDashboard} />
        </div>
      </div>
    );
  } else {
    queryProjectDashboard();
    return <SplashScreen />;
  }
}

export default AdminLeaderboard;
