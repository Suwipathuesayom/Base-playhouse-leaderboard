import React from "react";
import "../assets/styles/Landing.css";
import { Button } from "react-bootstrap";
import ImageBoomSeen from "../assets/image/boomseen.png";
import dice from "../assets/image/dice.png";

function Landing() {
  return (
    <div className="container">
      <img src={ImageBoomSeen} alt="ImageBoomSeen" className="ImageBoomSeen" />
      <img src={dice} alt="dice" className="dice" />

      <div className="head-body">
      <h1> LEADER BOARD SCORE </h1>
      </div>
      <Button className="leader-btn">LEADERBOARD</Button>
    </div>
  );
}

export default Landing;
