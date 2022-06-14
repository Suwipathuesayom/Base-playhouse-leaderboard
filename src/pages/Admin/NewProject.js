import React, { useState } from "react";
import "../../assets/styles/NewProject.css";
import NewProjectHeader from "./NewProjectHeader";
import NewProjectFooter from "./NewProjectFooter";
import NewProjectBody from "./NewProjectBody";
import { Alert, Box, Button, Collapse, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

// Project Object Structure:
// const project = {
//   createdAt: "datetime",
//   imageUrl: "string",
//   projectName: "string",
//   mentors: [
//     {
//       index: "int",
//       fullName: "string",
//     },
//   ],
//   theme: {
//     top3: "string",
//     hilight: "string",
//   },
//   learnerGroups: [
//     {
//       groupName: "string",
//       avatar: "string",
//       points: {
//         taskIndex: "int",
//         taskPoint: "int",
//       },
//     },
//   ],
//   tasks: [
//     {
//       taskName: "string",
//       subTasks: [
//         {
//           subTaskName: "string",
//           point: "int",
//           isHidden: "bool",
//         },
//       ],
//       showSubTasks: "bool",
//       point: "int",
//       weight: "int",
//       isHidden: "bool",
//     },
//   ],
// };

function NewProject() {
  const [project, setProject] = useState({
    createdAt: new Date(),
    imageUrl: require("../../assets/images/uploadImage.png"),
    projectName: "",
    mentors: [],
    theme: {
      top3: "#000000",
      hilight: "#000000",
    },
    learnerGroups: [],
    tasks: [],
  });
  const [createProjectStatus, setCreateProjectStatus] = useState("editing");

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
            สร้างโปรเจคสำเร็จ!
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
            กำลังสร้างโปรเจค ...
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
            เกิดข้อผิดพลาดในการสร้างโปรเจค
          </Alert>
        </Collapse>
      </Box>
      <NewProjectHeader
        project={project}
        setProject={setProject}
        header={"NEW PROJECT"}
      />
      <NewProjectBody project={project} setProject={setProject} />
      <NewProjectFooter
        project={project}
        setProject={setProject}
        header={"NEW PROJECT"}
        setCreateProjectStatus={setCreateProjectStatus}
      />
    </div>
  );
}

export default NewProject;
