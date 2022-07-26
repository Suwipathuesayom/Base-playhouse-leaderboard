import React from "react";
import "./Leaderboard.css";

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
      <div className="navbar-container">
        <img
          src="https://yt3.ggpht.com/ytc/AKedOLR_UA-QGw_Oe2-RZ6o-egVZQ-Tk5my0qxZfFAvZkg=s900-c-k-c0x00ffffff-no-rj"
          alt="not found img"
        />
        <h2>BASE</h2>
      </div>

      <div>
        <div>Leaderboard</div>
        <div>image</div>
        <div>project-name</div>
      </div>

      <div>
        <div>แท่ง1</div>
        <div>แท่ง2</div>
        <div>แท่ง3</div>
      </div>

      <div>
        Table Body
        <div>Rank</div>
        <div>Group</div>
        <div>Name</div>
        <div>Total</div>
      </div>

      <div>
        Table Task
        <div>
          Header
          <div>Point Task</div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
