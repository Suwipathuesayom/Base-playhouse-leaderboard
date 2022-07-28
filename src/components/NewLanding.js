import React from "react";
import "./NewLanding.css";
const NewLanding = () => {
  return (
    <div className="landing-container">
      <div className="landing-textHeader">
        <p>LEADERBOARD</p>
      </div>

      <div className="landing-box">
        Box
        <div className="landing-selectProject">
          <input type="text" id="inputLeaderBoard-Project" />{" "}
          <button>View Leaderboard</button>
        </div>
        <div className="landing-selectGroup">
          <input type="text" id="inputLeaderBoard-Group" />{" "}
          <button>View as learner</button>
        </div>
      </div>

      <div className="buttonBack-container">
        <button className="buttonBack">Back to ADMIN</button>
      </div>

      <div className="landing-textCopy-container">
        <div className="landing-textCopy">
          Copyright © BASE Playhouse,All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default NewLanding;
