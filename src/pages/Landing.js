import React, { useState } from "react";
import "../assets/styles/Landing.css";
import { db } from "../config/firebase";
import boomseen from "../assets/images/boomseen.png";
import dice from "../assets/images/dice.png";
import {
  Autocomplete,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";
import color from "../constant/color";
import { DropDownTextInput } from "../assets/styles/InputStyles";

function Landing() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [projectDashboard, setProjectDashboard] = useState([]);
  const [learnerGroups, setLearnerGroups] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  const queryProjectDashboard = async () => {
    let tempProjectDashboard = [];
    try {
      // let authUser = auth.currentUser;
      await db
        .collection("users")
        .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
        .collection("projectDashboard")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            tempProjectDashboard.push(doc.data());
          });
          console.log(tempProjectDashboard);
          setProjectDashboard(tempProjectDashboard);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const queryProjectLearnerGroups = async (projectName) => {
    try {
      await db
        .collection("users")
        .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
        .collection("project")
        .where("projectName", "==", projectName)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setLearnerGroups(doc.data().learnerGroups);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (!!projectDashboard.length) {
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
              <Autocomplete
                id="select-project"
                freeSolo
                value={projectName}
                onChange={(event, newValue) => {
                  setProjectName(newValue);
                  queryProjectLearnerGroups(newValue);
                }}
                sx={{
                  width: "300px",
                  marginRight: "20px",
                }}
                options={projectDashboard?.map(
                  (project) => project.projectName
                )}
                renderInput={(params) => (
                  <DropDownTextInput {...params} label="Select Project" />
                )}
              />
              <Button
                disableElevation
                variant="contained"
                disabled={projectName === "" || !projectName}
                onClick={() => {
                  navigate(`/speaker/${projectName}`, { replace: false });
                }}
              >
                VIEW LEADERBOARD
              </Button>
            </div>
            <div className="inputContainer">
              <Autocomplete
                id="select-project"
                disabled={projectName === "" || !projectName}
                freeSolo
                value={groupName}
                onChange={(event, newValue) => {
                  setGroupName(newValue);
                }}
                sx={{
                  width: "300px",
                  marginRight: "20px",
                }}
                options={learnerGroups?.map((project) => project.groupName)}
                renderInput={(params) => (
                  <DropDownTextInput {...params} label="Select Group" />
                )}
              />
              <Button
                disableElevation
                variant="contained"
                disabled={
                  groupName === "" ||
                  !groupName ||
                  projectName === "" ||
                  !projectName
                }
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
  } else {
    queryProjectDashboard();
    return <SplashScreen />;
  }
}

export default Landing;
