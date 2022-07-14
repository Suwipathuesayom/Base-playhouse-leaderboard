import { Autocomplete, Collapse, Tooltip } from "@mui/material";
import {
  AddCircle,
  ArrowDropDown,
  ContentCopy,
  Delete,
  Done,
  DriveFileRenameOutline,
  OpenInNew,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
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
import "../pages/Admin/AdminProject.css";

const ProjectLearner = ({
  project,
  setProject,
  parentReload,
  setParentReload,
}) => {
  const [reload, setReload] = useState(false);
  const [showLearnerGroup, setShowLearnerGroup] = useState(true);
  const [newGroupName, setNewGroupName] = useState("");

  const addPointToNewLearner = () => {
    let tempPoint = [];
    project.tasks.forEach((task) => {
      let tempSubTask = [];
      task.subTasks.forEach((subTask) => {
        tempSubTask.push({
          isHidden: subTask.isHidden,
          subTaskPoint: 0,
          subTaskWeightPoint: 0,
        });
      });
      tempPoint.push({
        isHidden: task.isHidden,
        subTasks: tempSubTask,
        taskPoint: 0,
        taskWeightPoint: 0,
      });
    });
    return tempPoint;
  };

  const handleChangeAssignedMentor = (groupIndex, newAssignedMentorId) => {
    let tempProject = project;
    tempProject.learnerGroups[groupIndex].assignedMentorId =
      newAssignedMentorId;
    setProject(tempProject);
    setReload(!reload);
  };
  const handleAddNewLearnerGroup = (newGroupName) => {
    let tempProject = project;
    tempProject.learnerGroups.push({
      assignedMentorId: undefined,
      avatar: "https://source.unsplash.com/random/64x64/?avatar",
      groupIndex: tempProject.learnerGroups.length + 1,
      groupName: newGroupName,
      points: addPointToNewLearner(),
      totalPoint: 0,
      totalWeightPoint: 0,
    });
    setProject(tempProject);
    setNewGroupName("");
    setShowLearnerGroup(true);
    setReload(!reload);
  };
  const handleDeleteLearnerGroup = (groupIndex) => {
    let tempProject = project;
    tempProject.learnerGroups.splice(groupIndex, 1);
    tempProject.learnerGroups.forEach((group, groupIndex) => {
      group.groupIndex = groupIndex + 1;
    });
    setProject(tempProject);
    setReload(!reload);
  };
  const handleRenameLearnerGroup = (groupIndex, newGroupName) => {
    let tempProject = project;
    tempProject.learnerGroups[groupIndex].groupName = newGroupName;
    setProject(tempProject);
    setReload(!reload);
  };

  useEffect(() => {
    setReload(!reload);
  }, [parentReload]);

  const LearnerBox = ({ group, groupIndex, parentReload }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newGroupName, setNewGroupName] = useState(group.groupName);
    // const [assignedMentorId, setAssignedMentorId] = useState(
    //   group.assignedMentorId
    // );
    const [copyText, setCopyText] = useState("Copy");

    return (
      <div
        style={{
          backgroundColor: getBackgroundColorFromIndex(groupIndex + 1),
        }}
        className="adminProject__boxItem"
      >
        <h6>{groupIndex + 1}</h6>
        {!isEditing && <div>{group.groupName}</div>}
        {isEditing && (
          <DropDownTextInput
            sx={{ bgcolor: "white", borderRadius: "5px" }}
            fullWidth
            size="small"
            value={newGroupName}
            inputRef={(input) => input?.focus()}
            onKeyPress={(event) => {
              if (event.key === "Enter" && !!event.target.value) {
                setIsEditing(false);
                handleRenameLearnerGroup(groupIndex, newGroupName);
              }
            }}
            // onBlur={() => {
            //   setIsEditing(false);
            // }}
            onChange={(event) => {
              setNewGroupName(event.target.value);
            }}
          />
        )}
        <span>
          <Autocomplete
            id="select-assigned-mentor"
            // freeSolo
            value={
              project.mentors.filter(
                (mentor) => mentor.id === group.assignedMentorId
              )[0]?.fullName
            }
            onChange={(event, newValue) => {
              handleChangeAssignedMentor(
                groupIndex,
                project.mentors.filter(
                  (mentor) => mentor.fullName === newValue
                )[0]?.id
              );
            }}
            options={project.mentors?.map((mentor) => mentor.fullName)}
            isOptionEqualToValue={(option, value) =>
              option.fullName === value.fullName
            }
            renderInput={(params) => (
              <DropDownTextInput
                {...params}
                fullWidth
                size="small"
                placeholder="mentor"
              />
            )}
          />
        </span>
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
              handleRenameLearnerGroup(groupIndex, newGroupName);
            }}
          />
        )}
        <Delete
          sx={iconStyle}
          onClick={() => {
            handleDeleteLearnerGroup(groupIndex);
          }}
        />
        <Tooltip title={"Open Link In New Tab"}>
          <OpenInNew
            sx={iconStyle}
            onClick={() => {
              window.open(
                `/learner/${project.projectName}/${group.groupName}`,
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
                `${window.location.host}/learner/${project.projectName}/${group.groupName}`,
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
      <ProjectHeader>Learner Group</ProjectHeader>
      <div className="adminProject__boxInput">
        {/* <strong>Learner</strong> */}
        <DropDownTextInput
          sx={{
            flexGrow: 1,
            bgcolor: "white",
            mr: "10px",
            borderRadius: "5px",
          }}
          size="small"
          placeholder={"Group Name"}
          value={newGroupName}
          onKeyPress={(event) => {
            if (event.key === "Enter" && !!event.target.value) {
              handleAddNewLearnerGroup(event.target.value);
            }
          }}
          onChange={(event) => {
            setNewGroupName(event.target.value);
          }}
        />
        <AddCircle
          sx={addCircleIconStyle(newGroupName)}
          onClick={() => {
            handleAddNewLearnerGroup(newGroupName);
          }}
        />
        <ArrowDropDown
          sx={arrowIconStyle(showLearnerGroup)}
          onClick={() => setShowLearnerGroup(!showLearnerGroup)}
        />
      </div>
      <Collapse in={showLearnerGroup} unmountOnExit>
        <TransitionGroup>
          {project.learnerGroups.map((group, groupIndex) => (
            <Collapse key={groupIndex}>
              <LearnerBox
                group={group}
                groupIndex={groupIndex}
                parentReload={parentReload}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </Collapse>
    </div>
  );
};

export default ProjectLearner;
