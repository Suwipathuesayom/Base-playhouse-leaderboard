import React, { useState } from "react";
import {
  AddCircle,
  Delete,
  Done,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import { Box, Stack } from "@mui/material";

import color from "../../constant/color";
import "../../assets/styles/NewProject.css";
import {
  ContentText,
  HeaderText,
  NumberText,
} from "../../assets/styles/TypographyStyles";
import { TextInput } from "../../assets/styles/InputStyles";
import limitStringLength from "../../components/Functions/limitStringLength";
import getBackgroundColorFromIndex from "../../components/Functions/getBackgroundColorFromIndex";

function NewProjectLearner({ project, setProject }) {
  const [learnerGroups, setLearnerGroups] = useState(
    !!project.learnerGroups.length ? [...project.learnerGroups] : []
  );
  const [newGroup, setNewGroup] = useState("");

  // State Handlers
  const handleAddNewLearnerGroup = (newGroup) => {
    // handle UI State
    let tempLearnerGroups = [...learnerGroups];
    tempLearnerGroups[tempLearnerGroups.length] = {
      totalPoint: 0,
      groupIndex: -1,
      groupName: newGroup,
      avatar: generateUnsplashImage(),
      points: [],
    };
    for (let i = 0; i < tempLearnerGroups.length; i++) {
      tempLearnerGroups[i].groupIndex = i + 1;
    }
    setLearnerGroups(tempLearnerGroups);
    // handle Data State
    let tempProject = project;
    tempProject.learnerGroups[tempProject.learnerGroups.length] = {
      totalPoint: 0,
      groupIndex: -1,
      groupName: newGroup,
      avatar: generateUnsplashImage(),
      points: [],
    };
    for (let i = 0; i < tempProject.learnerGroups.length; i++) {
      tempProject.learnerGroups[i].groupIndex = i + 1;
    }
    tempProject.tasks.forEach(() => {
      tempProject.learnerGroups[
        tempProject.learnerGroups.length - 1
      ].points.push({});
    });
    setProject(tempProject);
    // callback
    console.log(tempProject);
    // clear TextInput
    setNewGroup("");
  };

  const generateUnsplashImage = (query) =>
    `https://source.unsplash.com/random/64x64/?${query ?? "avatar"}`;

  const LearnerBox = ({ index, groupName, lastGroup = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newGroupName, setNewGroupName] = useState(groupName);
    const TEXTMAXSAFELENGTH = 11;

    const handleRenameGroup = (index, newGroupName) => {
      // handle UI State
      let tempLearnerGroups = [...learnerGroups];
      tempLearnerGroups[index].groupName = newGroupName;
      setLearnerGroups(tempLearnerGroups);
      // handle Data State
      let tempProject = project;
      tempProject.learnerGroups[index].groupName = newGroupName;
      setProject(tempProject);
    };
    const handleRemoveLearnerGroup = (index) => {
      // handle UI State
      let tempLearnerGroups = [...learnerGroups];
      tempLearnerGroups.splice(index, 1);
      for (let i = 0; i < tempLearnerGroups.length; i++) {
        tempLearnerGroups[i].groupIndex = i + 1;
      }
      setLearnerGroups(tempLearnerGroups);
      // handle Data State
      let tempProject = project;
      tempProject.learnerGroups.splice(index, 1);
      for (let i = 0; i < tempProject.learnerGroups.length; i++) {
        tempProject.learnerGroups[i].groupIndex = i + 1;
      }
      setProject(tempProject);
      // callback
    };
    return (
      <Stack
        width={"100%"}
        height={"70px"}
        sx={{
          borderBottomLeftRadius: lastGroup ? 8 : null,
          borderBottomRightRadius: lastGroup ? 8 : null,
        }}
        flexDirection="row"
        alignItems={"center"}
        justifyContent={"space-evenly"}
        bgcolor={getBackgroundColorFromIndex(index + 1)}
      >
        <Stack width={"60%"} flexDirection="row" alignItems={"center"}>
          <NumberText>{index + 1}</NumberText>
          {!isEditing && (
            <ContentText flexGrow={1}>
              {limitStringLength(groupName, TEXTMAXSAFELENGTH)}
            </ContentText>
          )}
          {isEditing && (
            <TextInput
              width={160}
              marginright={0}
              type={"text"}
              defaultValue={groupName}
              onKeyPress={(event) => {
                if (event.key === "Enter")
                  handleRenameGroup(index, event.target.value);
              }}
              onChange={(event) => setNewGroupName(event.target.value)}
              onBlur={(event) => handleRenameGroup(index, event.target.value)}
            />
          )}
        </Stack>
        {isEditing && (
          <Done
            className="newProject__icon"
            style={{
              fontSize: 28,
              color: color.primaryOrange,
              // backgroundColor: "orange",
            }}
            onClick={() => {
              handleRenameGroup(index, newGroupName);
            }}
          />
        )}
        {!isEditing && (
          <DriveFileRenameOutline
            className="newProject__icon"
            style={{
              fontSize: 28,
              color: color.primaryOrange,
              // backgroundColor: "orange",
            }}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
        )}
        <Delete
          className="newProject__icon"
          style={{
            fontSize: 40,
            color: color.primaryOrange,
            // backgroundColor: "pink",
          }}
          onClick={() => handleRemoveLearnerGroup(index)}
        />
      </Stack>
    );
  };
  return (
    <Box sx={{ minWidth: 300 }}>
      <Stack
        width={"100%"}
        height={"70px"}
        sx={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        flexDirection="row"
        alignItems={"center"}
        justifyContent={"center"}
        bgcolor={color.secondaryBlack}
      >
        <HeaderText textAlign={"center"} marginright={0}>
          กลุ่ม Learner
        </HeaderText>
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "column", flexShrink: 1 }}>
        <Stack
          width={"100%"}
          height={"70px"}
          sx={{
            borderBottomLeftRadius: !!!learnerGroups?.length ? 8 : null,
            borderBottomRightRadius: !!!learnerGroups?.length ? 8 : null,
          }}
          flexDirection="row"
          alignItems={"center"}
          justifyContent={"space-evenly"}
          bgcolor={color.primaryBlack}
        >
          <TextInput
            width={"70%"}
            marginright={0}
            value={newGroup}
            onKeyPress={(event) => {
              if (event.key === "Enter" && !!newGroup.length) {
                handleAddNewLearnerGroup(event.target.value);
              }
            }}
            onChange={(event) => setNewGroup(event.target.value)}
          />
          <AddCircle
            className="newProject__icon"
            style={{
              fontSize: 40,
              color: !!newGroup.length
                ? color.primaryOrange
                : color.secondaryGrey,
            }}
            onClick={() => {
              if (!!newGroup.length) handleAddNewLearnerGroup(newGroup);
            }}
          />
        </Stack>
        {learnerGroups?.map((learnerGroup, index) => (
          <LearnerBox
            key={index}
            index={index}
            groupName={learnerGroup.groupName}
            lastGroup={index + 1 === learnerGroups.length}
          />
        ))}
      </Box>
    </Box>
  );
}

export default NewProjectLearner;
