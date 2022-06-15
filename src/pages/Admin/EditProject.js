import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import "../../assets/styles/NewProject.css";
import NewProjectHeader from "./NewProjectHeader";
import NewProjectFooter from "./NewProjectFooter";
import NewProjectBody from "./NewProjectBody";
import { SyncLoader } from "react-spinners";
import {
  Alert,
  Box,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import color from "../../constant/color";

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

function EditProject() {
  // const [project, setProject] = useState({
  //   createdAt: new Date(),
  //   imageUrl:
  //     "https://i.pinimg.com/originals/7d/bf/df/7dbfdf56a94c044e0684aba891816a37.jpg",
  //   projectName: "Marvel",
  //   mentors: [
  //     {
  //       index: 1,
  //       fullName: "Stan Lee",
  //     },
  //     {
  //       index: 2,
  //       fullName: "Thanat Raktham",
  //     },
  //   ],
  //   theme: {
  //     top3: "#ff0000",
  //     hilight: "#ffffff",
  //   },
  //   learnerGroups: [
  //     {
  //       groupName: "Avengers",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
  //     },
  //     {
  //       groupName: "Inhumans",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
  //     },
  //     {
  //       groupName: "X-men",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
  //     },
  //   ],
  //   tasks: [
  //     {
  //       taskName: "สู้ Alien บุกโลก",
  //       subTasks: [
  //         {
  //           subTaskName: "ยืนล้อมวงเท่",
  //           point: 2,
  //           isHidden: false,
  //         },
  //         {
  //           subTaskName: "จับ Loki",
  //           point: 7,
  //           isHidden: false,
  //         },
  //       ],
  //       showSubTasks: false,
  //       point: 9,
  //       weight: 10,
  //       isHidden: false,
  //     },
  //     {
  //       taskName: "เอาชนะ Ultron",
  //       subTasks: [
  //         {
  //           subTaskName: "ยกเมืองขึ้นฟ้า",
  //           point: 1,
  //           isHidden: false,
  //         },
  //         {
  //           subTaskName: "เอาเมืองไปไว้ที่เดิม",
  //           point: 1,
  //           isHidden: true,
  //         },
  //       ],
  //       showSubTasks: false,
  //       point: 2,
  //       weight: 20,
  //       isHidden: false,
  //     },
  //   ],
  // });
  const [project, setProject] = useState(null);
  const [createProjectStatus, setCreateProjectStatus] = useState("editing");

  useEffect(() => {
    const queryProject = async () => {
      await db
        .collection("users")
        .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
        .collection("project")
        .where("projectName", "==", "Bruno Mars")
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
    queryProject();
  }, []);

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
  } else if (project === {}) {
    return (
      <React.Fragment>
        <Stack
          sx={{
            bgcolor: "#dcdfe1",
            width: "100vw",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography
            variant={"h2"}
            sx={{
              marginTop: 5,
              color: color.primaryBlack,
            }}
          >
            404 NOT FOUND
          </Typography>
        </Stack>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Stack
          sx={{
            bgcolor: "#dcdfe1",
            width: "100vw",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <SyncLoader
            color={color.primaryOrange}
            backgroundColor={"pink"}
            size={25}
          />
          <Typography
            variant={"h2"}
            sx={{
              marginTop: 5,
              color: color.primaryBlack,
            }}
          >
            Loading
          </Typography>
        </Stack>
      </React.Fragment>
    );
  }
}

export default EditProject;
