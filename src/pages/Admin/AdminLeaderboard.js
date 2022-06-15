import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import "../../assets/styles/AdminDashboard.css";
import plusIcon from "../../assets/images/PlusIcon.svg";
import circle1 from "../../assets/images/circle1.png";
// import circle2 from "../../assets/images/circle2.png";
import AdminTable from "../../components/AdminTable";
import { Link } from "react-router-dom";

function AdminLeaderboard() {
  const [projectDashboard, setProjectDashboard] = useState([]);

  useEffect(() => {
    const queryProjectDashboard = async () => {
      let tempProjectDashboard = [];
      // console.log("button clicked");
      try {
        // console.log("trying.......");
        await db
          .collection("users")
          .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
          .collection("projectDashboard")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              // console.log(doc.data().createdAt.toDate().toISOString());
              // setProjectDashboard(doc.data())
              tempProjectDashboard.push(doc.data());
            });
            setProjectDashboard(tempProjectDashboard);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    queryProjectDashboard();
    // console.log(projectDashboard);
  }, []);

  return (
    <div className="adminLeaderboard">
      <img src={circle1} alt="circle1" className="circle1" />
      {/* <img src={circle2} alt="circle2" className="circle2" /> */}
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
        {/* <img
          src={plusIcon}
          alt="logo-name"
          onClick={() => console.log(projectDashboard)}
          to="/new-project"
        /> */}
      </div>
      <div className="admin-body">
        <div className="admin-table">
          <AdminTable projectDashboard={projectDashboard} />
        </div>
      </div>
    </div>
  );
}

export default AdminLeaderboard;
