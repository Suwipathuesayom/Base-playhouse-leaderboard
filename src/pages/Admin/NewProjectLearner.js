import React, { useState } from "react";
import { AddCircle, Done, DriveFileRenameOutline } from "@mui/icons-material";
import { Box, InputBase, Stack, Typography } from "@mui/material";

import color from "../../constant/color";
import "../../assets/Styles/NewProject.css";

function NewProjectLearner() {
  const [learnerList, setLearnerList] = useState([
    {
      groupName: "Believer",
    },
    {
      groupName: "ความรักทำให้คนตาบอด",
    },
    {
      groupName: "Thunder",
    },
    {
      groupName: "เล่นของสูง",
    },
    {
      groupName: "Demons",
    },
    {
      groupName: "Avengers",
    },
  ]);
  const [newGroup, setNewGroup] = useState("");

  // State Handlers
  const handleAddNewLearnerGroup = (newGroup) => {
    let tempLearnerList = [...learnerList];
    tempLearnerList[tempLearnerList.length] = {
      groupName: newGroup,
    };
    setLearnerList(tempLearnerList);
    // Clear TextInput To Blank
    setNewGroup("");
  };

  const LearnerBox = ({ index, groupName, lastGroup = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newGroupName, setNewGroupName] = useState(groupName);
    const TEXTMAXSAFELENGTH = 15;

    const handleRenameGroup = (index, newGroupName) => {
      let tempLearnerList = [...learnerList];
      tempLearnerList[index].groupName = newGroupName;
      setLearnerList(tempLearnerList);
    };
    return (
      <Stack
        width={"100%"}
        height={"70px"}
        sx={
          lastGroup && {
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }
        }
        flexDirection="row"
        alignItems={"center"}
        justifyContent={"space-evenly"}
        bgcolor={!!!(index % 2) ? color.secondaryBlack : color.primaryBlack}
      >
        <Stack
          width={"75%"}
          // height={"70px"}
          flexDirection="row"
          alignItems={"center"}
          // justifyContent={"space-evenly"}
          //   backgroundColor={"cyan"}
        >
          <Typography
            sx={{
              flexShrink: 1,
              textAlign: "center",
              fontSize: 28,
              fontWeight: 400,
              marginRight: "10px",
              color: color.primaryOrange,
              //   backgroundColor: "yellow",
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
                //   backgroundColor: "lime",
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
                flexGrow: 1,
                padding: "0 10px",
                // marginRight: "20px",
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
      <Box sx={{ height: "50vh", backgroundColor: "pink" }}>
        <Stack
          width={"100%"}
          height={"70px"}
          flexDirection="row"
          alignItems={"center"}
          justifyContent={"space-evenly"}
          bgcolor={color.primaryBlack}
        >
          <InputBase
            sx={{
              width: "75%",
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
        {learnerList.map((learnerGroup, index) => (
          <LearnerBox
            index={index}
            groupName={learnerGroup.groupName}
            lastGroup={index + 1 === learnerList.length}
          />
        ))}
      </Box>
    </Box>
  );
}

export default NewProjectLearner;
