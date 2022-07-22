import React, { useState } from "react";
import FlipMove from "react-flip-move";
import PresentationHeader from "../components/PresentationHeader";
import { db } from "../config/firebase";
import "../assets/styles/Learner.css";
import SplashScreen from "../components/SplashScreen";
import { useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LearnerBox from "../components/LearnerBox";

const Learner = () => {
  const [project, setProject] = useState({});
  const { projectNameParams, groupNameParams } = useParams();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  if (!!Object.keys(project).length) {
    return (
      <div className="App">
        <Navbar header={`GROUP ${groupNameParams ? groupNameParams : ""}`} />
        <PresentationHeader project={project} />
        <div className="learner__container">
          <div className="learner__header">
            <h3>RANK</h3>
            {!smallScreen && <img alt="" />}
            {!smallScreen && <h3>GROUP</h3>}
            <h2>NAME</h2>
            <h3>TOTAL</h3>
          </div>
          <FlipMove className="learner__flipMove">
            {project?.learnerGroups?.map((group, rankIndex) => (
              <LearnerBox
                key={group.groupIndex}
                rankIndex={rankIndex}
                {...group}
                smallScreen={smallScreen}
                groupNameParams={groupNameParams}
                project={project}
              />
            ))}
          </FlipMove>
        </div>
      </div>
    );
  } else {
    try {
      db.collection("users")
        .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
        .collection("project")
        .where("projectName", "==", projectNameParams)
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
    return <SplashScreen />;
  }
};

export default Learner;
