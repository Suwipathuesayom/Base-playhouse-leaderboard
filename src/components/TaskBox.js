import {
  AddCircle,
  ArrowDropDown,
  Delete,
  Done,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import { Collapse, InputAdornment, Tooltip } from "@mui/material";
import { useState } from "react";
import { DropDownTextInput } from "../assets/styles/InputStyles";
import calculateLearnerGroupTaskPoint from "./Functions/calculateLearnerGroupTaskPoint";
import calculateLearnerGroupTotalPoint from "./Functions/calculateLearnerGroupTotalPoint";
import getBackgroundColorFromIndex from "./Functions/getBackgroundColorFromIndex";
import SubTaskBox from "./SubTaskBox";
import VisibilityEye from "./VisibilityEye";
import { TransitionGroup } from "react-transition-group";
import { arrowIconStyle, iconStyle } from "../assets/styles/IconStyles";
import calculateLearnerGroupTaskWeightPoint from "./Functions/calculateLearnerGroupTaskWeightPoint";
import calculateLearnerGroupTotalWeightPoint from "./Functions/calculateLearnerGroupTotalWeightPoint";
import calculateTotalTaskWeight from "./Functions/calculateTotalTaskWeight";
import calculateTaskMaxPointFromSubTaskMaxPoint from "./Functions/calculateTaskMaxPointFromSubTaskMaxPoint";
import calculateTaskWeightFromSubTask from "./Functions/calculateTaskWeightFromSubTask";

const TaskBox = ({
  project,
  setProject,
  task,
  taskIndex,
  parentReload,
  setParentReload,
}) => {
  const [reload, setReload] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [isEditingMaxPoint, setIsEditingMaxPoint] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.taskName);
  const [weightOverflow, setWeightOverflow] = useState(false);

  const handleTaskMaxPointChange = (taskIndex, newTaskMaxPoint) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].taskMaxPoint = parseInt(
      newTaskMaxPoint ? newTaskMaxPoint : 0,
      10
    );
    setIsEditingMaxPoint(false);
    setProject(tempProject);
    setParentReload(!parentReload);
  };
  const handleTaskWeightChange = (taskIndex, newWeightValue) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].weight = parseInt(
      newWeightValue ? newWeightValue : 0,
      10
    );
    setWeightOverflow(calculateTotalTaskWeight(tempProject) > 100);
    setIsEditingWeight(false);
    setProject(tempProject);
    setParentReload(!parentReload);
  };
  const handleAddSubTask = (taskIndex) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].isHidden = false;
    tempProject.tasks[taskIndex].showSubTasks = true;
    tempProject.tasks[taskIndex].subTasks.push({
      isHidden: false,
      subTaskName: "",
      subTaskMaxPoint: 10,
      weight: 10,
    });
    tempProject.tasks[taskIndex].taskMaxPoint =
      calculateTaskMaxPointFromSubTaskMaxPoint(tempProject, taskIndex);
    tempProject.tasks[taskIndex].weight = calculateTaskWeightFromSubTask(
      tempProject,
      taskIndex
    );
    tempProject.learnerGroups.forEach((group, groupIndex) => {
      group.points[taskIndex].isHidden = false;
      group.points[taskIndex].subTasks.push({
        isHidden: false,
        subTaskPoint: 0,
        subTaskWeightPoint: 0,
      });
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
  const handleRenameTask = (taskIndex, newTaskName) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].taskName = newTaskName;
    setProject(tempProject);
    setReload(!reload);
  };
  const handleDeleteTask = (taskIndex) => {
    let tempProject = project;
    tempProject.tasks.splice(taskIndex, 1);
    tempProject.learnerGroups.forEach((group, groupIndex) => {
      group.points.splice(taskIndex, 1);
      group.totalPoint = calculateLearnerGroupTotalPoint(group);
      group.totalWeightPoint = calculateLearnerGroupTotalWeightPoint(
        tempProject,
        groupIndex
      );
    });
    setProject(tempProject);
    setParentReload(!parentReload);
  };
  const handleTaskVisibilityClick = (taskIndex) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].isHidden =
      !tempProject.tasks[taskIndex].isHidden;
    tempProject.tasks[taskIndex].subTasks.forEach((subTask) => {
      subTask.isHidden = tempProject.tasks[taskIndex].isHidden;
    });
    tempProject.learnerGroups.forEach((group, groupIndex) => {
      group.points[taskIndex].isHidden = tempProject.tasks[taskIndex].isHidden;
      group.points[taskIndex].subTasks.forEach((subTask) => {
        subTask.isHidden = tempProject.tasks[taskIndex].isHidden;
      });
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
  const handleShowSubTasks = (taskIndex) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].showSubTasks =
      !tempProject.tasks[taskIndex].showSubTasks;
    setProject(tempProject);
    setParentReload(!parentReload);
    setReload(!reload);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: getBackgroundColorFromIndex(taskIndex + 1),
        }}
        className="adminProject__boxItem"
      >
        <h6>{taskIndex + 1}</h6>
        {!isEditing && <div>{task.taskName}</div>}
        {isEditing && (
          <DropDownTextInput
            sx={{ bgcolor: "white", borderRadius: "5px" }}
            fullWidth
            size="small"
            inputRef={(input) => {
              input?.focus();
              setIsEditingWeight(false);
            }}
            defaultValue={task.taskName}
            onKeyPress={(event) => {
              if (event.key === "Enter" && !!event.target.value) {
                setIsEditing(false);
                handleRenameTask(taskIndex, newTaskName);
              }
            }}
            // onBlur={() => setIsEditing(false)}
            onChange={(event) => {
              setNewTaskName(event.target.value);
            }}
          />
        )}
        {isEditingMaxPoint && (
          <DropDownTextInput
            defaultValue={task.taskMaxPoint}
            type="number"
            sx={{ minWidth: 80, bgcolor: "white", borderRadius: "5px" }}
            inputRef={(input) => {
              input?.focus();
              setIsEditing(false);
              setIsEditingWeight(false);
            }}
            style={{ flexGrow: 0, width: 80 }}
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="start">P</InputAdornment>,
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleTaskMaxPointChange(taskIndex, event.target.value);
              }
            }}
            onBlur={(event) => {
              handleTaskMaxPointChange(taskIndex, event.target.value);
            }}
          />
        )}
        {!isEditingMaxPoint && (
          <strong
            onClick={() => {
              if (!!!task.subTasks.length) setIsEditingMaxPoint(true);
            }}
          >
            <div>{task.taskMaxPoint}</div>
            <div>{" P"}</div>
          </strong>
        )}
        {isEditingWeight && (
          <DropDownTextInput
            disabled={!!task.subTasks.length}
            defaultValue={task.weight}
            type="number"
            sx={{ minWidth: 80, bgcolor: "white", borderRadius: "5px" }}
            inputRef={(input) => {
              input?.focus();
              setIsEditing(false);
              setIsEditingMaxPoint(false);
            }}
            style={{ flexGrow: 0, width: 80 }}
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleTaskWeightChange(taskIndex, event.target.value);
              }
            }}
            onBlur={(event) => {
              handleTaskWeightChange(taskIndex, event.target.value);
            }}
          />
        )}
        {project.useWeight && !isEditingWeight && (
          <strong
            onClick={() => {
              if (!!!task.subTasks.length) setIsEditingWeight(true);
            }}
          >
            <div style={{ color: weightOverflow ? "red" : "black" }}>
              {task.weight}
            </div>
            <div style={{ color: weightOverflow ? "red" : "black" }}>
              {" %"}
            </div>
          </strong>
        )}
        <AddCircle
          sx={iconStyle}
          onClick={() => {
            handleAddSubTask(taskIndex);
          }}
        />
        {!isEditing && (
          <Tooltip title="Rename Task">
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
              handleRenameTask(taskIndex, newTaskName);
            }}
          />
        )}
        <Delete
          sx={iconStyle}
          onClick={() => {
            handleDeleteTask(taskIndex);
          }}
        />
        <VisibilityEye
          isHidden={task.isHidden}
          onClick={() => handleTaskVisibilityClick(taskIndex)}
        />
        {!!task.subTasks.length && (
          <ArrowDropDown
            sx={arrowIconStyle(task.showSubTasks)}
            onClick={() => {
              handleShowSubTasks(taskIndex);
            }}
          />
        )}
        {!!!task.subTasks.length && (
          <ArrowDropDown
            sx={{
              ...iconStyle,
              color: getBackgroundColorFromIndex(taskIndex + 1),
            }}
          />
        )}
      </div>
      <Collapse in={task.showSubTasks}>
        <TransitionGroup>
          {task.subTasks.map((subTask, subTaskIndex) => (
            <Collapse key={subTaskIndex}>
              <SubTaskBox
                project={project}
                setProject={setProject}
                task={task}
                taskIndex={taskIndex}
                subTask={subTask}
                subTaskIndex={subTaskIndex}
                parentReload={parentReload}
                setParentReload={setParentReload}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </Collapse>
    </div>
  );
};

export default TaskBox;
