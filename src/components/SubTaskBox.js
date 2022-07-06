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
// import recalculateLearnerGroupNewTotalPoint from "./Functions/recalculateLearnerGroupNewTotalPoint";
import calculateLearnerGroupNewTotalPoint from "./Functions/calculateLearnerGroupNewTotalPoint";
import calculateNewTaskPointFromSubTasks from "./Functions/calculateNewTaskPointFromSubTasks";

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
    let visibility = 0;
    tempTask[index].subTasks.forEach((subTask) => {
      visibility += !subTask.isHidden;
    });
    console.log("is hidden: " + !!!visibility);
    tempTask[index].isHidden = !!!visibility;
    tempTask[index].point = calculateNewTaskPointFromSubTasks(newTask, index);
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    tempProject.tasks[index].subTasks[subIndex].isHidden =
      tempTask[index].subTasks[subIndex].isHidden;
    tempProject.tasks[index].isHidden = tempTask[index].isHidden;

    tempProject.learnerGroups.forEach((group, groupIndex) => {
      if (!!Object.keys(group.points[index]).length) {
        group.points[index].isHidden = tempTask[index].isHidden;
        group.points[index].subTasks[subIndex].isHidden =
          tempTask[index].subTasks[subIndex].isHidden;
        let subTaskSum = 0;
        group.points[index].subTasks.forEach((subTask) => {
          if (!subTask.isHidden) subTaskSum += subTask.subTaskPoint;
        });
        group.points[index].taskPoint = subTaskSum;
        group.totalPoint = calculateLearnerGroupNewTotalPoint(
          tempProject.learnerGroups,
          groupIndex
        );
      } else {
        group.points[index].isHidden = tempTask[index].isHidden;
        group.points[index].subTasks = [];
        tempProject.tasks[index].subTasks.forEach((subTask) => {
          group.points[index].subTasks.push({
            isHidden: subTask.isHidden,
            subTaskPoint: 0,
          });
        });
        group.points[index].taskPoint = 0;
      }
    });
    setProject(tempProject);
  };
  // const handleSubTaskPointChange = (index, subIndex, newSubTaskPoint) => {
  //   // handle UI State
  //   let tempTask = [...newTask];
  //   tempTask[index].subTasks[subIndex].point = parseInt(newSubTaskPoint, 10);
  //   tempTask[index].point = calculateNewTaskPointFromSubTasks(newTask, index);
  //   setNewTask(tempTask);
  //   // handle Data State
  //   let tempProject = project;
  //   tempProject.tasks[index].subTasks[subIndex].point = parseInt(
  //     newSubTaskPoint,
  //     10
  //   );
  //   tempProject.tasks[index].point = calculateNewTaskPointFromSubTasks(
  //     project.tasks,
  //     index
  //   );
  //   tempProject.learnerGroups.forEach((group) => {
  //     if (!!Object.keys(group.points[index]).length) {
  //       if (!!group.points[index].subTasks.length) {
  //         group.points[index].subTasks.forEach((subTask, subTaskIndex) => {
  //           subTask.subTaskPoint =
  //             tempProject.tasks[index].subTasks[subTaskIndex].point;
  //         });
  //       }
  //       group.points[index].taskPoint = tempProject.tasks[index].point;
  //     }
  //   });
  //   recalculateLearnerGroupNewTotalPoint(tempProject);
  //   setProject(tempProject);
  //   // console.log(tempProject);
  // };
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
  const handleRemoveSubTask = (taskIndex, subTaskIndex) => {
    // handle UI State
    let tempTask = [...newTask];
    let subTaskLength = tempTask[taskIndex].subTasks.length;
    tempTask[taskIndex].subTasks.splice(subTaskIndex, 1);
    let visibility = 0;
    tempTask[index].subTasks.forEach((subTask) => {
      visibility += !subTask.isHidden;
    });
    console.log("is hidden: " + !!!visibility);
    tempTask[index].isHidden = !!!visibility;
    tempTask[taskIndex].showSubTasks = !!tempTask[taskIndex].subTasks.length;
    if (tempTask[taskIndex].showSubTasks) {
      tempTask[taskIndex].point = calculateNewTaskPointFromSubTasks(
        newTask,
        taskIndex
      );
    }
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    if (tempProject.tasks[taskIndex].subTasks.length === subTaskLength) {
      tempProject.tasks[taskIndex].subTasks.splice(subTaskIndex, 1);
      if (!!tempProject.tasks[taskIndex].subTasks.length) {
        tempProject.tasks[taskIndex].point = calculateNewTaskPointFromSubTasks(
          project.tasks,
          taskIndex
        );
      }
      tempProject.tasks[taskIndex].showSubTasks =
        !!tempProject.tasks[taskIndex].subTasks.length;
      tempProject.tasks[index].isHidden = tempTask[index].isHidden;
    }

    tempProject.learnerGroups.forEach((group, groupIndex) => {
      group.points[taskIndex].isHidden = tempProject.tasks[index].isHidden;
      group.points[taskIndex].subTasks.splice(subTaskIndex, 1);
      group.points[taskIndex].taskPoint = calculateNewTaskPointFromSubTasks(
        group.points,
        taskIndex
      );
      group.totalPoint = calculateLearnerGroupNewTotalPoint(
        tempProject.learnerGroups,
        groupIndex
      );
    });

    setProject(tempProject);
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
      {/* <TextInput
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
      /> */}
      {/* <Box width={110} /> */}
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
      {/* <Delete
        size={"large"}
        sx={{ color: getBackgroundColorFromIndex(index) }}
      /> */}
      <Box width={28} />
    </Stack>
  );
};

export default SubTaskBox;
