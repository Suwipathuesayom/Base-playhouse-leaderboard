import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  AddCircle,
  // KeyboardArrowUp
} from "@mui/icons-material";

import color from "../../constant/color";
import "../../assets/styles/NewProject.css";
import TaskBox from "../../components/TaskBox";
import { HeaderText } from "../../assets/styles/TypographyStyles";
import { TextInput } from "../../assets/styles/InputStyles";

function NewProjectTask({ project, setProject }) {
  const [newTask, setNewTask] = useState(
    !!project.tasks.length ? [...project.tasks] : []
  );
  const [newTaskName, setNewTaskName] = useState("");

  // State Handlers
  const handleAddNewTask = (newTaskName) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask[tempTask.length] = {
      taskName: newTaskName,
      subTasks: [],
      showSubTasks: false,
      point: 5,
      weight: 10,
      isHidden: false,
    };
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    tempProject.tasks[tempProject.tasks.length] = {
      taskName: newTaskName,
      subTasks: [],
      showSubTasks: false,
      point: 5,
      weight: 10,
      isHidden: false,
    };
    tempProject.learnerGroups.forEach((group) => {
      group.points.push({});
    });
    setProject(tempProject);
    // callback
    // console.log(tempProject);

    // clear TextInput
    setNewTaskName("");
  };
  // const handleCollapseAllTask = () => {
  //   // handle UI State
  //   let tempTask = [...newTask];
  //   tempTask.forEach((task) => {
  //     task.showSubTasks = false;
  //   });
  //   setNewTask(tempTask);
  //   // handle Data State
  //   let tempProject = project;
  //   tempProject.tasks.forEach((task) => {
  //     task.showSubTasks = false;
  //   });
  //   setProject(tempProject);
  // };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 1500,
        marginLeft: "20px",
        paddingBottom: "50px",
        // backgroundColor: "pink",
      }}
    >
      <Stack
        width={"100%"}
        height={"70px"}
        sx={[
          {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            padding: "0 10px 0 20px",
          },

          !!!project.tasks?.length && {
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          },
        ]}
        flexDirection="row"
        alignItems={"center"}
        bgcolor={color.secondaryBlack}
      >
        <HeaderText width={325}>เพิ่มเกณฑ์การให้คะแนน</HeaderText>
        <TextInput
          width={"100%"}
          value={newTaskName}
          onKeyPress={(event) => {
            if (event.key === "Enter" && !!newTaskName.length)
              handleAddNewTask(newTaskName);
          }}
          onChange={(event) => {
            setNewTaskName(event.target.value);
          }}
        />
        <AddCircle
          className="newProject__icon"
          style={{
            fontSize: 40,
            color: !!newTaskName.length
              ? color.primaryOrange
              : color.secondaryGrey,
            marginRight: "10px",
          }}
          onClick={() => {
            if (!!newTaskName.length) handleAddNewTask(newTaskName);
          }}
        />
        {/* <KeyboardArrowUp
          className="newProject__icon"
          style={{
            fontSize: 28,
            color: color.primaryOrange,
          }}
          onClick={() => handleCollapseAllTask()}
        /> */}
      </Stack>
      {project?.tasks?.map((task, index) => {
        return (
          <TaskBox
            key={index}
            project={project}
            setProject={setProject}
            newTask={newTask}
            setNewTask={setNewTask}
            index={index}
            taskName={task.taskName}
            subTasks={task.subTasks}
            showSubTasks={task.showSubTasks}
            isHidden={task.isHidden}
            point={task.point}
            weight={task.weight}
            lastTask={project?.tasks?.length === index + 1}
          />
        );
      })}
    </Box>
  );
}

export default NewProjectTask;
