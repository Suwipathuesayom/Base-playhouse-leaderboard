import { Divider } from "@mui/material";
import React, { useState } from "react";
import LeaderboardHeader from "../components/Functions/LeaderboardHeader";
import queryProjectFromProjectName from "../components/Functions/queryProjectFromProjectName";
import PresentationHeader from "../components/PresentationHeader";
import { db } from "../config/firebase";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [project, setProject] = useState();
  const queryProject = (projectName, setProject) => {
    try {
      db.collection("users")
        .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
        .collection("project")
        .where("projectName", "==", projectName)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            let tempProject = doc.data();
            tempProject.learnerGroups = tempProject.learnerGroups.sort(
              (lhs, rhs) => {
                return (
                  parseFloat(rhs.totalWeightPoint) -
                  parseFloat(lhs.totalWeightPoint)
                );
              }
            );
            setProject(tempProject);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (project) {
    return (
      <div className="leaderboard-container">
        <div className="navbar-container">
          <img src={require("../assets/images/base-logo-white.png")} />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderRightWidth: 2, bgcolor: "white" }}
          />
          <h2>Speaker</h2>
        </div>

        <LeaderboardHeader project={project} />
        <div className="leaderboard-table">
          <div className="leaderboard-tableRank">
            <div className="leaderboard-tableRank-chart1">
              <div style={{ height: "25%" }}>
                <div className="leaderboard-iconRank">
                  {project.learnerGroups[1].totalPoint}
                </div>
              </div>
              <div style={{ height: "75%" }}>
                {project.learnerGroups[1].groupName}
              </div>
            </div>
            <div className="leaderboard-tableRank-chart2">
              <div style={{ height: "10%" }}>
                <div className="leaderboard-iconRank">
                  {" "}
                  {project.learnerGroups[0].totalPoint}
                </div>
              </div>
              <div style={{ height: "90%" }}>
                {project.learnerGroups[0].groupName}
              </div>
            </div>
            <div className="leaderboard-tableRank-chart3">
              <div style={{ height: "40%" }}>
                <div className="leaderboard-iconRank">
                  {" "}
                  {project.learnerGroups[2].totalPoint}
                </div>
              </div>
              <div style={{ height: "60%" }}>
                {project.learnerGroups[2].groupName}
              </div>
            </div>
          </div>
          <div className="leaderboard-tableBody">
            <div className="leaderboard-texttable">
              <h1>Rank</h1>
              <h1>Group</h1>
              <h1>Name</h1>
              <h1>Total</h1>
            </div>
            {project.learnerGroups.map((group, groupIndex) => {
              return (
                <div className="leaderboard-box" key={groupIndex}>
                  <h1>{groupIndex + 1}</h1>
                  <h1>{group.groupIndex}</h1>
                  <h1>{group.groupName}</h1>
                  <h1>{group.totalPoint}</h1>
                </div>
              );
            })}
          </div>
          <div className="leaderboard-tasktable">
            <div className="leaderboard-texttask">
              {project.tasks.map((task, taskIndex) => {
                return <h1 key={taskIndex}>{task.taskName}</h1>;
              })}
            </div>
            {project.learnerGroups.map((group, groupIndex) => {
              return (
                <div className="leaderboard-taskbox">
                  {group.points.map((point, pointIndex) => {
                    return <h1 key={pointIndex}>{point.taskPoint}</h1>;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    queryProject("อ๋องปู", setProject);
    return <div>Loding</div>;
  }
};

export default Leaderboard;
