import { useState } from "react";
import {
  Delete,
  Done,
  DriveFileRenameOutline,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Box, InputBase, Stack, Typography } from "@mui/material";
import color from "../constant/color";

const SubTaskBox = ({
  project,
  setProject,
  newTask,
  setNewTask,
  index,
  subIndex,
  subTaskName,
  point,
  isHidden,
  lastTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSubTaskName, setNewSubTaskName] = useState(subTaskName);
  const TEXTMAXSAFELENGTH = 85;

  // State Handlers
  const handleSubTaskVisibilityClicked = (index, subIndex) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask[index].subTasks[subIndex].isHidden =
      !tempTask[index].subTasks[subIndex].isHidden;
    tempTask[index].point = calculateNewTaskPointFromSubTasks(newTask, index);
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    tempProject.tasks[index].subTasks[subIndex].isHidden =
      !tempProject.tasks[index].subTasks[subIndex].isHidden;
    tempProject.tasks[index].point = calculateNewTaskPointFromSubTasks(
      project.tasks,
      index
    );
    setProject(tempProject);
    console.log(tempProject);
  };
  const handleSubTaskPointChange = (index, subIndex, newSubTaskPoint) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask[index].subTasks[subIndex].point = parseInt(newSubTaskPoint, 10);
    tempTask[index].point = calculateNewTaskPointFromSubTasks(newTask, index);
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    tempProject.tasks[index].subTasks[subIndex].point = parseInt(
      newSubTaskPoint,
      10
    );
    tempProject.tasks[index].point = calculateNewTaskPointFromSubTasks(
      project.tasks,
      index
    );
    setProject(tempProject);
    // console.log(tempProject);
    console.log("Temp Task: ", tempTask);
  };
  const handleRenameSubTask = (index, newSubTaskName) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask[index].subTasks[subIndex].subTaskName = newSubTaskName;
    setNewTask(tempTask);
    setIsEditing(false);
    // handle Data State
    let tempProject = project;
    tempProject.tasks[index].subTasks[subIndex].subTaskName = newSubTaskName;
    setProject(tempProject);
    console.log(tempProject);
  };
  const handleRemoveSubTask = (index, subIndex) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask[index].subTasks.splice(subIndex, 1);
    tempTask[index].point = calculateNewTaskPointFromSubTasks(newTask, index);
    tempTask[index].showSubTasks = !!tempTask[index].subTasks.length;
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    tempProject.tasks[index].subTasks.splice(subIndex, 1);
    tempProject.tasks[index].point = calculateNewTaskPointFromSubTasks(
      project.tasks,
      index
    );
    tempProject.tasks[index].showSubTasks =
      !!tempProject.tasks[index].subTasks.length;
    setProject(tempProject);
    console.log(tempProject);
  };

  const calculateNewTaskPointFromSubTasks = (arr, index) => {
    let sum = 0;
    arr[index].subTasks.forEach((subTask) => {
      if (!subTask.isHidden) sum += subTask.point;
    });
    return sum;
  };

  return (
    <Stack
      width={"100%"}
      height={"70px"}
      sx={
        lastTask && {
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }
      }
      flexDirection="row"
      alignItems={"center"}
      justifyContent={"space-around"}
      bgcolor={!!(index % 2) ? color.secondaryBlack : color.primaryBlack}
    >
      <Stack
        width={"75%"}
        // height={"70px"}
        flexDirection="row"
        alignItems={"center"}
        padding={"0 30px"}
        // justifyContent={"space-evenly"}
        //   backgroundColor={"cyan"}
      >
        <Typography
          sx={{
            flexShrink: 1,
            width: 50,
            textAlign: "center",
            textDecoration: isHidden && "line-through",
            fontSize: 28,
            fontWeight: 400,
            color: color.primaryOrange,
            //   backgroundColor: "yellow",
          }}
        >
          {`${index + 1}.${subIndex + 1}`}
        </Typography>
        {!isEditing && (
          <Typography
            sx={{
              flexGrow: 1,
              //   textAlign: "center",
              textDecoration: isHidden && "line-through",
              fontSize: 24,
              fontWeight: 400,
              color: color.secondaryGrey,
              //   backgroundColor: "lime",
            }}
          >
            {subTaskName.length > TEXTMAXSAFELENGTH
              ? subTaskName.slice(0, TEXTMAXSAFELENGTH - 1) + "..."
              : subTaskName}
          </Typography>
        )}
        {isEditing && (
          <InputBase
            type={"text"}
            inputRef={(input) => input?.focus()}
            sx={{
              flexGrow: 1,
              padding: "0 10px",
              // marginRight: "20px",
              borderRadius: 2,
              fontSize: 20,
              backgroundColor: "white",
            }}
            defaultValue={subTaskName}
            onKeyPress={(event) => {
              if (event.key === "Enter")
                handleRenameSubTask(index, event.target.value);
            }}
            onChange={(event) => setNewSubTaskName(event.target.value)}
            onBlur={(event) => handleRenameSubTask(index, event.target.value)}
          />
        )}
      </Stack>
      {isEditing && (
        <Done
          className="newProject__icon"
          style={{
            fontSize: 28,
            color: color.primaryOrange,
            // backgroundColor: "orange",
          }}
          onClick={() => {
            handleRenameSubTask(index, newSubTaskName);
          }}
        />
      )}
      {!isEditing && (
        <DriveFileRenameOutline
          className="newProject__icon"
          style={{
            fontSize: 28,
            color: color.primaryOrange,
            // backgroundColor: "orange",
          }}
          onClick={() => setIsEditing(!isEditing)}
        />
      )}
      <Box width={40} />
      <InputBase
        type={"number"}
        sx={{
          width: "5%",
          borderRadius: 2,
          padding: "0 10px",
          margin: "0 5px",
          fontSize: 20,
          backgroundColor: "white",
        }}
        // value={subPointValue}
        onKeyPress={(event) => {
          if (event?.key === "-" || event?.key === "+") {
            event.preventDefault();
          }
          if (event.key === "Enter")
            handleSubTaskPointChange(index, subIndex, event.target.value);
        }}
        onBlur={(event) =>
          handleSubTaskPointChange(index, subIndex, event.target.value)
        }
        defaultValue={point}
      />
      <Box width={"5%"} />
      <Delete
        className="newProject__icon"
        style={{
          fontSize: 40,
          color: color.primaryOrange,
          // marginRight: "20px",
          // backgroundColor: "pink",
        }}
        onClick={() => handleRemoveSubTask(index, subIndex)}
      />
      {!isHidden && (
        <Visibility
          className="newProject__icon"
          onClick={() => handleSubTaskVisibilityClicked(index, subIndex)}
          size={"large"}
          sx={{
            color: color.primaryOrange,
            // backgroundColor: "yellow",
          }}
        />
      )}
      {isHidden && (
        <VisibilityOff
          className="newProject__icon"
          onClick={() => handleSubTaskVisibilityClicked(index, subIndex)}
          size={"large"}
          sx={{
            color: color.secondaryGrey,
            // backgroundColor: "yellow",
          }}
        />
      )}
      <Box width={28} />
    </Stack>
  );
};

export default SubTaskBox;
