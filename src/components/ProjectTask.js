import { Collapse } from "@mui/material";
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

const ProjectTask = ({ project, setProject }) => {
  const [reload, setReload] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const handleAddNewTask = (newTaskName) => {
    let tempProject = project;
    tempProject.tasks.push({
      isHidden: false,
      showSubTasks: true,
      subTasks: [],
      taskName: newTaskName,
    });
    tempProject.learnerGroups.forEach((group) => {
      group.points.push({
        isHidden: false,
        subTasks: [],
        taskPoint: 0,
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
      <ProjectHeader>Task</ProjectHeader>
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
