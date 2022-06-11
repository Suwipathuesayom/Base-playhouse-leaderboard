import React from "react";
import { Stack } from "@mui/material";
import "../../assets/Styles/NewProject.css";
import NewProjectLearner from "./NewProjectLearner";
import NewProjectTask from "./NewProjectTask";

function NewProjectBody() {
  return (
    <Stack
      minWidth={"1500px"}
      marginTop={"10px"}
      flexDirection={"row"}
      height={"65vh"}
      minHeight={"500px"}
      // bgcolor="orange"
    >
      <NewProjectLearner />
      <NewProjectTask />
    </Stack>
  );
}

export default NewProjectBody;
