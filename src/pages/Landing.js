import React from "react";
import "../assets/styles/Landing.css";
import { Button } from "react-bootstrap";
import boomseen from "../assets/image/boomseen.png";
import dice from "../assets/image/dice.png";

function Landing() {
  return (
    <div className="container">
      <img src={boomseen} alt="boomseen" className="boomseen" />
      <div className="image">
        <img src={dice} alt="dice" className="dice" />
      </div>
      <h1> LEADER BOARD SCORE </h1>
      <Button className="leader-btn">LEADERBIARD</Button>
    </div>
  );
}

export default Landing;
