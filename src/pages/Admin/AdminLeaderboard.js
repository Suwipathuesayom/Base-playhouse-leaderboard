import React from "react";
import "../../assets/styles/AdminDashboard.css";
import plusIcon from "../../assets/images/PlusIcon.svg";
import circle1 from "../../assets/images/circle1.png";
import circle2 from "../../assets/images/circle2.png";
import AdminTable from "../../components/AdminTable";

function AdminLeaderboard() {
  return (
    <div className="adminLeaderboard">
      <img src={circle1} alt="circle1" className="circle1" />
      <img src={circle2} alt="circle2" className="circle2" />
      <div className="admin-header">
        <h1>LEADERBOARD</h1>
        <br />
        <h2>New Leaderboard</h2>
        <img src={plusIcon} alt="logo-name" />
      </div>
      <div className="admin-body">
        <div className="admin-table">
          <AdminTable />
        </div>
      </div>
    </div>
  );
}

export default AdminLeaderboard;
