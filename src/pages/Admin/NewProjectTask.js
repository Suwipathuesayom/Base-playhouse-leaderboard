import React, { useState } from "react";
import { Box, InputBase, Stack, Typography } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

import color from "../../constant/color";
import "../../assets/Styles/NewProject.css";
import TaskBox from "../../components/TaskBox";

function NewProjectTask({ project, setProject }) {
  const [newTask, setNewTask] = useState([
    // {
    //   taskName:
    //     "ยืนตรงเคารพธงชาติ หันหน้าเข้าหาเสาธงที่มุมตะวันตกเฉียงใต้ 34 องศา ยืนให้แดดส่องหน้าจนกระทั่งครูเป่า",
    //   subTasks: [],
    //   showSubTasks: false,
    //   point: 5,
    //   weight: 10,
    //   isHidden: false,
    // },
    // {
    //   taskName: "กินผัก",
    //   subTasks: [
    //     {
    //       subTaskName: "กินกะหล่ำเต็มใบ",
    //       point: 2,
    //       isHidden: true,
    //     },
    //     {
    //       subTaskName: "กินพริกสด",
    //       point: 3,
    //       isHidden: true,
    //     },
    //   ],
    //   showSubTasks: false,
    //   point: 0,
    //   weight: 10,
    //   isHidden: false,
    // },
    // {
    //   taskName: "นอน",
    //   subTasks: [],
    //   showSubTasks: false,
    //   point: 5,
    //   weight: 10,
    //   isHidden: true,
    // },
  ]);
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
    setProject(tempProject);
    console.log(tempProject);

    // clear TextInput
    setNewTaskName("");
  };

  return (
    <Box sx={{ width: "100%", minWidth: 1500, marginLeft: "20px" }}>
      <Stack
        width={"100%"}
        height={"70px"}
        sx={[
          {
            // minWidth: 1500,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: "0 20px",
          },

          !!!newTask.length && {
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        ]}
        flexDirection="row"
        alignItems={"center"}
        bgcolor={color.secondaryBlack}
      >
        <Typography
          sx={{
            minWidth: 325,
            fontSize: 32,
            fontWeight: 600,
            color: color.primaryOrange,
          }}
        >
          เพิ่มเกณฑ์การให้คะแนน
        </Typography>
        <InputBase
          sx={{
            minWidth: 400,
            width: 1500,
            padding: "0 10px",
            marginRight: "20px",
            borderRadius: 2,
            fontSize: 20,
            backgroundColor: "white",
          }}
          value={newTaskName}
          onKeyPress={(event) => {
            if (event.key === "Enter" && !!newTaskName.length)
              handleAddNewTask(newTaskName);
          }}
          onChange={(event) => {
            setNewTaskName(event.target.value);
            // console.log(event.target.value);
          }}
        />
        <AddCircle
          className="newProject__icon"
          style={{
            fontSize: 40,
            color: !!newTaskName.length
              ? color.primaryOrange
              : color.secondaryGrey,
            marginRight: "20px",
          }}
          onClick={() => {
            if (!!newTaskName.length) handleAddNewTask(newTaskName);
          }}
        />
        {/* <Typography
          sx={{
            // minWidth: "20%",
            minWidth: 200,
            textAlign: "center",
            fontSize: 28,
            fontWeight: 600,
            borderRadius: 20,
            // marginRight: "20px",
            color: color.primaryBlack,
            backgroundColor: "white",
          }}
        >
          คะแนนรวม: {9}
        </Typography> */}
      </Stack>
      {newTask?.map((task, index) => (
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
          lastTask={newTask.length === index + 1}
        />
      ))}
    </Box>
  );
}

export default NewProjectTask;
