import React, { useState } from "react";
import "./AdminProject.css";
import { useParams } from "react-router-dom";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import queryProjectFromProjectName from "../../components/Functions/queryProjectFromProjectName";
import SplashScreen from "../../components/SplashScreen";
import ProjectImage from "../../components/ProjectImage";
import ProjectMentor from "../../components/ProjectMentor";
import ProjectTheme from "../../components/ProjectTheme";
import ProjectTask from "../../components/ProjectTask";
import ProjectLearner from "../../components/ProjectLearner";
import ProjectFooter from "../../components/ProjectFooter";
import ProjectName from "../../components/ProjectName";
import Navbar from "../../components/Navbar";
import ProjectStatusAlert from "../../components/ProjectStatusAlert";

const AdminProject = () => {
  const { projectNameParams } = useParams();
  // const [project, setProject] = useState({
  //   createdAt: new Date(),
  //   id: "A0Z721kn9nJ7Ybf8UdTP",
  //   imageUrl:
  //     "https://img.wongnai.com/p/1920x0/2019/12/22/21c03802af7748469653324cea1b533e.jpg",
  //   learnerGroups: [
  //     {
  //       avatar: "https://source.unsplash.com/random/64x64/?avatar",
  //       groupIndex: 1,
  //       groupName: "Avengers",
  //       points: [
  //         {
  //           isHidden: false,
  //           subTasks: [],
  //           taskPoint: 1, // 0.8
  //         },
  //         {
  //           isHidden: false,
  //           subTasks: [
  //             {
  //               isHidden: false,
  //               subTaskPoint: 2, // 0.3
  //             },
  //             {
  //               isHidden: true,
  //               subTaskPoint: 3, // 0.15
  //             },
  //           ],
  //           taskPoint: 2,
  //         },
  //       ],
  //       totalPoint: 3,
  //       totalWeightPoint: 1.25,
  //     },
  //   ],
  //   mentors: [
  //     {
  //       fullName: "Stan Lee",
  //       index: 0,
  //     },
  //     {
  //       fullName: "Adam WestVieeelllelele",
  //       index: 1,
  //     },
  //   ],
  //   projectName: "Marvel",
  //   tasks: [
  //     {
  //       isHidden: false,
  //       showSubTasks: true,
  //       subTasks: [],
  //       taskName: "Bannish Loki",
  //       weight: 80,
  //     },
  //     {
  //       isHidden: false,
  //       showSubTasks: true,
  //       subTasks: [
  //         {
  //           isHidden: false,
  //           subTaskName: "Lift Sokovia",
  //           weight: 15,
  //         },
  //         {
  //           isHidden: true,
  //           subTaskName: "Vision is born",
  //           weight: 5,
  //         },
  //       ],
  //       taskName: "Defeat Ultron",
  //       weight: 15,
  //     },
  //   ],
  //   theme: {
  //     hilight: "#00ff00",
  //     top3: "#ff0000",
  //   },
  // });
  const [project, setProject] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [projectStatus, setProjectStatus] = useState("warning");
  const [projectAlertText, setProjectAlertText] = useState("");
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  if (!!Object.keys(project).length) {
    return (
      <div className="adminProject__container">
        <Navbar header={`${project.id ? "EDIT" : "NEW"} PROJECT`} />
        <Button
          onClick={() => {
            console.log(project);
          }}
        >
          ดู Project
        </Button>
        <div
          className={`adminProject__${smallScreen ? "column" : "row"}Container`}
        >
          <div className="adminProject__alert">
            <ProjectStatusAlert
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              projectStatus={projectStatus}
              setProjectStatus={setProjectStatus}
              projectAlertText={projectAlertText}
              action={project.id ? "edit" : "new"}
            />
          </div>
          <div
            className={`adminProject__${smallScreen ? "top" : "left"}Content`}
          >
            <ProjectName project={project} setProject={setProject} />
            <ProjectImage project={project} setProject={setProject} />
            <ProjectTheme project={project} setProject={setProject} />
          </div>
          <div
            className={`adminProject__${
              smallScreen ? "bottom" : "right"
            }Content`}
          >
            <ProjectMentor project={project} setProject={setProject} />
            <ProjectLearner project={project} setProject={setProject} />
            <ProjectTask
              project={project}
              setProject={setProject}
              setProjectStatus={setProjectStatus}
            />
          </div>
        </div>
        <ProjectFooter
          project={project}
          setProject={setProject}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          setProjectStatus={setProjectStatus}
          setProjectAlertText={setProjectAlertText}
        />
      </div>
    );
  } else {
    if (projectNameParams) {
      queryProjectFromProjectName(projectNameParams, setProject);
    } else {
      setProject({
        imageUrl: "/static/media/uploadImage.7f6e4102b5851897986b.png",
        learnerGroups: [],
        mentors: [],
        projectName: "",
        tasks: [],
        theme: {
          hilight: "#000000",
          top3: "#000000",
        },
      });
    }
    return <SplashScreen />;
  }
};

export default AdminProject;
