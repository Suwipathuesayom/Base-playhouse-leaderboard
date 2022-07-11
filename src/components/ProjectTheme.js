import { InputAdornment } from "@mui/material";
import React from "react";
import { ColorInput } from "../assets/styles/InputStyles";
import ProjectHeader from "./ProjectHeader";
import "../pages/Admin/AdminProject.css";

const ProjectTheme = ({ project, setProject }) => {
  const handleTopThreeColorChange = (newColor) => {
    let tempProject = project;
    tempProject.theme.top3 = newColor;
    setProject(tempProject);
  };
  const handleHilightColorChange = (newColor) => {
    let tempProject = project;
    tempProject.theme.hilight = newColor;
    setProject(tempProject);
  };

  return (
    <div className={`adminProject__boxContainer`}>
      <ProjectHeader>Project Theme</ProjectHeader>
      <div className={`projectTheme__input`}>
        <ColorInput
          type={"color"}
          width={300}
          defaultValue={project.theme.top3}
          onBlur={(event) => handleTopThreeColorChange(event.target.value)}
          startAdornment={
            <InputAdornment position="start">
              {"TOP 3 RANK COLOR"}
            </InputAdornment>
          }
        />
        <ColorInput
          type={"color"}
          width={300}
          defaultValue={project.theme.hilight}
          onBlur={(event) => handleHilightColorChange(event.target.value)}
          startAdornment={
            <InputAdornment position="start">
              {"LEARNER HILIGHT COLOR"}
            </InputAdornment>
          }
        />
      </div>
    </div>
  );
};

export default ProjectTheme;
