import { AddCircle, HighlightOff } from "@mui/icons-material";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { TextInput } from "../../assets/styles/InputStyles";
import { HeaderText } from "../../assets/styles/TypographyStyles";
import MentorButton from "../../components/MentorButton";
import color from "../../constant/color";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function NewProjectAddMentor({ project, setProject }) {
  const [mentorList, setMentorList] = useState(
    !!project.mentors.length ? [...project.mentors] : []
  );
  const [mentorName, setMentorName] = useState("");

  // function copy here
  const copyToClipBoard = async (copyMe, setCopyFunction) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopyFunction("Copied!");
    } catch (err) {
      setCopyFunction("Failed to copy!");
    }
  };

  //   State Handler
  const handleAddMentor = (mentorName) => {
    // handle Data State
    let tempProject = project;
    tempProject.mentors.push({
      index: tempProject.mentors.length,
      fullName: mentorName,
    });
    setProject(tempProject);
    // handle UI State
    let tempMentorList = [...mentorList];
    tempMentorList.push({
      index: mentorList.length,
      fullName: mentorName,
    });
    setMentorList(tempMentorList);

    // clear TextInput
    setMentorName("");
  };
  const handleRemoveMentor = (index) => {
    let tempProject = project;
    tempProject.mentors.splice(index, 1);
    setProject(tempProject);

    let tempMentorList = [...mentorList];
    tempMentorList.splice(index, 1);
    setMentorList(tempMentorList);
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
      <HeaderText width={180}>เพิ่ม Mentor</HeaderText>
      <TextInput
        width={"30%"}
        value={mentorName}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleAddMentor(event.target.value);
          }
        }}
        onChange={(event) => setMentorName(event.target.value)}
      />
      <AddCircle
        className="newProject__icon"
        style={{
          fontSize: 40,
          color: !!mentorName.length
            ? color.primaryOrange
            : color.secondaryGrey,
          marginRight: 20,
        }}
        onClick={() => handleAddMentor(mentorName)}
      />
      {mentorList?.map((mentor, index) => (
        <MentorButton
          key={index}
          variant="contained"
          sx={{
            ":hover": {
              bgcolor: "white",
            },
          }}
          startIcon={
            <HighlightOff
              onClick={() => handleRemoveMentor(index)}
              style={{ fontSize: 32 }}
              sx={{
                ":hover": {
                  color: "#f44336",
                },
              }}
            />
          }
          endIcon={
            <ContentCopyIcon
              onClick={() => {
                copyToClipBoard(
                  `https://base-playhouse-leader-board.web.app/mentor/${project.projectName}/${mentor.fullName}`
                );
              }}
              style={{ fontSize: 25 }}
              sx={{
                ":hover": {
                  color: "blue",
                },
              }}
            />
          }
        >
          {`${mentor.fullName}`}
        </MentorButton>
      ))}
    </Stack>
  );
}

export default NewProjectAddMentor;
