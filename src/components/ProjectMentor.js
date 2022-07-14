import { Collapse, Tooltip } from "@mui/material";
import {
  AddCircle,
  ArrowDropDown,
  ContentCopy,
  Delete,
  Done,
  DriveFileRenameOutline,
  OpenInNew,
} from "@mui/icons-material";
import React, { useState } from "react";
import "../pages/Admin/AdminProject.css";
import getBackgroundColorFromIndex from "./Functions/getBackgroundColorFromIndex";
import { DropDownTextInput } from "../assets/styles/InputStyles";
import copyToClipBoard from "./Functions/copyToClipBoard";
import { TransitionGroup } from "react-transition-group";
import {
  addCircleIconStyle,
  arrowIconStyle,
  iconStyle,
} from "../assets/styles/IconStyles";
import ProjectHeader from "./ProjectHeader";

const ProjectMentor = ({ project, setProject }) => {
  const [reload, setReload] = useState(false);
  const [showMentor, setShowMentor] = useState(true);
  const [newMentorName, setNewMentorName] = useState("");

  const handleAddNewMentor = (newMentorName) => {
    let tempProject = project;
    tempProject.mentors.push({
      fullName: newMentorName,
      index: tempProject.mentors.length,
    });
    setProject(tempProject);
    setNewMentorName("");
    setShowMentor(true);
    setReload(!reload);
  };
  const handleDeleteMentor = (mentorIndex) => {
    let tempProject = project;
    tempProject.mentors.splice(mentorIndex, 1);
    setProject(tempProject);
    setReload(!reload);
  };
  const handleRenameMentor = (mentorIndex, newMentorName) => {
    let tempProject = project;
    tempProject.mentors[mentorIndex].fullName = newMentorName;
    setProject(tempProject);
    setReload(!reload);
  };

  const MentorBox = ({ mentor, mentorIndex }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newMentorName, setNewMentorName] = useState(mentor.fullName);
    const [copyText, setCopyText] = useState("Copy");
    return (
      <div
        style={{
          backgroundColor: getBackgroundColorFromIndex(mentorIndex + 1),
        }}
        className="adminProject__boxItem"
      >
        <h6>{mentorIndex + 1}</h6>
        {!isEditing && <div>{mentor.fullName}</div>}
        {isEditing && (
          <DropDownTextInput
            sx={{ bgcolor: "white", borderRadius: "5px" }}
            fullWidth
            size="small"
            inputRef={(input) => input?.focus()}
            value={newMentorName}
            onKeyPress={(event) => {
              if (event.key === "Enter" && !!event.target.value) {
                setIsEditing(false);
                handleRenameMentor(mentorIndex, newMentorName);
              }
            }}
            // onBlur={() => setIsEditing(false)}
            onChange={(event) => {
              setNewMentorName(event.target.value);
            }}
          />
        )}
        {!isEditing && (
          <DriveFileRenameOutline
            sx={iconStyle}
            onClick={() => {
              setIsEditing(true);
            }}
          />
        )}
        {isEditing && (
          <Done
            sx={iconStyle}
            onClick={() => {
              setIsEditing(false);
              handleRenameMentor(mentorIndex, newMentorName);
            }}
          />
        )}
        <Delete
          sx={iconStyle}
          onClick={() => {
            handleDeleteMentor(mentorIndex);
          }}
        />
        <Tooltip title={"Open Link In New Tab"}>
          <OpenInNew
            sx={iconStyle}
            onClick={() => {
              window.open(
                `/mentor/${project.projectName}/${mentor.fullName}`,
                "_blank"
              );
            }}
          />
        </Tooltip>
        <Tooltip title={copyText}>
          <ContentCopy
            sx={iconStyle}
            onClick={() => {
              copyToClipBoard(
                `${window.location.host}/mentor/${project.projectName}/${mentor.fullName}`,
                setCopyText
              );
            }}
          />
        </Tooltip>
      </div>
    );
  };

  return (
    <div className="adminProject__boxContainer">
      <ProjectHeader>Mentor</ProjectHeader>
      <div className="adminProject__boxInput">
        {/* <strong>Mentor</strong> */}
        <DropDownTextInput
          sx={{
            flexGrow: 1,
            bgcolor: "white",
            mr: "10px",
            borderRadius: "5px",
          }}
          size="small"
          placeholder={"Mentor Name"}
          value={newMentorName}
          onKeyPress={(event) => {
            if (event.key === "Enter" && !!event.target.value) {
              handleAddNewMentor(event.target.value);
            }
          }}
          onChange={(event) => {
            setNewMentorName(event.target.value);
          }}
        />
        <AddCircle
          sx={addCircleIconStyle(newMentorName)}
          onClick={() => {
            handleAddNewMentor(newMentorName);
          }}
        />
        <ArrowDropDown
          sx={arrowIconStyle(showMentor)}
          onClick={() => setShowMentor(!showMentor)}
        />
      </div>
      <Collapse in={showMentor} unmountOnExit>
        <TransitionGroup>
          {project.mentors.map((mentor, mentorIndex) => (
            <Collapse key={mentorIndex}>
              <MentorBox mentor={mentor} mentorIndex={mentorIndex} />
            </Collapse>
          ))}
        </TransitionGroup>
      </Collapse>
    </div>
  );
};

export default ProjectMentor;
