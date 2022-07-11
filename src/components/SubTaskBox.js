import {
  ArrowDropDown,
  Delete,
  Done,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import { useState } from "react";
import { iconStyle } from "../assets/styles/IconStyles";
import { TextInput } from "../assets/styles/InputStyles";
import calculateLearnerGroupTaskPoint from "./Functions/calculateLearnerGroupTaskPoint";
import calculateLearnerGroupTotalPoint from "./Functions/calculateLearnerGroupTotalPoint";
import checkTaskVisibility from "./Functions/checkTaskVisibility";
import getBackgroundColorFromIndex from "./Functions/getBackgroundColorFromIndex";
import VisibilityEye from "./VisibilityEye";

const SubsubTaskBox = ({
  project,
  setProject,
  task,
  taskIndex,
  subTask,
  subTaskIndex,
  parentReload,
  setParentReload,
}) => {
  const [reload, setReload] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSubTaskName, setNewSubTaskName] = useState(subTask.subTaskName);

  const handleRenameSubTask = (subTaskIndex, newSubTaskName) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].subTasks[subTaskIndex].subTaskName =
      newSubTaskName;
    setProject(tempProject);
    setParentReload(!parentReload);
  };
  const handleDeleteSubTask = (subTaskIndex) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].subTasks.splice(subTaskIndex, 1);
    tempProject.tasks[taskIndex].isHidden = checkTaskVisibility(
      tempProject.tasks,
      taskIndex
    );
    tempProject.learnerGroups.forEach((group) => {
      group.points[taskIndex].subTasks.splice(subTaskIndex, 1);
      group.points[taskIndex].isHidden = tempProject.tasks[taskIndex].isHidden;
      group.points[taskIndex].taskPoint = calculateLearnerGroupTaskPoint(
        group,
        taskIndex
      );
      group.totalPoint = calculateLearnerGroupTotalPoint(group);
    });
    setProject(tempProject);
    setReload(!reload);
    setParentReload(!parentReload);
  };
  const handleSubTaskVisibilityClick = (taskIndex, subTaskIndex) => {
    let tempProject = project;
    tempProject.tasks[taskIndex].subTasks[subTaskIndex].isHidden =
      !tempProject.tasks[taskIndex].subTasks[subTaskIndex].isHidden;
    tempProject.tasks[taskIndex].isHidden = checkTaskVisibility(
      tempProject.tasks,
      taskIndex
    );
    tempProject.learnerGroups.forEach((group) => {
      group.points[taskIndex].subTasks[subTaskIndex].isHidden =
        tempProject.tasks[taskIndex].subTasks[subTaskIndex].isHidden;
      group.points[taskIndex].isHidden = tempProject.tasks[taskIndex].isHidden;
      if (!!group.points[taskIndex].subTasks.length) {
        group.points[taskIndex].taskPoint = calculateLearnerGroupTaskPoint(
          group,
          taskIndex
        );
      }
      group.totalPoint = calculateLearnerGroupTotalPoint(group);
    });
    setProject(tempProject);
    setParentReload(!parentReload);
  };

  return (
    <div
      style={{
        backgroundColor: getBackgroundColorFromIndex(taskIndex + 1),
      }}
      className="adminProject__boxItem"
    >
      <h6 style={{ marginLeft: "20px" }}>
        {taskIndex + 1}.{subTaskIndex + 1}
      </h6>
      {!isEditing && <div>{subTask.subTaskName}</div>}
      {isEditing && (
        <TextInput
          defaultValue={subTask.subTaskName}
          inputRef={(input) => {
            input?.focus();
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter" && !!event.target.value) {
              setIsEditing(false);
              handleRenameSubTask(subTaskIndex, event.target.value);
            }
          }}
          onBlur={(event) => {
            setIsEditing(false);
            // handleRenameSubTask(subTaskIndex, event.target.value);
          }}
          onChange={(event) => {
            setNewSubTaskName(event.target.value);
          }}
        />
      )}
      <div style={{ width: 38 }} />
      {!isEditing && (
        <DriveFileRenameOutline
          sx={iconStyle}
          onClick={() => {
            setIsEditing(true);
          }}
        />
      )}
      {isEditing && (
        <Done
          sx={iconStyle}
          onClick={() => {
            handleRenameSubTask(subTaskIndex, newSubTaskName);
          }}
        />
      )}
      <Delete
        sx={iconStyle}
        onClick={() => {
          handleDeleteSubTask(subTaskIndex);
        }}
      />
      <VisibilityEye
        isHidden={subTask.isHidden}
        onClick={() => handleSubTaskVisibilityClick(taskIndex, subTaskIndex)}
      />
      <ArrowDropDown
        sx={{
          fontSize: 28,
          marginRight: "10px",
          color: getBackgroundColorFromIndex(taskIndex + 1),
        }}
      />
    </div>
  );
};

