import { useState } from "react";
import {
  Delete,
  Done,
  DriveFileRenameOutline,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import color from "../constant/color";
import { ContentText, NumberText } from "../assets/styles/TypographyStyles";
import { TextInput } from "../assets/styles/InputStyles";
import getBackgroundColorFromIndex from "./Functions/getBackgroundColorFromIndex";

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
      tempTask[index].subTasks[subIndex].isHidden;
    tempProject.tasks[index].point = calculateNewTaskPointFromSubTasks(
      project.tasks,
      index
    );
    setProject(tempProject);
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
  };
  const handleRemoveSubTask = (index, subIndex) => {
    // handle UI State
    let tempTask = [...newTask];
    let subTaskLength = tempTask[index].subTasks.length;
    tempTask[index].subTasks.splice(subIndex, 1);
    tempTask[index].point = calculateNewTaskPointFromSubTasks(newTask, index);
    tempTask[index].showSubTasks = !!tempTask[index].subTasks.length;
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    if (tempProject.tasks[index].subTasks.length === subTaskLength) {
      tempProject.tasks[index].subTasks.splice(subIndex, 1);
      tempProject.tasks[index].point = calculateNewTaskPointFromSubTasks(
        project.tasks,
        index
      );
      tempProject.tasks[index].showSubTasks =
        !!tempProject.tasks[index].subTasks.length;
      setProject(tempProject);
    }
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
      sx={{
        borderBottomLeftRadius: lastTask ? 8 : null,
        borderBottomRightRadius: lastTask ? 8 : null,
      }}
      flexDirection="row"
      alignItems={"center"}
      justifyContent={"space-around"}
      bgcolor={getBackgroundColorFromIndex(index)}
    >
      <Stack
        width={"75%"}
        flexDirection="row"
        alignItems={"center"}
        padding={"0 30px"}
      >
        <NumberText
          flexShrink={1}
          width={50}
          textDecoration={isHidden ? "line-through" : "false"}
        >
          {`${index + 1}.${subIndex + 1}`}
        </NumberText>
        {!isEditing && (
          <ContentText
            flexGrow={1}
            textDecoration={isHidden ? "line-through" : "false"}
          >
            {subTaskName.length > TEXTMAXSAFELENGTH
              ? subTaskName.slice(0, TEXTMAXSAFELENGTH - 1) + "..."
              : subTaskName}
          </ContentText>
        )}
        {isEditing && (
          <TextInput
            type={"text"}
            inputRef={(input) => input?.focus()}
            sx={{ flexGrow: 1 }}
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
          }}
          onClick={() => setIsEditing(!isEditing)}
        />
      )}
      <Box width={40} />
      <TextInput
        type={"number"}
        disabled={isHidden}
        width={100}
        marginright={"10px"}
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
      <Box width={110} />
      <Delete
        className="newProject__icon"
        style={{
          fontSize: 40,
          color: color.primaryOrange,
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
          }}
        />
      )}
      <Box width={28} />
    </Stack>
  );
};

export default SubTaskBox;
