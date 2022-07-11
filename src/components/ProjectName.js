import { TextField } from "@mui/material";
import React from "react";
import ProjectHeader from "./ProjectHeader";
// import "./ProjectName.css";
import "../pages/Admin/AdminProject.css";

const ProjectName = ({ project, setProject }) => {
  const handleChangeProjectName = (newValue) => {
    let tempProject = project;
    tempProject.projectName = newValue;
    setProject(tempProject);
  };

  return (
    <div className="adminProject__boxContainer">
      <ProjectHeader>Project Name</ProjectHeader>
      <TextField
        sx={{ bgcolor: "white", borderRadius: "5px" }}
        fullWidth
        size="small"
        placeholder={"project name"}
        defaultValue={project.projectName}
        onChange={(event) => {
          handleChangeProjectName(event.target.value);
        }}
      />
    </div>
  );
};

export default ProjectName;
