import React, { useState } from "react";

import "../../assets/styles/NewProject.css";
import NewProjectHeader from "./NewProjectHeader";
import NewProjectFooter from "./NewProjectFooter";
import NewProjectBody from "./NewProjectBody";
import ProjectStatusAlert from "../../components/ProjectStatusAlert";
import NavbarNewproject from "../../components/NavbarNewproject";

const NewProject = () => {
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
  const [editProjectStatus, setEditProjectStatus] = useState("warning");

  return (
    <div className="newProject">
      <div className="alert">
        <ProjectStatusAlert
          editProjectStatus={editProjectStatus}
          setEditProjectStatus={setEditProjectStatus}
          action={"new"}
        />
      </div>
      <NavbarNewproject />
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
        setEditProjectStatus={setEditProjectStatus}
      />
    </div>
  );
};

export default NewProject;
