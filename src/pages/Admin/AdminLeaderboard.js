import React, { useState } from "react";
import "../../assets/styles/AdminDashboard.css";
// import circle1 from "../../assets/images/circle1.png";
import AdminTable from "../../components/AdminTable";
import { useNavigate } from "react-router-dom";
import SplashScreen from "../../components/SplashScreen";
import { useMediaQuery, useTheme } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import Navbar from "../../components/Navbar";
import queryProjectDashboard from "../../components/Functions/queryProjectDashboard";

function AdminLeaderboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [projectDashboard, setProjectDashboard] = useState([]);

  if (!!projectDashboard.length) {
    return (
      <div className="adminLeaderboard">
        <Navbar header={"ADMIN LEADERBOARD"} />
        {/* <img src={circle1} alt="circle1" className="circle1" /> */}
        <div className="admin-header">
          {/* <h1 style={{ fontSize: smallScreen ? 48 : 72 }}>LEADERBOARD</h1> */}
          <div className="admin-header__newLeaderboard">
            <AddCircle
              className="icon"
              sx={{ width: "50px", height: "50px", color: "#ff5b4a" }}
              onClick={() => {
                navigate("/project");
              }}
            />
            <h2 style={{ fontSize: smallScreen ? 36 : 48 }}>New Leaderboard</h2>
          </div>
        </div>
        <div className="admin-body">
          <AdminTable
            projectDashboard={projectDashboard}
            setProjectDashboard={setProjectDashboard}
          />
        </div>
      </div>
    );
  } else {
    queryProjectDashboard(setProjectDashboard);
    return <SplashScreen />;
  }
}

export default AdminLeaderboard;
