import React from "react";
import { Stack } from "@mui/material";
import "../../../assets/styles/EditNewProject.css";
import NewMentor from "./NewMentor";
import NewLearner from "./NewLearner";
import NewEditTask from "./NewEditTask";

function EditProjectBody({ project, setProject }) {
  return (
    <Stack
      width="70%"
      marginTop={"3%"}
      alignItems="center"
      flexDirection={"columns"}
    >
      <NewMentor project={project} setProject={setProject} />
      <NewLearner project={project} setProject={setProject} />
      <NewEditTask project={project} setProject={setProject} />
    </Stack>
  );
}

export default EditProjectBody;
