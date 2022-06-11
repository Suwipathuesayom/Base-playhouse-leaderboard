import React, { useState } from "react";
import {
  Box,
  InputAdornment,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import {
  AddCircle,
  Delete,
  Done,
  DriveFileRenameOutline,
  KeyboardArrowDown,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import color from "../../constant/color";
import "../../assets/Styles/NewProject.css";

function NewProjectTask() {
  const [newTask, setNewTask] = useState([
    {
      taskName:
        "ยืนตรงเคารพธงชาติ หันหน้าเข้าหาเสาธงที่มุมตะวันตกเฉียงใต้ 34 องศา ยืนให้แดดส่องหน้าจนกระทั่งครูเป่า",
      subTasks: [],
      showSubTasks: false,
      point: 5,
      weight: 10,
      isHidden: false,
    },
    {
      taskName: "กินผัก",
      subTasks: [
        {
          subTaskName: "กินกะหล่ำเต็มใบ",
          point: 2,
          isHidden: true,
        },
        {
          subTaskName: "กินพริกสด",
          point: 3,
          isHidden: true,
        },
      ],
      showSubTasks: false,
      point: 0,
      weight: 10,
      isHidden: false,
    },
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
    setNewTaskName("");
  };

  const calculateNewTaskPointFromSubTasks = (index) => {
    let sum = 0;
    newTask[index].subTasks.forEach((subTask) => {
      if (!subTask.isHidden) sum += subTask.point;
    });
    return sum;
  };

  const SubTaskBox = ({
    index,
    subIndex,
    subTaskName,
    point,
    weight,
    isHidden,
    lastTask,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newSubTaskName, setNewSubTaskName] = useState(subTaskName);
    const TEXTMAXSAFELENGTH = 85;

    // State Handlers
    const handleSubTaskVisibilityClicked = (index, subIndex) => {
      let tempTask = [...newTask];
      tempTask[index].subTasks[subIndex].isHidden =
        !tempTask[index].subTasks[subIndex].isHidden;
      tempTask[index].point = calculateNewTaskPointFromSubTasks(index);
      setNewTask(tempTask);
    };
    const handleSubTaskPointChange = (index, subIndex, newSubTaskPoint) => {
      let tempTask = [...newTask];
      tempTask[index].subTasks[subIndex].point = parseInt(newSubTaskPoint, 10);
      tempTask[index].point = calculateNewTaskPointFromSubTasks(index);
      setNewTask(tempTask);
    };
    const handleRenameSubTask = (index, newSubTaskName) => {
      let tempTask = [...newTask];
      tempTask[index].subTasks[subIndex].subTaskName = newSubTaskName;
      setNewTask(tempTask);
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

  const TaskBox = ({
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
      let tempTask = [...newTask];
      tempTask[index].isHidden = !tempTask[index].isHidden;

      tempTask[index].subTasks.forEach((subTask) => {
        subTask.isHidden = tempTask[index].isHidden;
      });

      if (!!tempTask[index].subTasks.length) {
        tempTask[index].point = calculateNewTaskPointFromSubTasks(index);
      }
      setNewTask(tempTask);
    };
    const handleShowSubTasksClicked = (index) => {
      let tempTask = [...newTask];
      tempTask[index].showSubTasks = !tempTask[index].showSubTasks;
      setNewTask(tempTask);
    };
    const handlePointValueChange = (index, newPointValue) => {
      let tempTask = [...newTask];
      tempTask[index].point = parseInt(newPointValue, 10);
      setNewTask(tempTask);
      console.log(tempTask);
    };
    const handleWeightValueChange = (index, newWeightValue) => {
      let tempTask = [...newTask];
      tempTask[index].weight = parseInt(newWeightValue, 10);
      setNewTask(tempTask);
      console.log(tempTask);
    };
    const handleRenameTask = (index, newTaskName) => {
      let tempTask = [...newTask];
      tempTask[index].taskName = newTaskName;
      setNewTask(tempTask);
      console.log(tempTask);
    };
    const handleAddNewSubTask = (index) => {
      let tempTask = [...newTask];
      // tempTask[index].subTasks = tempTask[index].subTasks.push({
      //   subTaskName: "",
      //   point: 5,
      //   isHidden: false,
      // });
      console.log(tempTask[index].subTasks.length);
      // if (!!tempTask[index].subTasks) {
      //   tempTask[index].subTasks = [
      //     {
      //       subTaskName: "",
      //       point: 5,
      //       isHidden: false,
      //     },
      //   ];
      // } else {
      // }
      tempTask[index].subTasks.push({
        subTaskName: "",
        point: 5,
        isHidden: true,
      });
      tempTask[index].showSubTasks = true;
      setNewTask(tempTask);
    };

    return (
      <div>
        <Stack
          width={"100%"}
          height={"70px"}
          sx={
            lastTask &&
            !showSubTasks && {
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

          <InputBase
            type={"number"}
            disabled={!!subTasks.length}
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
            onBlur={(event) =>
              handleWeightValueChange(index, event.target.value)
            }
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
  return (
    <Box
      sx={{ width: "100%", minWidth: 1200, margin: "0px 20px" }}
      //   bgcolor="yellow"
    >
      <Stack
        width={"100%"}
        height={"70px"}
        sx={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: "0 20px",
        }}
        flexDirection="row"
        alignItems={"center"}
        bgcolor={color.secondaryBlack}
      >
        <Typography
          sx={{
            minWidth: 375,
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
        <Typography
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
        </Typography>
      </Stack>
      {newTask?.map((task, index) => (
        <TaskBox
          key={index}
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
