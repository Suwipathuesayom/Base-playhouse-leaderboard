import { Button } from "@mui/material";
import { db } from "../../config/firebase";
import React from "react";
import "../../assets/styles/NewProject.css";

import color from "../../constant/color";

function NewProjectFooter({
  project,
  setProject,
  header,
  setCreateProjectStatus,
}) {
  const handleAddNewProject = async () => {
    let tempProject = project;
    tempProject.createdAt = new Date();
    setProject(tempProject);
    console.log(tempProject);
    setCreateProjectStatus("creating");
    try {
      let projectRef = db
        .collection("users")
        .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2");
      // .doc(project.projectName)
      // .set(tempProject)
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
          createdAt: new Date(),
          projectName: tempProject.projectName,
          totalPoint: 20,
        })
        .then(() => {
          setCreateProjectStatus("success");
        })
        .catch((error) => {
          console.log(error);
          setCreateProjectStatus("failure");
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateProject = async () => {
    let tempProject = project;
    tempProject.createdAt = new Date();
    console.log(tempProject);
    setProject(tempProject);

    setCreateProjectStatus("creating");
    try {
      let userRef = db.collection("users").doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2");

      await userRef
        .collection("project")
        .doc(tempProject.id)
        .update(tempProject)
        .catch((error) => {
          setCreateProjectStatus("failure");
        });

      await userRef
        .collection("projectDashboard")
        .doc(tempProject.id)
        .update({
          createdAt: new Date(),
          projectName: tempProject.projectName,
        })
        .then(() => {
          setCreateProjectStatus("success");
        })
        .catch((error) => {
          setCreateProjectStatus("failure");
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
        onClick={() => {}}
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
