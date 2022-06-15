import React, { useState } from "react";
import {
  AddCircle,
  Delete,
  Done,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import { Box, InputBase, Stack, Typography } from "@mui/material";

import color from "../../constant/color";
import "../../assets/styles/NewProject.css";

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
      totalPoint: -1,
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
      totalPoint: -1,
      groupIndex: -1,
      groupName: newGroup,
      avatar: generateUnsplashImage(),
      points: [],
    };
    for (let i = 0; i < tempProject.learnerGroups.length; i++) {
      tempProject.learnerGroups[i].groupIndex = i + 1;
    }
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
    const TEXTMAXSAFELENGTH = 20;

    const handleRenameGroup = (index, newGroupName) => {
      // handle UI State
      let tempLearnerGroups = [...learnerGroups];
      tempLearnerGroups[index].groupName = newGroupName;
      setLearnerGroups(tempLearnerGroups);
      // handle Data State
      let tempProject = project;
      tempProject.learnerGroups[index].groupName = newGroupName;
      setProject(tempProject);
      console.log(tempProject);
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
      console.log(tempProject);
    };
    return (
      <Stack
        width={"100%"}
        height={"70px"}
        sx={{
          borderBottomLeftRadius: lastGroup ? 20 : null,
          borderBottomRightRadius: lastGroup ? 20 : null,
        }}
        flexDirection="row"
        alignItems={"center"}
        justifyContent={"space-evenly"}
        bgcolor={!!!(index % 2) ? color.secondaryBlack : color.primaryBlack}
      >
        <Stack
          width={"60%"}
          // height={"70px"}
          flexDirection="row"
          alignItems={"center"}
          // justifyContent={"space-evenly"}
          // backgroundColor={"cyan"}
        >
          <Typography
            sx={{
              flexShrink: 1,
              textAlign: "center",
              fontSize: 28,
              fontWeight: 400,
              marginRight: "10px",
              color: color.primaryOrange,
              // backgroundColor: "yellow",
            }}
          >
            {index + 1}
          </Typography>
          {!isEditing && (
            <Typography
              sx={{
                flexGrow: 1,
                //   textAlign: "center",
                fontSize: 24,
                fontWeight: 400,
                color: color.secondaryGrey,
                // backgroundColor: "lime",
              }}
            >
              {groupName.length > TEXTMAXSAFELENGTH
                ? groupName.slice(0, TEXTMAXSAFELENGTH - 1) + "..."
                : groupName}
            </Typography>
          )}
          {isEditing && (
            <InputBase
              type={"text"}
              sx={{
                // flexShrink: 1,
                maxWidth: 160,
                padding: "0 10px",
                borderRadius: 2,
                fontSize: 20,
                backgroundColor: "white",
              }}
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
            // marginRight: "20px",
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
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        flexDirection="row"
        alignItems={"center"}
        justifyContent={"center"}
        bgcolor={color.secondaryBlack}
      >
        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: 32,
            fontWeight: 600,
            color: color.primaryOrange,
          }}
        >
          กลุ่ม Learner
        </Typography>
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "column", flexShrink: 1 }}>
        <Stack
          width={"100%"}
          height={"70px"}
          sx={{
            borderBottomLeftRadius: !!!learnerGroups?.length ? 20 : null,
            borderBottomRightRadius: !!!learnerGroups?.length ? 20 : null,
          }}
          flexDirection="row"
          alignItems={"center"}
          justifyContent={"space-evenly"}
          bgcolor={color.primaryBlack}
        >
          <InputBase
            sx={{
              width: "70%",
              borderRadius: 2,
              padding: "0 10px",
              fontSize: 20,
              backgroundColor: "white",
            }}
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
