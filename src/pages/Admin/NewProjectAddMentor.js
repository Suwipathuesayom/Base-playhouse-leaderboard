import { AddCircle, HighlightOff } from "@mui/icons-material";
import { Button, InputBase, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import color from "../../constant/color";

function NewProjectAddMentor({ project, setProject }) {
  const [mentorList, setMentorList] = useState(
    !!project.mentors.length ? [...project.mentors] : []
  );
  const [mentorName, setMentorName] = useState("");

  //   State Handler
  const handleAddMentor = (mentorName) => {
    // handle Data State
    let tempProject = project;
    tempProject.mentors.push({
      index: tempProject.mentors.length,
      fullName: mentorName,
    });
    setProject(tempProject);
    console.log(tempProject);
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
    console.log(tempProject);

    let tempMentorList = [...mentorList];
    tempMentorList.splice(index, 1);
    setMentorList(tempMentorList);
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
          marginRight: "20px",
          color: color.primaryOrange,
        }}
      >
        เพิ่ม Mentor
      </Typography>
      <InputBase
        sx={{
          width: "30%",
          padding: "0 10px",
          marginRight: "10px",
          borderRadius: 2,
          fontSize: 20,
          backgroundColor: "white",
        }}
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
          marginRight: "10px",
        }}
        onClick={() => handleAddMentor(mentorName)}
      />
      {mentorList?.map((mentor, index) => (
        <Button
          key={index}
          variant="contained"
          sx={{
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 2,
            marginRight: "20px",
            color: color.primaryBlack,
            backgroundColor: "white",
            ":hover": {
              bgcolor: "#f44336",
              color: "white",
            },
          }}
          onClick={() => handleRemoveMentor(index)}
          endIcon={<HighlightOff style={{ fontSize: 32 }} />}
        >
          {`${mentor.fullName}`}
        </Button>
      ))}
    </Stack>
  );
}

export default NewProjectAddMentor;
