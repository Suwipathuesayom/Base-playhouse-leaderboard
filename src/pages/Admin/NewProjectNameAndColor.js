import { Done, DriveFileRenameOutline } from "@mui/icons-material";
import { InputAdornment, InputBase, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import color from "../../constant/color";

function NewProjectNameAndColor({ project, setProject }) {
  const [isEditing, setIsEditing] = useState(
    project.projectName ? false : true
  );
  const [projectName, setProjectName] = useState(
    project.projectName ? project.projectName : ""
  );
  const [newProjectName, setNewProjectName] = useState("");

  //   State Handler
  const handleRemaneProjectName = (newProjectName) => {
    // let tempProject = project;
    // tempProject.projectName = newProjectName;
    // setProject(tempProject);
    // console.log(tempProject);

    // setProjectName(newProjectName);
    // setIsEditing(false);

    let tempProject = project;
    tempProject.projectName = newProjectName;
    setProject(tempProject);
    console.log("Edited Project:", tempProject);

    setProjectName(newProjectName);
    setIsEditing(false);
  };
  const handleTopThreeColorChange = (newColor) => {
    let tempProject = project;
    tempProject.theme.top3 = newColor;
    setProject(tempProject);
    console.log(tempProject);
  };
  const handleHilightColorChange = (newColor) => {
    let tempProject = project;
    tempProject.theme.hilight = newColor;
    setProject(tempProject);
    console.log(tempProject);
  };
  return (
    <Stack
      width={"100%"}
      height={"70px"}
      sx={{ borderRadius: 5, padding: "0 20px" }}
      flexDirection="row"
      alignItems={"center"}
      bgcolor={color.secondaryBlack}
    >
      <Typography
        sx={{
          width: 180,
          fontSize: 32,
          fontWeight: 600,
          fontFamily: "Prompt",
          marginRight: "20px",
          color: color.primaryOrange,
          // backgroundColor: "red",
        }}
      >
        ชื่อโปรเจค
      </Typography>
      {isEditing && (
        <InputBase
          sx={{
            width: 500,
            padding: "0 10px",
            marginRight: "20px",
            borderRadius: 2,
            fontSize: 20,
            backgroundColor: "white",
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter")
              handleRemaneProjectName(event.target.value);
          }}
          onChange={(event) => setNewProjectName(event.target.value)}
          defaultValue={projectName}
        />
      )}
      {!isEditing && (
        <Typography
          sx={{
            width: 500,
            padding: "0 10px",
            marginRight: "20px",
            //   flexGrow: 1,
            //   textDecoration: isHidden && "line-through",
            //   textAlign: "center",
            fontSize: 24,
            fontWeight: 400,
            color: color.secondaryGrey,

            //   backgroundColor: "lime",
          }}
        >
          {projectName}
        </Typography>
      )}
      {isEditing && (
        <Done
          className="newProject__icon"
          style={{
            fontSize: 28,
            color: !!!newProjectName.length
              ? color.secondaryGrey
              : color.primaryOrange,
            marginRight: 20,
            // backgroundColor: "orange",
          }}
          onClick={() => {
            if (!!newProjectName.length)
              handleRemaneProjectName(newProjectName);
          }}
        />
      )}
      {!isEditing && (
        <DriveFileRenameOutline
          className="newProject__icon"
          style={{
            fontSize: 28,
            color: color.primaryOrange,
            marginRight: 20,
            // backgroundColor: "orange",
          }}
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        />
      )}
      <InputBase
        type={"color"}
        sx={{
          width: 180,
          padding: "0 10px",
          marginRight: "20px",
          borderRadius: 2,
          fontSize: 20,
          backgroundColor: "white",
        }}
        defaultValue={
          project.theme.top3 !== "#000000" ? project.theme.top3 : "#000000"
        }
        onBlur={(event) => handleTopThreeColorChange(event.target.value)}
        startAdornment={
          <InputAdornment position="start">TOP 3 COLOR</InputAdornment>
        }
      />
      <InputBase
        type={"color"}
        sx={{
          width: 270,
          padding: "0 10px",
          marginRight: "20px",
          borderRadius: 2,
          fontSize: 20,
          backgroundColor: "white",
        }}
        defaultValue={
          project.theme.hilight !== "#000000"
            ? project.theme.hilight
            : "#000000"
        }
        onBlur={(event) => handleHilightColorChange(event.target.value)}
        startAdornment={
          <InputAdornment position="start">
            LEARNER HILIGHT COLOR
          </InputAdornment>
        }
      />
    </Stack>
  );
}

export default NewProjectNameAndColor;