// import { useState } from "react";
// import {
//   Delete,
//   Done,
//   DriveFileRenameOutline,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";
// import { Box, Stack } from "@mui/material";
// import color from "../constant/color";
// import { ContentText, NumberText } from "../assets/styles/TypographyStyles";
// import { TextInput } from "../assets/styles/InputStyles";
// import getBackgroundColorFromIndex from "./Functions/getBackgroundColorFromIndex";
// // import recalculateLearnerGroupNewTotalPoint from "./Functions/recalculateLearnerGroupNewTotalPoint";
// import calculateLearnerGroupNewTotalPoint from "./Functions/calculateLearnerGroupNewTotalPoint";
// import calculateNewsubTaskPointFromSubsubTasks from "./Functions/calculateNewsubTaskPointFromSubsubTasks";

// const SubSubsubTaskBox = ({
//   project,
//   setProject,
//   newsubTask,
//   setNewsubTask,
//   index,
//   subIndex,
//   subsubTaskName,
//   point,
//   isHidden,
//   lastsubTask,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [newSubsubTaskName, setNewSubsubTaskName] = useState(subsubTaskName);
//   const TEXTMAXSAFELENGTH = 85;

//   // State Handlers
//   const handleSubsubTaskVisibilityClicked = (index, subIndex) => {
//     // handle UI State
//     let tempsubTask = [...newsubTask];
//     tempsubTask[index].subsubTasks[subIndex].isHidden =
//       !tempsubTask[index].subsubTasks[subIndex].isHidden;
//     let visibility = 0;
//     tempsubTask[index].subsubTasks.forEach((subsubTask) => {
//       visibility += !subsubTask.isHidden;
//     });
//     tempsubTask[index].isHidden = !!!visibility;
//     tempsubTask[index].point = calculateNewsubTaskPointFromSubsubTasks(newsubTask, index);
//     setNewsubTask(tempsubTask);
//     // handle Data State
//     let tempProject = project;
//     tempProject.subTasks[index].subsubTasks[subIndex].isHidden =
//       tempsubTask[index].subsubTasks[subIndex].isHidden;
//     tempProject.subTasks[index].isHidden = tempsubTask[index].isHidden;

