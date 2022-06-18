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
import { Box, InputAdornment, Stack } from "@mui/material";
import color from "../constant/color";
import SubTaskBox from "./SubTaskBox";
import { TextInput } from "../assets/styles/InputStyles";
import { ContentText, NumberText } from "../assets/styles/TypographyStyles";
import getBackgroundColorFromIndex from "./Functions/getBackgroundColorFromIndex";

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
  const minpercent = 0;
  const maxpercent = 100;
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

    if (tempTask[index].isHidden)
      resetEachLearnerGroupTaskPoint(tempProject, index);
    recalculateLearnerGroupNewTotalPoint(tempProject);

    tempProject.tasks[index].subTasks.forEach((subTask) => {
      subTask.isHidden = tempProject.tasks[index].isHidden;
    });

    if (!!tempProject.tasks[index].subTasks.length) {
      tempProject.tasks[index].point = calculateNewTaskPointFromSubTasks(
        project.tasks,
        index
      );
    }
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
  const handlePointValueChange = (index, newPointValue) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask[index].point = parseInt(newPointValue, 10);
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    tempProject.tasks[index].point = parseInt(newPointValue, 10);
    setProject(tempProject);
  };
  const handleWeightValueChange = (index, newWeightValue) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask[index].weight = parseInt(newWeightValue, 10);
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    tempProject.tasks[index].weight = parseInt(newWeightValue, 10);
    setProject(tempProject);
  };
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
      point: 5,
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
        point: 5,
        isHidden: false,
      });
    }
    tempProject.tasks[index].point = calculateNewTaskPointFromSubTasks(
      tempProject.tasks,
      index
    );
    tempProject.tasks[index].showSubTasks = true;
    setProject(tempProject);
  };
  const handleRemoveTask = (index) => {
    // handle UI State
    let tempTask = [...newTask];
    tempTask.splice(index, 1);
    setNewTask(tempTask);
    // handle Data State
    let tempProject = project;
    tempProject.tasks.splice(index, 1);
    setProject(tempProject);
  };

  const calculateNewTaskPointFromSubTasks = (arr, index) => {
    let sum = 0;
    arr[index].subTasks.forEach((subTask) => {
      if (!subTask.isHidden) sum += subTask.point;
    });
    return sum;
  };

  const recalculateLearnerGroupNewTotalPoint = (project) => {
    project.learnerGroups.forEach((group, groupIndex) => {
      let newTotalPoint = 0;
      group.points.forEach((point, pointIndex) => {
        if (Object.keys(point).length !== 0 && point.isChecked) {
          newTotalPoint += point.taskPoint;
        }
      });
      project.learnerGroups[groupIndex].totalPoint = newTotalPoint;
    });
  };

  const resetEachLearnerGroupTaskPoint = (project, taskIndex) => {
    project.learnerGroups.forEach((group) => {
      group.points[taskIndex] = {};
    });
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

        {!!!subTasks.length && !isHidden && (
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
        )}
        <TextInput
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
        />
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
