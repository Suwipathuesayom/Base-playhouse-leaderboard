import { Done, DriveFileRenameOutline } from "@mui/icons-material";
import { InputAdornment, Stack } from "@mui/material";
import React, { useState } from "react";
import { ColorInput, TextInput } from "../../assets/styles/InputStyles";
import { ContentText, HeaderText } from "../../assets/styles/TypographyStyles";
import color from "../../constant/color";

function NewProjectNameAndColor({ project, setProject }) {
  const [isEditing, setIsEditing] = useState(
    project.projectName ? false : true
  );
  const [projectName, setProjectName] = useState(
    project.projectName ? project.projectName : ""
  );
  const getProjectName = () => {
    return projectName === "" ? projectName : project.projectName;
  };
  const [top3Color] = useState(
    project.theme.top3 ? project.theme.top3 : "#000000"
  );
  const [hilightColor] = useState(
    project.theme.hilight ? project.theme.hilight : "#000000"
  );
  const [newProjectName, setNewProjectName] = useState(
    project.projectName ? project.projectName : ""
  );

  //   State Handler
  const handleRemaneProjectName = (newProjectName) => {
    let tempProject = project;
    tempProject.projectName = newProjectName;
    setProject(tempProject);

    setProjectName(newProjectName);
    setIsEditing(false);
  };
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
    <Stack
      width={"100%"}
      height={"70px"}
      sx={{ borderRadius: 2, padding: "0 20px" }}
      flexDirection="row"
      alignItems={"center"}
      bgcolor={color.secondaryBlack}
    >
      <HeaderText width={180}>ชื่อโปรเจค</HeaderText>
      {isEditing && (
        <TextInput
          width={500}
          onKeyPress={(event) => {
            if (event.key === "Enter")
              handleRemaneProjectName(event.target.value);
          }}
          onChange={(event) => setNewProjectName(event.target.value)}
          defaultValue={getProjectName()}
        />
      )}
      {!isEditing && <ContentText width={500}>{getProjectName()}</ContentText>}
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
      <ColorInput
        type={"color"}
        width={180}
        defaultValue={top3Color === "#000000" ? top3Color : project.theme.top3}
        onBlur={(event) => handleTopThreeColorChange(event.target.value)}
        startAdornment={
          <InputAdornment position="start">{"TOP 3 COLOR"}</InputAdornment>
        }
      />
      <ColorInput
        type={"color"}
        width={270}
        defaultValue={
          hilightColor === "#000000" ? hilightColor : project.theme.hilight
        }
        onBlur={(event) => handleHilightColorChange(event.target.value)}
        startAdornment={
          <InputAdornment position="start">
            {"LEARNER HILIGHT COLOR"}
          </InputAdornment>
        }
      />
    </Stack>
  );
}

export default NewProjectNameAndColor;
