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
  InputAdornment,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import color from "../constant/color";
import SubTaskBox from "./SubTaskBox";

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
    // tempTask[index].point = tempTask[index].isHidden ? 0 : tempTask[index].point

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
    // tempProject.tasks[index].point = tempProject.tasks[index].isHidden ? 0 : tempProject.tasks[index].point

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
    // console.log(tempProject);
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
    console.log("Edited Project,", tempProject);
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
    console.log(tempProject);
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
    console.log(tempProject);
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
    console.log(tempProject);
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
    console.log(tempTask);
    // handle Data State
    let tempProject = project;
    console.log(tempProject);
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
    console.log(tempProject);
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
    <div>
      <Stack
        width={"100%"}
        height={"70px"}
        sx={[
          lastTask &&
            !showSubTasks && {
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            },
        ]}
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
            {index + 1}
          </Typography>
          {!isEditing && (
            <Typography
              sx={{
                flexGrow: 1,
                textDecoration: isHidden && "line-through",
                //   textAlign: "center",
                fontSize: 24,
                fontWeight: 400,
                color: color.secondaryGrey,

                //   backgroundColor: "lime",
              }}
            >
              {taskName?.length > TEXTMAXSAFELENGTH
                ? taskName.slice(0, TEXTMAXSAFELENGTH - 1) + "..."
                : taskName}
            </Typography>
          )}
          {isEditing && (
            <InputBase
              inputRef={(input) => input?.focus()}
              type={"text"}
              sx={{
                flexGrow: 1,
                padding: "0 10px",
                // marginRight: "20px",
                borderRadius: 2,
                fontSize: 20,
                backgroundColor: "white",
              }}
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
              // backgroundColor: "orange",
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
              // backgroundColor: "orange",
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
            // marginRight: "20px",
            // backgroundColor: "pink",
          }}
          onClick={() => handleAddNewSubTask(index)}
        />

        {!!!subTasks.length && !isHidden && (
          <InputBase
            type={"number"}
            sx={{
              width: "5%",
              minWidth: 60,
              borderRadius: 2,
              padding: "0 10px",
              margin: "0 5px",
              fontSize: 20,
              backgroundColor: "white",
            }}
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
          <InputBase
            type={"number"}
            disabled={true}
            sx={{
              width: "5%",
              minWidth: 60,
              borderRadius: 2,
              padding: "0 10px",
              margin: "0 5px",
              fontSize: 20,
              backgroundColor: "white",
            }}
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
        <InputBase
          sx={{
            width: "5%",
            minWidth: 77,
            borderRadius: 2,
            padding: "0 10px",
            fontSize: 20,
            backgroundColor: "white",
          }}
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
            // let value = parseInt(event.target.value, 10);

            // if (value > maxpercent) value = maxpercent;
            // else if (value < minpercent) value = minpercent;

            if (parseInt(event.target.value, 10) > 100)
              event.target.value = 100;
            else if (parseInt(event.target.value, 10) < 0)
              event.target.value = 0;

            // event.target.value = value;
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
            // marginRight: "20px",
            // backgroundColor: "pink",
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
              // backgroundColor: "yellow",
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
              // backgroundColor: "yellow",
            }}
          />
        )}
        {!!subTasks.length && (
          <KeyboardArrowDown
            className="newProject__icon"
            style={{
              fontSize: 28,
              color: color.primaryOrange,
              // transform: showSubTasks
              //   ? "rotate(0deg)"
              //   : "rotate(-180deg)",
              // backgroundColor: "orange",
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
