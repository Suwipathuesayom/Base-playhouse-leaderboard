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
import calculateLearnerGroupTaskWeightPoint from "./Functions/calculateLearnerGroupTaskWeightPoint";
import calculateLearnerGroupTotalPoint from "./Functions/calculateLearnerGroupTotalPoint";
import calculateLearnerGroupTotalWeightPoint from "./Functions/calculateLearnerGroupTotalWeightPoint";
import calculateTaskMaxPointFromSubTaskMaxPoint from "./Functions/calculateTaskMaxPointFromSubTaskMaxPoint";
import calculateTaskWeightFromSubTask from "./Functions/calculateTaskWeightFromSubTask";
import calculateTotalTaskWeight from "./Functions/calculateTotalTaskWeight";
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
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [isEditingMaxPoint, setIsEditingMaxPoint] = useState(false);
  const [newSubTaskName, setNewSubTaskName] = useState(subTask.subTaskName);
  const [weightOverflow, setWeightOverflow] = useState(false);

  const handleSubTaskMaxPointChange = (
    taskIndex,
    subTaskIndex,
    newSubTaskMaxPoint
  ) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].subTasks[subTaskIndex].subTaskMaxPoint =
      parseInt(newSubTaskMaxPoint ? newSubTaskMaxPoint : 0, 10);
    tempProject.tasks[taskIndex].taskMaxPoint =
      calculateTaskMaxPointFromSubTaskMaxPoint(tempProject, taskIndex);
    setIsEditingMaxPoint(false);
    setProject(tempProject);
    setParentReload(!parentReload);
  };
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
    setWeightOverflow(calculateTotalTaskWeight(tempProject) > 100);
    setIsEditingWeight(false);
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
    tempProject.tasks[taskIndex].taskMaxPoint =
      calculateTaskMaxPointFromSubTaskMaxPoint(tempProject, taskIndex);
    tempProject.tasks[taskIndex].weight = calculateTaskWeightFromSubTask(
      tempProject,
      taskIndex
    );
    tempProject.learnerGroups.forEach((group, groupIndex) => {
      group.points[taskIndex].subTasks.splice(subTaskIndex, 1);
      group.points[taskIndex].isHidden = tempProject.tasks[taskIndex].isHidden;
      group.points[taskIndex].taskPoint = calculateLearnerGroupTaskPoint(
        group,
        taskIndex
      );
      group.points[taskIndex].taskWeightPoint =
        calculateLearnerGroupTaskWeightPoint(
          tempProject,
          groupIndex,
          taskIndex
        );
      group.totalPoint = calculateLearnerGroupTotalPoint(group);
      group.totalWeightPoint = calculateLearnerGroupTotalWeightPoint(
        tempProject,
        groupIndex
      );
    });
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
    tempProject.learnerGroups.forEach((group, groupIndex) => {
      group.points[taskIndex].subTasks[subTaskIndex].isHidden =
        tempProject.tasks[taskIndex].subTasks[subTaskIndex].isHidden;
      group.points[taskIndex].isHidden = tempProject.tasks[taskIndex].isHidden;
      if (!!group.points[taskIndex].subTasks.length) {
        group.points[taskIndex].taskPoint = calculateLearnerGroupTaskPoint(
          group,
          taskIndex
        );
        group.points[taskIndex].taskWeightPoint =
          calculateLearnerGroupTaskWeightPoint(project, groupIndex, taskIndex);
      }
      group.totalPoint = calculateLearnerGroupTotalPoint(group);
      group.totalWeightPoint = calculateLearnerGroupTotalWeightPoint(
        project,
        groupIndex
      );
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
            handleRenameSubTask(subTaskIndex, event.target.value);
          }}
          onChange={(event) => {
            setNewSubTaskName(event.target.value);
          }}
        />
      )}
      {!isEditingMaxPoint && (
        <strong onClick={() => setIsEditingMaxPoint(true)}>
          <div>{subTask.subTaskMaxPoint}</div>
          <div>{" P"}</div>
        </strong>
      )}
      {isEditingMaxPoint && (
        <DropDownTextInput
          type="number"
          defaultValue={subTask.subTaskMaxPoint}
          // width={25}
          // fullWidth
          inputRef={(input) => {
            input?.focus();
            setIsEditing(false);
            setIsEditingWeight(false);
          }}
          sx={{
            minWidth: 80,
            bgcolor: "white",
            borderRadius: "5px",
          }}
          style={{ flexGrow: 0, width: 80 }}
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="start">P</InputAdornment>,
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSubTaskMaxPointChange(
                taskIndex,
                subTaskIndex,
                event.target.value
              );
            }
          }}
          onBlur={(event) => {
            handleSubTaskMaxPointChange(
              taskIndex,
              subTaskIndex,
              event.target.value
            );
          }}
          // onChange={(event) => {
          //   setSubTaskWeight(event.target.value);
          // }}
        />
      )}
      {project.useWeight && !isEditingWeight && (
        <strong onClick={() => setIsEditingWeight(true)}>
          <div style={{ color: weightOverflow ? "red" : "black" }}>
            {subTask.weight}
          </div>
          <div style={{ color: weightOverflow ? "red" : "black" }}>{" %"}</div>
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
            setIsEditingMaxPoint(false);
          }}
          sx={{
            minWidth: 80,
            bgcolor: "white",
            borderRadius: "5px",
          }}
          style={{ flexGrow: 0, width: 80 }}
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSubTaskWeightChange(
                taskIndex,
                subTaskIndex,
                event.target.value
              );
            }
          }}
          onBlur={(event) => {
            handleSubTaskWeightChange(
              taskIndex,
              subTaskIndex,
              event.target.value
            );
          }}
          // onChange={(event) => {
          //   setSubTaskWeight(event.target.value);
          // }}
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
