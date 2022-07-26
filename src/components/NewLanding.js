import React from "react";
import "./NewLanding.css";
const NewLanding = () => {
  return (
    <div className="landing-container">
      <div className="landing-textHeader">
        <h1>LEADERBOARD</h1>
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

      <div>
        <button id="buttonBacktoADMIN">Back to ADMIN</button>
      </div>

      <div>Copyright © BASE Playhouse,All Rights Reserved.</div>
    </div>
  );
};

export default NewLanding;