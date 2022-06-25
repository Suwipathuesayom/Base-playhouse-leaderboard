import React, { useState } from "react";
import "../assets/styles/Landing.css";
import { Button } from "react-bootstrap";
import boomseen from "../assets/images/boomseen.png";
import dice from "../assets/images/dice.png";
import { useMediaQuery, useTheme } from "@mui/material";
import { TextInput } from "../assets/styles/InputStyles";
import { useNavigate } from "react-router-dom";

function Landing() {
  const theme = useTheme();
  const [projectName, setProjectName] = useState("");
  console.log(projectName);
  const [groupName, setGroupName] = useState("");
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  console.log(matches);
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
          <h1>LEADER BOARD</h1>
          <h1>SCORE</h1>
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
        <div
          className="inputContainer"
          style={{
            justifyContent: matches ? "center" : "flex-start",
            marginBottom: matches ? 10 : null,
          }}
        >
          <TextInput
            placeholder="project name"
            value={projectName}
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
          />
          <Button
            onClick={() => {
              navigate("/speaker/" + projectName, { replace: true });
            }}
          >
            {" "}
            VIEW LEADERBOARD{" "}
          </Button>
        </div>
        <div
          className="inputContainer"
          style={{
            justifyContent: matches ? "center" : "flex-start",
            marginBottom: matches ? 10 : null,
          }}
        >
          <TextInput
            placeholder="group name"
            value={groupName}
            onChange={(event) => {
              setGroupName(event.target.value);
            }}
          />
          <Button
            onClick={() => {
              navigate("/learner/" + projectName + "/" + groupName, {
                replace: true,
              });
            }}
          >
            VIEW AS LEARNER
          </Button>
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