//     tempProject.learnerGroups.forEach((group, groupIndex) => {
//       if (!!Object.keys(group.points[index]).length) {
//         group.points[index].isHidden = tempsubTask[index].isHidden;
//         group.points[index].subsubTasks[subIndex].isHidden =
//           tempsubTask[index].subsubTasks[subIndex].isHidden;
//         let subsubTaskSum = 0;
//         group.points[index].subsubTasks.forEach((subsubTask) => {
//           if (!subsubTask.isHidden) subsubTaskSum += subsubTask.subsubTaskPoint;
//         });
//         group.points[index].subTaskPoint = subsubTaskSum;
//         group.totalPoint = calculateLearnerGroupNewTotalPoint(
//           tempProject.learnerGroups,
//           groupIndex
//         );
//       } else {
//         group.points[index].isHidden = tempsubTask[index].isHidden;
//         group.points[index].subsubTasks = [];
//         tempProject.subTasks[index].subsubTasks.forEach((subsubTask) => {
//           group.points[index].subsubTasks.push({
//             isHidden: subsubTask.isHidden,
//             subsubTaskPoint: 0,
//           });
//         });
//         group.points[index].subTaskPoint = 0;
//       }
//     });
//     setProject(tempProject);
//   };
//   // const handleSubsubTaskPointChange = (index, subIndex, newSubsubTaskPoint) => {
//   //   // handle UI State
//   //   let tempsubTask = [...newsubTask];
//   //   tempsubTask[index].subsubTasks[subIndex].point = parseInt(newSubsubTaskPoint, 10);
//   //   tempsubTask[index].point = calculateNewsubTaskPointFromSubsubTasks(newsubTask, index);
//   //   setNewsubTask(tempsubTask);
//   //   // handle Data State
//   //   let tempProject = project;
//   //   tempProject.subTasks[index].subsubTasks[subIndex].point = parseInt(
//   //     newSubsubTaskPoint,
//   //     10
//   //   );
//   //   tempProject.subTasks[index].point = calculateNewsubTaskPointFromSubsubTasks(
//   //     project.subTasks,
//   //     index
//   //   );
//   //   tempProject.learnerGroups.forEach((group) => {
//   //     if (!!Object.keys(group.points[index]).length) {
//   //       if (!!group.points[index].subsubTasks.length) {
//   //         group.points[index].subsubTasks.forEach((subsubTask, subsubTaskIndex) => {
//   //           subsubTask.subsubTaskPoint =
//   //             tempProject.subTasks[index].subsubTasks[subsubTaskIndex].point;
//   //         });
//   //       }
//   //       group.points[index].subTaskPoint = tempProject.subTasks[index].point;
//   //     }
//   //   });
//   //   recalculateLearnerGroupNewTotalPoint(tempProject);
//   //   setProject(tempProject);
//   //   // console.log(tempProject);
//   // };
//   const handleRenameSubsubTask = (index, newSubsubTaskName) => {
//     // handle UI State
//     let tempsubTask = [...newsubTask];
//     tempsubTask[index].subsubTasks[subIndex].subsubTaskName = newSubsubTaskName;
//     setNewsubTask(tempsubTask);
//     setIsEditing(false);
//     // handle Data State
//     let tempProject = project;
//     tempProject.subTasks[index].subsubTasks[subIndex].subsubTaskName = newSubsubTaskName;
//     setProject(tempProject);
//   };
//   const handleRemoveSubsubTask = (subTaskIndex, subsubTaskIndex) => {
//     // handle UI State
//     let tempsubTask = [...newsubTask];
//     let subsubTaskLength = tempsubTask[subTaskIndex].subsubTasks.length;
//     tempsubTask[subTaskIndex].subsubTasks.splice(subsubTaskIndex, 1);
//     let visibility = 0;
//     tempsubTask[index].subsubTasks.forEach((subsubTask) => {
//       visibility += !subsubTask.isHidden;
//     });
//     tempsubTask[index].isHidden = !!!visibility;
//     tempsubTask[subTaskIndex].showSubsubTasks = !!tempsubTask[subTaskIndex].subsubTasks.length;
//     if (tempsubTask[subTaskIndex].showSubsubTasks) {
//       tempsubTask[subTaskIndex].point = calculateNewsubTaskPointFromSubsubTasks(
//         newsubTask,
//         subTaskIndex
//       );
//     }
//     setNewsubTask(tempsubTask);
//     // handle Data State
//     let tempProject = project;
//     if (tempProject.subTasks[subTaskIndex].subsubTasks.length === subsubTaskLength) {
//       tempProject.subTasks[subTaskIndex].subsubTasks.splice(subsubTaskIndex, 1);
//       if (!!tempProject.subTasks[subTaskIndex].subsubTasks.length) {
//         tempProject.subTasks[subTaskIndex].point = calculateNewsubTaskPointFromSubsubTasks(
//           project.subTasks,
//           subTaskIndex
//         );
//       }
//       tempProject.subTasks[subTaskIndex].showSubsubTasks =
//         !!tempProject.subTasks[subTaskIndex].subsubTasks.length;
//       tempProject.subTasks[index].isHidden = tempsubTask[index].isHidden;
//     }

//     tempProject.learnerGroups.forEach((group, groupIndex) => {
//       group.points[subTaskIndex].isHidden = tempProject.subTasks[index].isHidden;
//       group.points[subTaskIndex].subsubTasks.splice(subsubTaskIndex, 1);
//       group.points[subTaskIndex].subTaskPoint = calculateNewsubTaskPointFromSubsubTasks(
//         group.points,
//         subTaskIndex
//       );
//       group.totalPoint = calculateLearnerGroupNewTotalPoint(
//         tempProject.learnerGroups,
//         groupIndex
//       );
//     });

