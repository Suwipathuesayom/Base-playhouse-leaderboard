import React from "react";
import { Stack } from "@mui/material";
import "../../../assets/styles/EditNewProject.css";
import NewMentor from "./NewMentor";
import NewLearner from "./NewLeaner";
import NewEditTask from "./NewEditTask";

function EditProjectBody({ project, setProject }) {
  return (
    <Stack
      width="70%"
      marginTop={"3%"}
      alignItems="center"
      flexDirection={"columns"}
    >
      <NewMentor />
      <NewLearner />
      <NewEditTask />
    </Stack>
  );
}

export default EditProjectBody;
