import { Button } from "@mui/material";
import { db, firebase } from "../../config/firebase";
import React from "react";
import "../../assets/styles/NewProject.css";

import color from "../../constant/color";
import { useNavigate } from "react-router-dom";
import calculateProjectTotalPoint from "../../components/Functions/calculateProjectTotalPoint";

// const auth = firebase.auth();

function NewProjectFooter({
  project,
  setProject,
  header,
  setEditProjectStatus,
}) {
  const navigate = useNavigate();

  const handleAddNewProject = async () => {
    let createdDateTime = new Date();
    let tempProject = project;
    tempProject.createdAt =
      firebase.firestore.Timestamp.fromDate(createdDateTime);
    tempProject.totalPoint = calculateProjectTotalPoint(tempProject);
    setProject(tempProject);
    setEditProjectStatus("info");
    try {
      let projectRef = db
        .collection("users")
        .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3");

      let newProjectRef = await projectRef
        .collection("project")
        .add(tempProject);

      tempProject.id = newProjectRef.id;

      await projectRef
        .collection("project")
        .doc(newProjectRef.id)
        .update(tempProject);

      await projectRef
        .collection("projectDashboard")
        .doc(newProjectRef.id)
        .set({
          createdAt: firebase.firestore.Timestamp.fromDate(createdDateTime),
          projectName: tempProject.projectName,
          totalPoint: tempProject.totalPoint,
        })
        .then(() => {
          setEditProjectStatus("success");
        })
        .catch((error) => {
          console.log(error);
          setEditProjectStatus("error");
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateProject = async () => {
    let updatedDateTime = new Date();
    let tempProject = project;
    tempProject.createdAt =
      firebase.firestore.Timestamp.fromDate(updatedDateTime);
    tempProject.totalPoint = calculateProjectTotalPoint(tempProject);
    setProject(tempProject);

    setEditProjectStatus("info");
    try {
      let userRef = db.collection("users").doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3");

      await userRef
        .collection("project")
        .doc(tempProject.id)
        .update(tempProject)
        .catch((error) => {
          setEditProjectStatus("error");
        });

      await userRef
        .collection("projectDashboard")
        .doc(tempProject.id)
        .update({
          createdAt: firebase.firestore.Timestamp.fromDate(updatedDateTime),
          projectName: tempProject.projectName,
          totalPoint: tempProject.totalPoint,
        })
        .then(() => {
          setEditProjectStatus("success");
        })
        .catch((error) => {
          setEditProjectStatus("error");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="footer">
      <Button
        // className="button"
        style={{
          width: 150,
          fontSize: 24,
          borderRadius: 20,
          color: "white",
          backgroundColor: color.primaryOrange,
        }}
        disableElevation
        variant="contained"
        onClick={() => {
          navigate("/admin-leaderboard");
        }}
      >
        ย้อนกลับ
      </Button>
      {header === "NEW PROJECT" && (
        <Button
          // className="button"
          style={{
            width: 150,
            fontSize: 24,
            borderRadius: 20,
            color: "white",
            backgroundColor: color.primaryOrange,
          }}
          disableElevation
          variant="contained"
          onClick={() => handleAddNewProject()}
        >
          สร้างเลย
        </Button>
      )}
      {header === "EDIT PROJECT" && (
        <Button
          // className="button"
          style={{
            width: 150,
            fontSize: 24,
            borderRadius: 20,
            color: "white",
            backgroundColor: color.primaryOrange,
          }}
          disableElevation
          variant="contained"
          onClick={() => handleUpdateProject()}
        >
          บันทึก
        </Button>
      )}
    </div>
  );
}

export default NewProjectFooter;