//     setProject(tempProject);
//   };

//   return (
//     <Stack
//       width={"100%"}
//       height={"70px"}
//       sx={{
//         borderBottomLeftRadius: lastsubTask ? 8 : null,
//         borderBottomRightRadius: lastsubTask ? 8 : null,
//       }}
//       flexDirection="row"
//       alignItems={"center"}
//       justifyContent={"space-around"}
//       bgcolor={getBackgroundColorFromIndex(index)}
//     >
//       <Stack
//         width={"75%"}
//         flexDirection="row"
//         alignItems={"center"}
//         padding={"0 30px"}
//       >
//         <NumberText
//           flexShrink={1}
//           width={50}
//           textDecoration={isHidden ? "line-through" : "false"}
//         >
//           {`${index + 1}.${subIndex + 1}`}
//         </NumberText>
//         {!isEditing && (
//           <ContentText
//             flexGrow={1}
//             textDecoration={isHidden ? "line-through" : "false"}
//           >
//             {subsubTaskName.length > TEXTMAXSAFELENGTH
//               ? subsubTaskName.slice(0, TEXTMAXSAFELENGTH - 1) + "..."
//               : subsubTaskName}
//           </ContentText>
//         )}
//         {isEditing && (
//           <TextInput
//             type={"text"}
//             inputRef={(input) => input?.focus()}
//             sx={{ flexGrow: 1 }}
//             defaultValue={subsubTaskName}
//             onKeyPress={(event) => {
//               if (event.key === "Enter")
//                 handleRenameSubsubTask(index, event.target.value);
//             }}
//             onChange={(event) => setNewSubsubTaskName(event.target.value)}
//             onBlur={(event) => handleRenameSubsubTask(index, event.target.value)}
//           />
//         )}
//       </Stack>
//       {isEditing && (
//         <Done
//           className="newProject__icon"
//           style={{
//             fontSize: 28,
//             color: color.primaryOrange,
//           }}
//           onClick={() => {
//             handleRenameSubsubTask(index, newSubsubTaskName);
//           }}
//         />
//       )}
//       {!isEditing && (
//         <DriveFileRenameOutline
//           className="newProject__icon"
//           style={{
//             fontSize: 28,
//             color: color.primaryOrange,
//           }}
//           onClick={() => setIsEditing(!isEditing)}
//         />
//       )}
//       <Box width={40} />
//       {/* <TextInput
//         type={"number"}
//         disabled={isHidden}
//         width={100}
//         marginright={"10px"}
//         onKeyPress={(event) => {
//           if (event?.key === "-" || event?.key === "+") {
//             event.preventDefault();
//           }
//           if (event.key === "Enter")
//             handleSubsubTaskPointChange(index, subIndex, event.target.value);
//         }}
//         onBlur={(event) =>
//           handleSubsubTaskPointChange(index, subIndex, event.target.value)
//         }
//         defaultValue={point}
//       /> */}
//       {/* <Box width={110} /> */}
//       <Delete
//         className="newProject__icon"
//         style={{
//           fontSize: 40,
//           color: color.primaryOrange,
//         }}
//         onClick={() => handleRemoveSubsubTask(index, subIndex)}
//       />
//       {!isHidden && (
//         <Visibility
//           className="newProject__icon"
//           onClick={() => handleSubsubTaskVisibilityClicked(index, subIndex)}
//           size={"large"}
//           sx={{
//             color: color.primaryOrange,
//           }}
//         />
//       )}
//       {isHidden && (
//         <VisibilityOff
//           className="newProject__icon"
//           onClick={() => handleSubsubTaskVisibilityClicked(index, subIndex)}
//           size={"large"}
//           sx={{
//             color: color.secondaryGrey,
//           }}
//         />
//       )}
//       {/* <Delete
//         size={"large"}
//         sx={{ color: getBackgroundColorFromIndex(index) }}
//       /> */}
//       <Box width={28} />
//     </Stack>
//   );
// };

export default SubsubTaskBox;
