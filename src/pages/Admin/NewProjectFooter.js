import { Button } from "@mui/material";
import { db } from "../../config/firebase";
import React from "react";
import "../../assets/styles/NewProject.css";

import color from "../../constant/color";

function NewProjectFooter({ project, setProject, header }) {
  const handleAddNewProject = async () => {
    let tempProject = project;
    tempProject.createdAt = new Date();
    setProject(tempProject);
    console.log(tempProject);

    try {
      await db
        .collection("users")
        .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
        .collection("project")
        .doc(tempProject.projectName)
        .set(tempProject);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateProject = async () => {
    let tempProject = project;
    tempProject.createdAt = new Date();
    setProject(tempProject);

    try {
      await db
        .collection("users")
        .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
        .collection("project")
        .doc(tempProject.projectName)
        .update(tempProject);
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
        // onClick={async () => queryProject()}
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
