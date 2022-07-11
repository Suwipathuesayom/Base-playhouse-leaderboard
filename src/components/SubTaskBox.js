import {
  ArrowDropDown,
  Delete,
  Done,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import { useState } from "react";
import { iconStyle } from "../assets/styles/IconStyles";
import { DropDownTextInput } from "../assets/styles/InputStyles";
import calculateLearnerGroupTaskPoint from "./Functions/calculateLearnerGroupTaskPoint";
import calculateLearnerGroupTotalPoint from "./Functions/calculateLearnerGroupTotalPoint";
import checkTaskVisibility from "./Functions/checkTaskVisibility";
import getBackgroundColorFromIndex from "./Functions/getBackgroundColorFromIndex";
import VisibilityEye from "./VisibilityEye";

const SubsubTaskBox = ({
  project,
  setProject,
  task,
  taskIndex,
  subTask,
  subTaskIndex,
  parentReload,
  setParentReload,
}) => {
  const [reload, setReload] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSubTaskName, setNewSubTaskName] = useState(subTask.subTaskName);

  const handleRenameSubTask = (subTaskIndex, newSubTaskName) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].subTasks[subTaskIndex].subTaskName =
      newSubTaskName;
    setProject(tempProject);
    setParentReload(!parentReload);
  };
  const handleDeleteSubTask = (subTaskIndex) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].subTasks.splice(subTaskIndex, 1);
    tempProject.tasks[taskIndex].isHidden = checkTaskVisibility(
      tempProject.tasks,
      taskIndex
    );
    tempProject.learnerGroups.forEach((group) => {
      group.points[taskIndex].subTasks.splice(subTaskIndex, 1);
      group.points[taskIndex].isHidden = tempProject.tasks[taskIndex].isHidden;
      group.points[taskIndex].taskPoint = calculateLearnerGroupTaskPoint(
        group,
        taskIndex
      );
      group.totalPoint = calculateLearnerGroupTotalPoint(group);
    });
    setProject(tempProject);
    setReload(!reload);
    setParentReload(!parentReload);
  };
  const handleSubTaskVisibilityClick = (taskIndex, subTaskIndex) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].subTasks[subTaskIndex].isHidden =
      !tempProject.tasks[taskIndex].subTasks[subTaskIndex].isHidden;
    tempProject.tasks[taskIndex].isHidden = checkTaskVisibility(
      tempProject.tasks,
      taskIndex
    );
    tempProject.learnerGroups.forEach((group) => {
      group.points[taskIndex].subTasks[subTaskIndex].isHidden =
        tempProject.tasks[taskIndex].subTasks[subTaskIndex].isHidden;
      group.points[taskIndex].isHidden = tempProject.tasks[taskIndex].isHidden;
      if (!!group.points[taskIndex].subTasks.length) {
        group.points[taskIndex].taskPoint = calculateLearnerGroupTaskPoint(
          group,
          taskIndex
        );
      }
      group.totalPoint = calculateLearnerGroupTotalPoint(group);
    });
    setProject(tempProject);
    setParentReload(!parentReload);
  };

  return (
    <div
      style={{
        backgroundColor: getBackgroundColorFromIndex(taskIndex + 1),
      }}
      className="adminProject__boxItem"
    >
      <h6 style={{ marginLeft: "20px" }}>
        {taskIndex + 1}.{subTaskIndex + 1}
      </h6>
      {!isEditing && <div>{subTask.subTaskName}</div>}
      {isEditing && (
        <DropDownTextInput
          sx={{ bgcolor: "white", borderRadius: "5px" }}
          fullWidth
          size="small"
          defaultValue={subTask.subTaskName}
          inputRef={(input) => {
            input?.focus();
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter" && !!event.target.value) {
              setIsEditing(false);
              handleRenameSubTask(subTaskIndex, event.target.value);
            }
          }}
          onBlur={(event) => {
            setIsEditing(false);
            // handleRenameSubTask(subTaskIndex, event.target.value);
          }}
          onChange={(event) => {
            setNewSubTaskName(event.target.value);
          }}
        />
      )}
      <div style={{ width: 38 }} />
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
            handleRenameSubTask(subTaskIndex, newSubTaskName);
          }}
        />
      )}
      <Delete
        sx={iconStyle}
        onClick={() => {
          handleDeleteSubTask(subTaskIndex);
        }}
      />
      <VisibilityEye
        isHidden={subTask.isHidden}
        onClick={() => handleSubTaskVisibilityClick(taskIndex, subTaskIndex)}
      />
      <ArrowDropDown
        sx={{
          fontSize: 28,
          marginRight: "10px",
          color: getBackgroundColorFromIndex(taskIndex + 1),
        }}
      />
    </div>
  );
};

export default SubsubTaskBox;
