import React, { useState } from "react";
import LeaderboardHeader from "../components/Functions/LeaderboardHeader";
import queryProjectFromProjectName from "../components/Functions/queryProjectFromProjectName";
import PresentationHeader from "../components/PresentationHeader";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [project, setProject] = useState();

  if (project) {
    return (
      <div className="leaderboard-container">
        <div className="navbar-container">
          <img src="https://media.discordapp.net/attachments/982577768279736390/1001408179621593128/BPGLogo-white.png" />

          <h2>| Speaker</h2>
        </div>

        <div>
          <LeaderboardHeader project={project} />
        </div>
        <div className="leaderboard-table">
          <div className="leaderboard-tableRank">
            <div>แท่ง1</div>
            <div>แท่ง2</div>
            <div>แท่ง3</div>
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
              {project.tasks.map((tasks, tasksIndex) => {
                return <h1>{tasks.taskName}</h1>;
              })}
            </div>
            {project.learnerGroups.map((group, groupIndex) => {
              return (
                <div className="leaderboard-taskbox">
                  {group.points.map((points) => {
                    return <h1>{points.taskPoint}</h1>;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    queryProjectFromProjectName("NCT2023", setProject);
    return <div>Loding</div>;
  }
};

export default Leaderboard;
