import { useState } from "react";
import {
  AddCircle,
  Delete,
  Done,
  DriveFileRenameOutline,
  KeyboardArrowDown,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  //  InputAdornment,
  Stack,
} from "@mui/material";
import color from "../constant/color";
import SubTaskBox from "./SubTaskBox";
import { TextInput } from "../assets/styles/InputStyles";
import { ContentText, NumberText } from "../assets/styles/TypographyStyles";
import getBackgroundColorFromIndex from "./Functions/getBackgroundColorFromIndex";
// import recalculateLearnerGroupNewTotalPoint from "./Functions/recalculateLearnerGroupNewTotalPoint";
import calculateLearnerGroupNewTotalPoint from "./Functions/calculateLearnerGroupNewTotalPoint";
// import addLearnerGroupTaskPoint from "./Functions/addLearnerGroupTaskPoint";

const TaskBox = ({
  project,
  setProject,
  newTask,
  setNewTask,
  index,
  taskName,
  subTasks,
  showSubTasks,
  point,
  weight,
  isHidden,
  lastTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(taskName);
  // const minpercent = 0;
  // const maxpercent = 100;
  const TEXTMAXSAFELENGTH = 85;

  // State Handlers
  const handleTaskVisibilityClicked = (index) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask[index].isHidden = !tempTask[index].isHidden;

    tempTask[index].subTasks.forEach((subTask) => {
      subTask.isHidden = tempTask[index].isHidden;
    });

    if (!!tempTask[index].subTasks.length) {
      tempTask[index].point = calculateNewTaskPointFromSubTasks(newTask, index);
    }
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    tempProject.tasks[index].isHidden = tempTask[index].isHidden;

    // if (tempTask[index].isHidden)
    //   resetEachLearnerGroupTaskPoint(tempProject, index);

    tempProject.tasks[index].subTasks.forEach((subTask) => {
      subTask.isHidden = tempProject.tasks[index].isHidden;
    });

    if (!!tempProject.tasks[index].subTasks.length) {
      tempProject.tasks[index].point = calculateNewTaskPointFromSubTasks(
        project.tasks,
        index
      );
    }

    tempProject.learnerGroups.forEach((group) => {
      if (!!Object.keys(group.points[index]).length) {
        group.points[index].isHidden = tempTask[index].isHidden;
      } else {
        group.points[index].taskPoint = 0;
        group.points[index].isHidden = tempTask[index].isHidden;
        group.points[index].subTasks = [];
        tempProject.tasks[index].subTasks.forEach((subTask) => {
          group.points[index].subTasks.push({
            subTaskPoint: 0,
            isHidden: subTask.isHidden,
          });
        });
      }
    });
    tempProject.learnerGroups.forEach((group, groupIndex) => {
      group.points.forEach((task, taskIndex) => {
        task.subTasks?.forEach((subTask) => {
          subTask.isHidden = tempProject.tasks[taskIndex].isHidden;
        });
      });
      group.totalPoint = calculateLearnerGroupNewTotalPoint(
        tempProject.learnerGroups,
        groupIndex
      );
    });
    setProject(tempProject);
  };
  const handleShowSubTasksClicked = (index) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask[index].showSubTasks = !tempTask[index].showSubTasks;
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    tempProject.tasks[index].showSubTasks = tempTask[index].showSubTasks;
    setProject(tempProject);
  };
  // const handlePointValueChange = (index, newPointValue) => {
  //   // handle UI State
  //   let tempTask = [...newTask];
  //   tempTask[index].point = parseInt(newPointValue, 10);
  //   setNewTask(tempTask);
  //   // handle Data State
  //   let tempProject = project;
  //   tempProject.tasks[index].point = parseInt(newPointValue, 10);
  //   tempProject.learnerGroups.forEach((group, groupIndex) => {
  //     if (!!!group.points.length) {
  //       tempProject = addLearnerGroupTaskPoint(tempProject, groupIndex);
  //     }
  //     if (!!!Object.keys(group.points[index]).length) {
  //       group.points[index].isChecked = false;
  //       group.points[index].subTasks = [];
  //       // group.points[index].taskIndex = index;
  //       group.points[index].isHidden = false;
  //     }
  //     group.points[index].taskPoint = parseInt(newPointValue, 10);
  //   });
  //   recalculateLearnerGroupNewTotalPoint(tempProject);
  //   setProject(tempProject);
  //   // console.log(tempProject);
  // };
  // const handleWeightValueChange = (index, newWeightValue) => {
  //   // handle UI State
  //   let tempTask = [...newTask];
  //   tempTask[index].weight = parseInt(newWeightValue, 10);
  //   setNewTask(tempTask);
  //   // handle Data State
  //   let tempProject = project;
  //   tempProject.tasks[index].weight = parseInt(newWeightValue, 10);
  //   setProject(tempProject);
  // };
  const handleRenameTask = (index, newTaskName) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask[index].taskName = newTaskName;
    setNewTask(tempTask);
    setIsEditing(false);
    // handle Data State
    let tempProject = project;
    tempProject.tasks[index].taskName = newTaskName;
    setProject(tempProject);
  };
  const handleAddNewSubTask = (index) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask[index].subTasks.push({
      subTaskName: "",
      isHidden: false,
    });
    tempTask[index].point = calculateNewTaskPointFromSubTasks(newTask, index);
    tempTask[index].showSubTasks = true;
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    if (
      tempProject.tasks[index].subTasks[
        tempProject.tasks[index].subTasks.length
      ] !== tempTask[index].subTasks[tempProject.tasks[index].subTasks.length]
    ) {
      tempProject.tasks[index].subTasks.push({
        subTaskName: "",
        isHidden: false,
      });
    }
    tempProject.tasks[index].point = calculateNewTaskPointFromSubTasks(
      tempProject.tasks,
      index
    );

    tempProject.learnerGroups.forEach((group, groupIndex) => {
      if (!!Object.keys(group.points[index]).length) {
        if (!!Object.keys(group.points[index].subTasks).length) {
          group.points[index].subTasks.push({
            subTaskPoint: 0,
            isHidden: false,
          });
        } else {
          group.points[index].subTasks = [
            {
              subTaskPoint: 0,
              isHidden: false,
            },
          ];
          group.points[index].isHidden = false;
        }
        let subTaskSum = 0;
        group.points[index].subTasks.forEach((subTask) => {
          if (!subTask.isHidden) subTaskSum += subTask.subTaskPoint;
        });
        group.points[index].taskPoint = subTaskSum;
      }
      group.totalPoint = calculateLearnerGroupNewTotalPoint(
        tempProject.learnerGroups,
        groupIndex
      );
    });
    tempProject.tasks[index].showSubTasks = true;
    setProject(tempProject);
  };
  const handleRemoveTask = (taskIndex) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask.splice(taskIndex, 1);
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    tempProject.tasks.splice(taskIndex, 1);
    tempProject.learnerGroups.forEach((group) => {
      group.points.splice(taskIndex, 1);
    });
    tempProject.learnerGroups.forEach((group, groupIndex) => {
      group.totalPoint = calculateLearnerGroupNewTotalPoint(
        tempProject.learnerGroups,
        groupIndex
      );
    });
    setProject(tempProject);
  };

  const calculateNewTaskPointFromSubTasks = (arr, index) => {
    let sum = 0;
    arr[index].subTasks.forEach((subTask) => {
      if (!subTask.isHidden) sum += subTask.point;
    });
    return sum;
  };

  return (
    <div>
      <Stack
        width={"100%"}
        height={"70px"}
        sx={[
          lastTask &&
            !showSubTasks && {
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            },
        ]}
        flexDirection="row"
        alignItems={"center"}
        justifyContent={"space-around"}
        bgcolor={getBackgroundColorFromIndex(index)}
      >
        <Stack width={"75%"} flexDirection="row" alignItems={"center"}>
          <NumberText
            flexShrink={1}
            width={50}
            textDecoration={isHidden ? "line-through" : "false"}
          >
            {index + 1}
          </NumberText>
          {!isEditing && (
            <ContentText
              flexGrow={1}
              textDecoration={isHidden ? "line-through" : "false"}
            >
              {taskName?.length > TEXTMAXSAFELENGTH
                ? taskName.slice(0, TEXTMAXSAFELENGTH - 1) + "..."
                : taskName}
            </ContentText>
          )}
          {isEditing && (
            <TextInput
              sx={{ flexGrow: 1 }}
              inputRef={(input) => input?.focus()}
              type={"text"}
              defaultValue={taskName}
              onKeyPress={(event) => {
                if (event.key === "Enter")
                  handleRenameTask(index, event.target.value);
              }}
              onChange={(event) => setNewTaskName(event.target.value)}
              onBlur={(event) => handleRenameTask(index, event.target.value)}
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
              handleRenameTask(index, newTaskName);
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
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
        )}
        <AddCircle
          className="newProject__icon"
          style={{
            fontSize: 40,
            color: color.primaryOrange,
          }}
          onClick={() => handleAddNewSubTask(index)}
        />

        {/* {!!!subTasks.length && !isHidden && (
          <TextInput
            width={100}
            marginright={"10px"}
            type={"number"}
            onKeyPress={(event) => {
              if (event?.key === "-" || event?.key === "+") {
                event.preventDefault();
              }
              if (event.key === "Enter")
                handlePointValueChange(index, event.target.value);
            }}
            onBlur={(event) =>
              handlePointValueChange(index, event.target.value)
            }
            defaultValue={point}
          />
        )}
        {(!!subTasks.length || isHidden) && (
          <TextInput
            width={100}
            marginright={"10px"}
            type={"number"}
            disabled={true}
            value={point}
            onKeyPress={(event) => {
              if (event?.key === "-" || event?.key === "+") {
                event.preventDefault();
              }
              if (event.key === "Enter")
                handlePointValueChange(index, event.target.value);
            }}
            onBlur={(event) =>
              handlePointValueChange(index, event.target.value)
            }
          />
        )} */}
        {/* <TextInput
          width={100}
          marginright={"10px"}
          type={"number"}
          inputprops={{ minpercent, maxpercent }}
          onKeyPress={(event) => {
            if (event?.key === "-" || event?.key === "+") {
              event.preventDefault();
            }
            if (event.key === "Enter")
              handleWeightValueChange(index, event.target.value);
          }}
          onChange={(event) => {
            if (parseInt(event.target.value, 10) > 100)
              event.target.value = 100;
            else if (parseInt(event.target.value, 10) < 0)
              event.target.value = 0;
          }}
          placeholder={"weight"}
          onBlur={(event) => handleWeightValueChange(index, event.target.value)}
          defaultValue={weight}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
        /> */}
        <Delete
          className="newProject__icon"
          style={{
            fontSize: 40,
            color: color.primaryOrange,
          }}
          onClick={() => handleRemoveTask(index)}
        />
        {!isHidden && (
          <Visibility
            className="newProject__icon"
            onClick={() => handleTaskVisibilityClicked(index)}
            size={"large"}
            sx={{
              color: color.primaryOrange,
            }}
          />
        )}
        {isHidden && (
          <VisibilityOff
            className="newProject__icon"
            onClick={() => handleTaskVisibilityClicked(index)}
            size={"large"}
            sx={{
              color: color.secondaryGrey,
            }}
          />
        )}
        {!!subTasks.length && (
          <KeyboardArrowDown
            className="newProject__icon"
            style={{
              fontSize: 28,
              color: color.primaryOrange,
            }}
            onClick={() => handleShowSubTasksClicked(index)}
          />
        )}
        {!!!subTasks.length && <Box width={28} />}
      </Stack>
      {!!subTasks.length &&
        showSubTasks &&
        subTasks.map((subTask, subIndex) => (
          <SubTaskBox
            key={subIndex}
            project={project}
            setProject={setProject}
            newTask={newTask}
            setNewTask={setNewTask}
            index={index}
            subIndex={subIndex}
            subTaskName={subTask.subTaskName}
            point={subTask.point}
            isHidden={subTask.isHidden}
            lastTask={subTasks.length === subIndex + 1 && lastTask}
          />
        ))}
    </div>
  );
};

export default TaskBox;
