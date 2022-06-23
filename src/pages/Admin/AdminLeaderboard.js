import React, { useState } from "react";
import { db } from "../../config/firebase";
import "../../assets/styles/AdminDashboard.css";
import plusIcon from "../../assets/images/PlusIcon.svg";
import circle1 from "../../assets/images/circle1.png";
import AdminTable from "../../components/AdminTable";
import { Link } from "react-router-dom";
import SplashScreen from "../../components/SplashScreen";

function AdminLeaderboard() {
  const [projectDashboard, setProjectDashboard] = useState([]);
  console.log(projectDashboard);

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
        <img src={circle1} alt="circle1" className="circle1" />
        <div className="admin-header">
          <h1>LEADERBOARD</h1>
          <br />
          <h2>New Leaderboard</h2>
          <Link to="/new-project">
            <img
              src={plusIcon}
              alt="logo-name"
              onClick={() => console.log(projectDashboard)}
            />
          </Link>
        </div>
        <div className="admin-body">
          <div className="admin-table">
            <AdminTable projectDashboard={projectDashboard} />
          </div>
        </div>
      </div>
    );
  } else {
    queryProjectDashboard();
    return <SplashScreen />;
  }
}

export default AdminLeaderboard;
