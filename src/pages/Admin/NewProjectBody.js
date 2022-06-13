import React from "react";
import { Stack } from "@mui/material";
import "../../assets/styles/NewProject.css";
import NewProjectLearner from "./NewProjectLearner";
import NewProjectTask from "./NewProjectTask";

function NewProjectBody({ project, setProject }) {
  return (
    <Stack
      minWidth={"1500px"}
      marginTop={"10px"}
      paddingX={"1%"}
      marginBottom={"20%"}
      flexDirection={"row"}
      height={"70vh"}
    >
      <NewProjectLearner project={project} setProject={setProject} />
      <NewProjectTask project={project} setProject={setProject} />
    </Stack>
  );
}

export default NewProjectBody;
