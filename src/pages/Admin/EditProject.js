import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { db } from "../../config/firebase";
import "../../assets/styles/NewProject.css";
import NewProjectHeader from "./NewProjectHeader";
import NewProjectFooter from "./NewProjectFooter";
import NewProjectBody from "./NewProjectBody";
import SplashScreen from "../../components/SplashScreen";
import ProjectStatusAlert from "../../components/ProjectStatusAlert";

function EditProject() {
  const { projectName } = useLocation().state;
  const [project, setProject] = useState(null);
  const [editProjectStatus, setEditProjectStatus] = useState("warning");

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
        <ProjectStatusAlert
          editProjectStatus={editProjectStatus}
          setEditProjectStatus={setEditProjectStatus}
          action={"edit"}
        />
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
          setEditProjectStatus={setEditProjectStatus}
        />
      </div>
    );
  } else {
    queryProject(projectName);
    return <SplashScreen />;
  }
}

export default EditProject;
