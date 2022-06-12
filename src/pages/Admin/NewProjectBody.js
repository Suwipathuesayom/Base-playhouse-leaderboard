import React from "react";
import { Stack } from "@mui/material";
import "../../assets/Styles/NewProject.css";
import NewProjectLearner from "./NewProjectLearner";
import NewProjectTask from "./NewProjectTask";

function NewProjectBody({ project, setProject }) {
  return (
    <Stack
      minWidth={"1500px"}
      marginTop={"10px"}
      flexDirection={"row"}
      minHeight={"500px"}
    >
      <NewProjectLearner project={project} setProject={setProject} />
      <NewProjectTask project={project} setProject={setProject} />
    </Stack>
  );
}

export default NewProjectBody;
