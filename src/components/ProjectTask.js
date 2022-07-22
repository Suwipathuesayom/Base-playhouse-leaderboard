import { alpha, Collapse, styled, Switch } from "@mui/material";
import { AddCircle, ArrowDropDown } from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";

import React, { useState } from "react";
import TaskBox from "./TaskBox";
import {
  addCircleIconStyle,
  arrowIconStyle,
} from "../assets/styles/IconStyles";
import ProjectHeader from "./ProjectHeader";
import "../pages/Admin/AdminProject.css";
import { DropDownTextInput } from "../assets/styles/InputStyles";
import calculateTotalWeight from "./Functions/calculateTotalWeight";
import color from "../constant/color";

const ProjectTask = ({ project, setProject }) => {
  const [reload, setReload] = useState(false);
  const [showTask, setShowTask] = useState(true);
  const [newTaskName, setNewTaskName] = useState("");

  const OrangeSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-track": {
      backgroundColor: color.secondaryGrey,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: color.primaryOrange,
      "&:hover": {
        backgroundColor: alpha(
          color.primaryOrange,
          theme.palette.action.hoverOpacity
        ),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: color.primaryOrange,
    },
  }));

  const handleToggleUseWeight = () => {
    let tempProject = project;
    tempProject.useWeight = !tempProject.useWeight;
    setProject(tempProject);
    setReload(!reload);
  };
  const handleAddNewTask = (newTaskName) => {
    let tempProject = project;
    tempProject.tasks.push({
      isHidden: false,
      showSubTasks: true,
      subTasks: [],
      taskName: newTaskName,
      taskMaxPoint: 10,
      weight: 10,
    });
    tempProject.learnerGroups.forEach((group) => {
      group.points.push({
        isHidden: false,
        subTasks: [],
        taskPoint: 0,
        taskWeightPoint: 0,
      });
    });
    setProject(tempProject);
    setShowTask(true);
    setNewTaskName("");
    setReload(!reload);
  };

  return (
    <div
      className="adminProject__boxContainer"
      style={{ marginBottom: "80px" }}
    >
      <ProjectHeader>{`Task ${
        project.useWeight ? `(${calculateTotalWeight(project)}%)` : ""
      }`}</ProjectHeader>
      <div className="projectTask__switch">
        <h3>use Raw Point</h3>
        <OrangeSwitch
          checked={project.useWeight}
          onChange={() => handleToggleUseWeight()}
        />
        <h3>use Weighted Point</h3>
      </div>
      <div className="adminProject__boxInput">
        {/* <strong>Task</strong> */}
        <DropDownTextInput
          sx={{
            flexGrow: 1,
            bgcolor: "white",
            mr: "10px",
            borderRadius: "5px",
          }}
          size="small"
          placeholder={"task Name"}
          value={newTaskName}
          onKeyPress={(event) => {
            if (event.key === "Enter" && !!event.target.value) {
              handleAddNewTask(event.target.value);
            }
          }}
          onChange={(event) => {
            setNewTaskName(event.target.value);
          }}
        />
        {/* <DropDownTextInput
          type="number"
          disabled
          value={calculateTotalWeight(project)}
          sx={{ bgcolor: "white", borderRadius: "5px" }}
          style={{ flexGrow: 0, width: 100 }}
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        /> */}

        {/* <div style={{ flexGrow: 0, width: 4 }} /> */}
        <AddCircle
          sx={addCircleIconStyle(newTaskName)}
          onClick={() => {
            handleAddNewTask(newTaskName);
          }}
        />
        <ArrowDropDown
          sx={arrowIconStyle(showTask)}
          onClick={() => setShowTask(!showTask)}
        />
      </div>
      <Collapse in={showTask} unmountOnExit>
        <TransitionGroup>
          {project.tasks.map((task, taskIndex) => (
            <Collapse key={taskIndex}>
              <TaskBox
                project={project}
                setProject={setProject}
                task={task}
                taskIndex={taskIndex}
                parentReload={reload}
                setParentReload={setReload}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </Collapse>
    </div>
  );
};

export default ProjectTask;
