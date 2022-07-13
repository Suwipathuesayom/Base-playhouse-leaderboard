import {
  ArrowDropDown,
  Delete,
  Done,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import { InputAdornment, Tooltip } from "@mui/material";
import { useState } from "react";
import { iconStyle } from "../assets/styles/IconStyles";
import { DropDownTextInput } from "../assets/styles/InputStyles";
import calculateLearnerGroupTaskPoint from "./Functions/calculateLearnerGroupTaskPoint";
import calculateLearnerGroupTotalPoint from "./Functions/calculateLearnerGroupTotalPoint";
import calculateTaskWeightFromSubTask from "./Functions/calculateTaskWeightFromSubTask";
import checkTaskVisibility from "./Functions/checkTaskVisibility";
import getBackgroundColorFromIndex from "./Functions/getBackgroundColorFromIndex";
import VisibilityEye from "./VisibilityEye";

const SubsubTaskBox = ({
  project,
  setProject,
  task,
  taskIndex,
  setTaskWeight,
  subTask,
  subTaskIndex,
  parentReload,
  setParentReload,
}) => {
  const [reload, setReload] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [newSubTaskName, setNewSubTaskName] = useState(subTask.subTaskName);
  const [subTaskWeight, setSubTaskWeight] = useState(subTask.weight);

  const handleSubTaskWeightChange = (
    taskIndex,
    subTaskIndex,
    newWeightValue
  ) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].subTasks[subTaskIndex].weight = parseInt(
      newWeightValue ? newWeightValue : 0,
      10
    );
    tempProject.tasks[taskIndex].weight = calculateTaskWeightFromSubTask(
      tempProject,
      taskIndex
    );
    setTaskWeight(tempProject.tasks[taskIndex].weight);
    setSubTaskWeight(
      tempProject.tasks[taskIndex].subTasks[subTaskIndex].weight
    );
    setProject(tempProject);
    setParentReload(!parentReload);
  };
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
    tempProject.tasks[taskIndex].weight = calculateTaskWeightFromSubTask(
      tempProject,
      taskIndex,
      subTaskIndex
    );
    setTaskWeight(tempProject.tasks[taskIndex].weight);
    console.log(tempProject.tasks[taskIndex].weight);
    // setSubTaskWeight(tempProject.task[taskIndex].subtasks[subTaskIndex].weight);
    setProject(tempProject);
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
    tempProject.tasks[taskIndex].weight = calculateTaskWeightFromSubTask(
      tempProject,
      taskIndex,
      subTaskIndex
    );
    setTaskWeight(tempProject.tasks[taskIndex].weight);
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
            setIsEditingWeight(false);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter" && !!event.target.value) {
              setIsEditing(false);
              handleRenameSubTask(subTaskIndex, event.target.value);
            }
          }}
          onBlur={(event) => {
            setIsEditing(false);
            handleRenameSubTask(subTaskIndex, event.target.value);
          }}
          onChange={(event) => {
            setNewSubTaskName(event.target.value);
          }}
        />
      )}
      {!isEditingWeight && (
        <strong onClick={() => setIsEditingWeight(true)}>
          <div>{subTask.weight}</div>
          <div>{" %"}</div>
        </strong>
      )}
      {isEditingWeight && (
        <DropDownTextInput
          type="number"
          defaultValue={subTask.weight}
          // width={25}
          // fullWidth
          inputRef={(input) => {
            input?.focus();
            setIsEditing(false);
          }}
          sx={{
            minWidth: 100,
            bgcolor: "white",
            borderRadius: "5px",
          }}
          style={{ flexGrow: 0, width: 100 }}
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="start">%</InputAdornment>,
            // inputProps: {
            //   style: {
            //     textAlign: "right",
            //   },
            // },
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              setIsEditingWeight(false);
              handleSubTaskWeightChange(
                taskIndex,
                subTaskIndex,
                event.target.value
              );
            }
          }}
          onBlur={(event) => {
            setIsEditingWeight(false);
            handleSubTaskWeightChange(
              taskIndex,
              subTaskIndex,
              event.target.value
            );
          }}
          onChange={(event) => {
            setSubTaskWeight(event.target.value);
          }}
        />
      )}
      <div style={{ flexGrow: 0, minWidth: 28 }} />
      {!isEditing && (
        <Tooltip title="Rename SubTask">
          <DriveFileRenameOutline
            sx={iconStyle}
            onClick={() => {
              setIsEditing(true);
            }}
          />
        </Tooltip>
      )}
      {isEditing && (
        <Done
          sx={iconStyle}
          onClick={() => {
            setIsEditing(false);
            handleRenameSubTask(subTaskIndex, newSubTaskName);
            handleSubTaskWeightChange(taskIndex, subTaskIndex, subTaskWeight);
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
