import React, { useState } from "react";
import { Alert, Box, Collapse, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

import { db } from "../../config/firebase";
import "../../assets/styles/NewProject.css";
import NewProjectHeader from "./NewProjectHeader";
import NewProjectFooter from "./NewProjectFooter";
import NewProjectBody from "./NewProjectBody";
import SplashScreen from "../../components/SplashScreen";

function EditProject() {
  const { projectName } = useLocation().state;
  const [project, setProject] = useState(null);
  const [createProjectStatus, setCreateProjectStatus] = useState("editing");

  const queryProject = async (projectName) => {
    await db
      .collection("users")
      .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
      .collection("project")
      .where("projectName", "==", projectName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setProject(doc.data());
          console.log(doc.data());
        });
      })
      .catch((error) => {
        console.log(error);
        setProject({});
      });
  };

  if (project) {
    return (
      <div className="newProject">
        <Box
          sx={{
            width: "100%",
            paddingX: "20%",
            position: "absolute",
            top: "10px",
          }}
        >
          <Collapse in={createProjectStatus === "success"}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setCreateProjectStatus("exiting");
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              อัพเดตโปรเจคสำเร็จ!
            </Alert>
          </Collapse>
          <Collapse in={createProjectStatus === "creating"}>
            <Alert
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setCreateProjectStatus("exiting");
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              กำลังอัพเดตโปรเจค ...
            </Alert>
          </Collapse>
          <Collapse in={createProjectStatus === "failure"}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setCreateProjectStatus("exiting");
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              เกิดข้อผิดพลาดในการอัพเดตโปรเจค
            </Alert>
          </Collapse>
        </Box>
        <NewProjectHeader
          project={project}
          setProject={setProject}
          header={"EDIT PROJECT"}
        />
        <NewProjectBody project={project} setProject={setProject} />
        <NewProjectFooter
          project={project}
          setProject={setProject}
          header={"EDIT PROJECT"}
          setCreateProjectStatus={setCreateProjectStatus}
        />
      </div>
    );
  } else {
    queryProject(projectName);
    return <SplashScreen />;
  }
}

export default EditProject;
