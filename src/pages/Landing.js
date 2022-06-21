import React from "react";
import "../assets/styles/Landing.css";
import { Button } from "react-bootstrap";
import boomseen from "../assets/images/boomseen.png";
import dice from "../assets/images/dice.png";
import { useMediaQuery, useTheme } from "@mui/material";

function Landing() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  console.log(matches);
  return (
    <div className="container">
      <div
        className="upper__content"
        style={{ display: matches ? null : "flex" }}
      >
        <div className="headerText">
          <h1>LEADER BOARD</h1>
          <h1>SCORE</h1>
        </div>
        <div className="headerImage">
          <img src={boomseen} alt="boomseen" className="image" />
        </div>
      </div>
      <div
        className="lower__content"
        style={{ display: matches ? null : "flex" }}
      >
        <div className="inputContainer">
          <Button>VIEW LEADERBOARD</Button>
        </div>
        <div className="diceContainer">
          <img src={dice} alt="dice" className="image" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
