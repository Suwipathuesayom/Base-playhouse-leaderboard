import React, { useState } from "react";
import "../assets/styles/Landing.css";
import { Button } from "react-bootstrap";
import boomseen from "../assets/images/boomseen.png";
import dice from "../assets/images/dice.png";
import { useMediaQuery, useTheme } from "@mui/material";
import { TextInput } from "../assets/styles/InputStyles";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [groupName, setGroupName] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <div className="container">
      <div
        className="upper__content"
        style={{
          display: matches ? null : "flex",
        }}
      >
        <div
          className="headerText"
          style={{ justifyContent: matches ? "center" : null }}
        >
          <h1>LEADER BOARD SCORE</h1>
          {/* <h1>SCORE</h1> */}
        </div>
        <div className="headerImage">
          <img src={boomseen} alt="boomseen" className="image" />
        </div>
      </div>
      <div
        className="lower__content"
        style={{
          display: matches ? null : "flex",
        }}
      >
        <div className="lower__content__input">
          <div className="inputContainer">
            <TextInput
              placeholder="project name"
              value={projectName}
              onChange={(event) => {
                setProjectName(event.target.value);
              }}
            />
            <Button
              onClick={() => {
                navigate(`/speaker/${projectName}`, { replace: false });
              }}
            >
              VIEW LEADERBOARD
            </Button>
          </div>
          <div className="inputContainer">
            <TextInput
              placeholder="group name"
              value={groupName}
              onChange={(event) => {
                setGroupName(event.target.value);
              }}
            />
            <Button
              onClick={() => {
                navigate(`/learner/${projectName}/${groupName}`, {
                  replace: false,
                });
              }}
            >
              VIEW AS LEARNER
            </Button>
          </div>
        </div>
        {!matches && (
          <div className="diceContainer">
            <img src={dice} alt="dice" className="image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
