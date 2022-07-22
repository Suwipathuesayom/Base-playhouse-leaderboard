import React, { useState } from "react";
import "../assets/styles/Speaker.css";
import "../assets/styles/Learner.css";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import SplashScreen from "../components/SplashScreen";
import PresentationHeader from "../components/PresentationHeader";
import Navbar from "../components/Navbar";
import FlipMove from "react-flip-move";
import LearnerBox from "../components/LearnerBox";
import SpeakerBox from "../components/SpeakerBox";

function Speaker() {
  const [project, setProject] = useState({});
  const { projectNameParams } = useParams();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const queryProject = (projectName) => {
    try {
      db.collection("users")
        .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
        .collection("project")
        .where("projectName", "==", projectName)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            let tempProject = doc.data();
            tempProject.learnerGroups = tempProject.learnerGroups.sort(
              (lhs, rhs) => {
                return (
                  parseFloat(rhs.totalWeightPoint) -
                  parseFloat(lhs.totalWeightPoint)
                );
              }
            );
            setProject(tempProject);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (!!Object.keys(project).length) {
    return (
      <div className="App">
        <Navbar header={`SPEAKER`} />
        <PresentationHeader project={project} />
        <div className="speaker__container">
          <div className="speaker__learnerContent">
            <div className="learner__header">
              <h3>RANK</h3>
              {!smallScreen && <img alt="" />}
              {!smallScreen && <h3>GROUP</h3>}
              <h2>NAME</h2>
              <h3>TOTAL</h3>
            </div>
            <FlipMove>
              {project?.learnerGroups?.map((group, rankIndex) => (
                <LearnerBox
                  key={group.groupIndex}
                  rankIndex={rankIndex}
                  theme={project?.theme}
                  {...group}
                  smallScreen={smallScreen}
                  groupNameParams={"null"}
                  project={project}
                />
              ))}
            </FlipMove>
          </div>
          <div className="speaker__speakerContent">
            <div className="speaker__speakerHeader">
              {project.tasks
                .filter((task) => !task.isHidden)
                .map((task, taskIndex) => (
                  <h3 key={taskIndex}>{task.taskName}</h3>
                ))}
            </div>
            <FlipMove>
              {project?.learnerGroups?.map((group, rankIndex) => (
                <SpeakerBox
                  key={group.groupIndex}
                  rankIndex={rankIndex}
                  theme={project?.theme}
                  {...group}
                  smallScreen={smallScreen}
                  groupNameParams={"null"}
                  project={project}
                />
              ))}
            </FlipMove>
          </div>
        </div>
      </div>
    );
  } else {
    queryProject(projectNameParams);
    return <SplashScreen />;
  }
}

export default Speaker;
