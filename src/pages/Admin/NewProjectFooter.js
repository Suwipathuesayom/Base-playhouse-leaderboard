import { Button } from "@mui/material";
import { db } from "../../config/firebase";
import React from "react";
import "../../assets/styles/NewProject.css";

import color from "../../constant/color";

function NewProjectFooter({ project, setProject }) {
  const handleSubmitProject = async () => {
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
  return (
    <div className="footer">
      <Button
        // className="button"
        style={{
          fontSize: 24,
          borderRadius: 20,
          color: "white",
          backgroundColor: color.primaryOrange,
        }}
        disableElevation
        variant="contained"
      >
        ย้อนกลับ
      </Button>
      <Button
        // className="button"
        style={{
          fontSize: 24,
          borderRadius: 20,
          color: "white",
          backgroundColor: color.primaryOrange,
        }}
        disableElevation
        variant="contained"
        onClick={() => handleSubmitProject()}
      >
        สร้างเลย
      </Button>
    </div>
  );
}

export default NewProjectFooter;
