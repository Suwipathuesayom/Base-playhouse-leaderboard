import {
  AddCircle,
  ArrowDropDown,
  Delete,
  Done,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useState } from "react";
import { DropDownTextInput } from "../assets/styles/InputStyles";
import calculateLearnerGroupTaskPoint from "./Functions/calculateLearnerGroupTaskPoint";
import calculateLearnerGroupTotalPoint from "./Functions/calculateLearnerGroupTotalPoint";
import getBackgroundColorFromIndex from "./Functions/getBackgroundColorFromIndex";
import SubTaskBox from "./SubTaskBox";
import VisibilityEye from "./VisibilityEye";
import { TransitionGroup } from "react-transition-group";
import { arrowIconStyle, iconStyle } from "../assets/styles/IconStyles";

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
  const [newTaskName, setNewTaskName] = useState(task.taskName);

  const handleAddSubTask = (taskIndex) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].isHidden = false;
    tempProject.tasks[taskIndex].showSubTasks = true;
    tempProject.tasks[taskIndex].subTasks.push({
      isHidden: false,
      subTaskName: "",
    });
    tempProject.learnerGroups.forEach((group) => {
      group.points[taskIndex].isHidden = false;
      group.points[taskIndex].subTasks.push({
        isHidden: false,
        subTaskPoint: 0,
      });
      group.points[taskIndex].taskPoint = calculateLearnerGroupTaskPoint(
        group,
        taskIndex
      );
      group.totalPoint = calculateLearnerGroupTotalPoint(group);
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
    tempProject.learnerGroups.forEach((group) => {
      group.points.splice(taskIndex, 1);
      group.totalPoint = calculateLearnerGroupTotalPoint(group);
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
    tempProject.learnerGroups.forEach((group) => {
      group.points[taskIndex].isHidden = tempProject.tasks[taskIndex].isHidden;
      group.points[taskIndex].subTasks.forEach((subTask) => {
        subTask.isHidden = tempProject.tasks[taskIndex].isHidden;
      });
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
  const handleShowSubTasks = (taskIndex) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].showSubTasks =
      !tempProject.tasks[taskIndex].showSubTasks;
    setProject(tempProject);
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
            defaultValue={task.taskName}
            inputRef={(input) => input?.focus()}
            onKeyPress={(event) => {
              if (event.key === "Enter" && !!event.target.value) {
                setIsEditing(false);
                handleRenameTask(taskIndex, newTaskName);
              }
            }}
            onBlur={() => setIsEditing(false)}
            onChange={(event) => {
              setNewTaskName(event.target.value);
            }}
          />
        )}
        <AddCircle
          sx={iconStyle}
          onClick={() => {
            handleAddSubTask(taskIndex);
          }}
        />
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
