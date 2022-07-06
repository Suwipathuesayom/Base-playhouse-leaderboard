import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
import color from "../constant/color";
import { Box, Divider, Stack, Typography } from "@mui/material";
// import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TextInput } from "../assets/styles/InputStyles";
import calculateLearnerGroupNewTotalPoint from "./Functions/calculateLearnerGroupNewTotalPoint";
import calculateNewTaskPointFromSubTasks from "./Functions/calculateNewTaskPointFromSubTasks";

// const auth = firebase.auth();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    textAlign: "center",
    backgroundColor: color.primaryOrange,
    color: theme.palette.common.white,
    borderBottomWidth: 0,
    fontSize: 20,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: "center",
    color: theme.palette.common.white,
    borderBottomWidth: 0,
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: color.secondaryBlack,
  },
  "&:nth-of-type(even)": {
    backgroundColor: color.primaryBlack,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "white",
  border: "20px",
  boxShadow: 24,
  p: 4,
};

export default function MentorTable({ project, setProject, mentorName }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [selectedGroup, setSelectedGroup] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNote("");
  };

  const [learnerGroups, setLearnerGroups] = React.useState(
    project?.learnerGroups
  );

  useEffect(() => {
    setLearnerGroups(project?.learnerGroups);
  }, [project]);

  const queryGroupNote = async (selectedGroup) => {
    const groupIndex = selectedGroup.groupIndex - 1;
    try {
      let message = {};
      await db
        .collection("messages")
        .doc(project.id)
        .get()
        .then((snapshot) => {
          message = snapshot.data();
        });
      if (message) {
        let foundGroupIndex = false;
        message.mentors.forEach((mentor) => {
          if (mentor.groupIndex === groupIndex) {
            setNote(mentor.note);
            foundGroupIndex = true;
          }
        });
        if (!foundGroupIndex) {
          setNote("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProject = async (tempProject) => {
    try {
      let userRef = db.collection("users").doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3");

      await userRef
        .collection("project")
        .doc(tempProject.id)
        .update(tempProject)
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewMessage = async (note, selectedGroup) => {
    const groupIndex = selectedGroup.groupIndex - 1;
    try {
      let message = {};
      await db
        .collection("messages")
        .doc(project.id)
        .get()
        .then((snapshot) => {
          message = snapshot.data();
        });

      if (message) {
        let tempMessage = message;
        let foundGroupIndex = false;
        tempMessage.mentors.forEach((mentor, mentorIndex) => {
          if (mentor.groupIndex === groupIndex) {
            message.mentors[mentorIndex].note = note;
            foundGroupIndex = true;
          }
        });
        if (!foundGroupIndex) {
          message.mentors.push({
            groupIndex: groupIndex,
            mentorName: mentorName,
            note: note,
          });
        }
        await db
          .collection("messages")
          .doc(project.id)
          .update({
            id: message.id,
            mentors: message.mentors,
            projectName: message.projectName,
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (!message) {
        await db
          .collection("messages")
          .doc(project.id)
          .set({
            id: project.id,
            mentors: [
              {
                groupIndex: groupIndex,
                mentorName: mentorName,
                note: note,
              },
            ],
            projectName: project.projectName,
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleCheckTaskByIndex = (groupIndex, taskIndex, subTaskIndex = -1) => {
  //   // handle UI State
  //   const tempLearnerGroups = project.learnerGroups;
  //   // console.log(tempLearnerGroups);
  //   if (tempLearnerGroups[groupIndex].points.length === 0) {
  //     for (let i = 0; i < project.tasks.length; i++) {
  //       tempLearnerGroups[groupIndex].points.push({});
  //     }
  //   }
  //   if (subTaskIndex === -1) {
  //     if (
  //       Object.keys(tempLearnerGroups[groupIndex].points[taskIndex]).length ===
  //       0
  //     ) {
  //       tempLearnerGroups[groupIndex].points[taskIndex] = {
  //         isChecked: true,
  //         // taskIndex: taskIndex,
  //         taskPoint: project.tasks[taskIndex].point,
  //         subTasks: [],
  //         isHidden: false,
  //       };
  //     } else {
  //       tempLearnerGroups[groupIndex].points[taskIndex].isChecked =
  //         !tempLearnerGroups[groupIndex].points[taskIndex].isChecked;
  //     }
  //   } else {
  //     if (
  //       Object.keys(tempLearnerGroups[groupIndex].points[taskIndex]).length ===
  //       0
  //     ) {
  //       let tempSubTask = [];
  //       project.tasks[taskIndex].subTasks.forEach((subTask, subTaskIndex) => {
  //         tempSubTask.push({
  //           isChecked: false,
  //           // subTaskIndex: subTaskIndex,
  //           subTaskPoint: subTask.point,
  //           isHidden: false,
  //         });
  //       });
  //       tempSubTask[subTaskIndex].isChecked = true;
  //       tempLearnerGroups[groupIndex].points[taskIndex] = {
  //         isChecked: true,
  //         // taskIndex: taskIndex,
  //         taskPoint: project.tasks[taskIndex].point,
  //         subTasks: tempSubTask,
  //         isHidden: false,
  //       };
  //     } else {
  //       tempLearnerGroups[groupIndex].points[taskIndex].subTasks[
  //         subTaskIndex
  //       ].isChecked =
  //         !tempLearnerGroups[groupIndex].points[taskIndex].subTasks[
  //           subTaskIndex
  //         ].isChecked;
  //     }
  //   }
  //   tempLearnerGroups[groupIndex].totalPoint = calculateLearnerGroupNewTotalPoint(
  //     tempLearnerGroups,
  //     groupIndex
  //   );
  //   setLearnerGroups([...tempLearnerGroups]);

  //   // handle Data State
  //   const tempProject = project;
  //   if (tempProject.learnerGroups[groupIndex].points.length === 0) {
  //     for (let i = 0; i < project.tasks.length; i++) {
  //       tempProject.learnerGroups[groupIndex].points.push({});
  //     }
  //   }
  //   if (subTaskIndex === -1) {
  //     if (
  //       Object.keys(tempProject.learnerGroups[groupIndex].points[taskIndex])
  //         .length === 0
  //     ) {
  //       tempProject.learnerGroups[groupIndex].points[taskIndex] = {
  //         isChecked: true,
  //         // taskIndex: taskIndex,
  //         taskPoint: project.tasks[taskIndex].point,
  //         subTasks: [],
  //         isHidden: false,
  //       };
  //     } else {
  //       tempProject.learnerGroups[groupIndex].points[taskIndex].isChecked =
  //         tempLearnerGroups[groupIndex].points[taskIndex].isChecked;
  //     }
  //   } else {
  //     if (
  //       Object.keys(tempProject.learnerGroups[groupIndex].points[taskIndex])
  //         .length === 0
  //     ) {
  //       let tempSubTask = [];
  //       project.tasks[taskIndex].subTasks.forEach((subTask, subTaskIndex) => {
  //         tempSubTask.push({
  //           isChecked: false,
  //           // subTaskIndex: subTaskIndex,
  //           subTaskPoint: subTask.point,
  //           isHidden: false,
  //         });
  //       });
  //       tempSubTask[subTaskIndex].isChecked = true;
  //       tempProject.learnerGroups[groupIndex].points[taskIndex] = {
  //         isChecked: true,
  //         // taskIndex: taskIndex,
  //         taskPoint: project.tasks[taskIndex].point,
  //         subTasks: tempSubTask,
  //         isHidden: false,
  //       };
  //     } else {
  //       tempProject.learnerGroups[groupIndex].points[taskIndex].subTasks[
  //         subTaskIndex
  //       ].isChecked =
  //         tempLearnerGroups[groupIndex].points[taskIndex].subTasks[
  //           subTaskIndex
  //         ].isChecked;
  //     }
  //   }
  //   tempProject.learnerGroups[groupIndex].totalPoint = calculateLearnerGroupNewTotalPoint(
  //     tempProject.learnerGroups,
  //     groupIndex
  //   );
  //   setProject(tempProject);
  //   // console.log(tempProject);
  //   handleUpdateProject(tempProject);
  // };

  const handlePointValueChange = (
    newPointValue,
    groupIndex,
    taskIndex,
    subTaskIndex = -1
  ) => {
    // handle UI State
    if (newPointValue === "") {
      newPointValue = 0;
    }
    // console.log(groupIndex, taskIndex, subTaskIndex);
    console.log(project.learnerGroups);
    let tempLearnerGroups = project.learnerGroups;
    if (!!Object.keys(tempLearnerGroups[groupIndex].points[taskIndex]).length) {
      if (subTaskIndex >= 0) {
        if (!!tempLearnerGroups[groupIndex].points[taskIndex].subTasks.length) {
          tempLearnerGroups[groupIndex].points[taskIndex].subTasks[
            subTaskIndex
          ].subTaskPoint = parseInt(newPointValue, 10);
        } else {
          project.tasks[taskIndex].subTasks.forEach((subTask) => {
            tempLearnerGroups[groupIndex].points[taskIndex].subTasks.push({
              isHidden: false,
              subTaskPoint: 0,
            });
          });
          tempLearnerGroups[groupIndex].points[taskIndex].subTasks[
            subTaskIndex
          ] = parseInt(newPointValue, 10);
        }
        tempLearnerGroups[groupIndex].points[taskIndex].taskPoint =
          calculateNewTaskPointFromSubTasks(
            tempLearnerGroups[groupIndex].points,
            taskIndex
          );
      } else {
        tempLearnerGroups[groupIndex].points[taskIndex].taskPoint = parseInt(
          newPointValue,
          10
        );
      }
    } else {
      tempLearnerGroups[groupIndex].points[taskIndex].isHidden = false;
      tempLearnerGroups[groupIndex].points[taskIndex].subTasks = [];
      if (subTaskIndex >= 0) {
        project.tasks[taskIndex].subTasks.forEach((subTask) => {
          tempLearnerGroups[groupIndex].points[taskIndex].subTasks.push({
            isHidden: false,
            subTaskPoint: 0,
          });
        });
        tempLearnerGroups[groupIndex].points[taskIndex].subTasks[
          subTaskIndex
        ].subTaskPoint = parseInt(newPointValue, 10);
        tempLearnerGroups[groupIndex].points[taskIndex].taskPoint =
          calculateNewTaskPointFromSubTasks(
            tempLearnerGroups[groupIndex].points,
            taskIndex
          );
      } else {
        tempLearnerGroups[groupIndex].points[taskIndex].taskPoint = parseInt(
          newPointValue,
          10
        );
      }
    }
    // tempLearnerGroups[groupIndex].totalPoint =
    //   calculateLearnerGroupNewTotalPoint(tempLearnerGroups, groupIndex);
    setLearnerGroups([...tempLearnerGroups]);
    // handle Data State

    // setProject(tempProject);
  };

  const handleUpdateTotalPoint = (groupIndex) => {
    // handle UI State
    let tempLearnerGroups = project.learnerGroups;
    tempLearnerGroups[groupIndex].totalPoint =
      calculateLearnerGroupNewTotalPoint(tempLearnerGroups, groupIndex);
    setLearnerGroups([...tempLearnerGroups]);
    // handle Data State
    let tempProject = project;
    tempProject.learnerGroups[groupIndex].totalPoint =
      tempLearnerGroups[groupIndex].totalPoint;
    setProject(tempProject);
  };

  const displayGrouptaskPoint = (group, taskIndex, subTaskIndex = -1) => {
    if (subTaskIndex < 0) {
      if (
        group.points[taskIndex] &&
        !!Object.keys(group.points[taskIndex]).length
      ) {
        return group.points[taskIndex].taskPoint;
      }
      // console.log(0);
    } else {
      if (group.points[taskIndex]) {
        if (!!Object.keys(group.points[taskIndex]).length) {
          if (group.points[taskIndex].subTasks[subTaskIndex]) {
            return group.points[taskIndex].subTasks[subTaskIndex].subTaskPoint;
          }
        }
      }
    }
    return 0;
  };

  // const checkIfIsChecked = (group, taskIndex, subTaskIndex) => {
  //   if (
  //     !!group.points.length &&
  //     !!Object.keys(group.points[taskIndex]).length &&
  //     group.points[taskIndex].subTasks &&
  //     group.points[taskIndex].subTasks[subTaskIndex]
  //   ) {
  //     return group.points[taskIndex].subTasks[subTaskIndex].isChecked;
  //   }
  //   return false;
  // };

  return (
    <TableContainer
      sx={{ padding: "15px", backgroundColor: "#dcdfe1" }}
      component={Paper}
    >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>GROUP</StyledTableCell>
            <StyledTableCell>
              <Typography fontWeight={600} fontSize={20}>
                NAME
              </Typography>
              {/* <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box
                  sx={{
                    width: "2px",
                    height: "50px",
                    backgroundColor: "white",
                  }}
                />
              </Stack> */}
            </StyledTableCell>
            {project?.tasks.map((task, taskIndex) => {
              if (!task.isHidden) {
                return (
                  <StyledTableCell key={taskIndex}>
                    {`${task.taskName}`}
                    {!!task.subTasks.length && (
                      <Divider
                        sx={{ borderBottomWidth: 2, borderColor: "white" }}
                      />
                    )}
                    <Stack direction="row" justifyContent="space-around">
                      {!!task.subTasks.length &&
                        task.subTasks.map((subTask, subTaskIndex) => {
                          if (!subTask.isHidden) {
                            return (
                              <div key={subTaskIndex}>
                                {`${subTask.subTaskName}`}
                              </div>
                            );
                          }
                          return <React.Fragment key={subTaskIndex} />;
                        })}
                    </Stack>
                  </StyledTableCell>
                );
              }
              return <StyledTableCell key={taskIndex} />;
              // if (!task.isHidden) {
              //   return (
              //     <StyledTableCell key={subIndex}>
              //       {task.taskName}
              //     </StyledTableCell>
              //   );
              // }
              // return <div></div>;
              // ** DO NOT DELETE !!! Later for handling subTask
              // if (!task.isHidden) {
              //   if (!!!task.subTasks.length) {
              //     return (
              //       <StyledTableCell key={subIndex}>
              //         {task.taskName}
              //       </StyledTableCell>
              //     );
              //   } else {
              //     return task.subTasks.map((subTask, subTaskIndex) => (
              //       <StyledTableCell key={subIndex}>
              //         {subTask.subTaskName}
              //       </StyledTableCell>
              //     ));
              //   }
              // }
              // return <div></div>;

              // if (!!!task.subTasks.length) {
              //   return (
              //     <StyledTableCell key={subIndex}>
              //       {task.taskName}
              //     </StyledTableCell>
              //   );
              // } else {
              //   return task.subTasks.map((subTask, subTaskIndex) => (
              //     <StyledTableCell key={subIndex}>
              //       {subTask.subTaskName}
              //     </StyledTableCell>
              //   ));
              // }
            })}
            <StyledTableCell>TOTAL</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {learnerGroups.map((group, index) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {group.groupIndex}
                </StyledTableCell>
                <StyledTableCell>{group.groupName}</StyledTableCell>
                {project?.tasks.map((task, taskIndex) => {
                  if (!task.isHidden) {
                    if (!!task.subTasks.length) {
                      return (
                        <StyledTableCell key={taskIndex}>
                          <Stack direction="row" justifyContent="space-around">
                            {task.subTasks.map((subTask, subTaskIndex) => {
                              if (!subTask.isHidden) {
                                return (
                                  <TextInput
                                    key={subTaskIndex}
                                    type="number"
                                    width={"100px"}
                                    marginright={"5px"}
                                    marginleft={"5px"}
                                    onKeyPress={(event) => {
                                      if (
                                        event?.key === "-" ||
                                        event?.key === "+"
                                      ) {
                                        event.preventDefault();
                                      }
                                      if (event.key === "Enter") {
                                        handleUpdateTotalPoint(index);
                                        handleUpdateProject(project);
                                      }
                                    }}
                                    onChange={(event) =>
                                      handlePointValueChange(
                                        event.target.value,
                                        index,
                                        taskIndex,
                                        subTaskIndex
                                      )
                                    }
                                    onBlur={() => {
                                      handleUpdateTotalPoint(index);
                                      handleUpdateProject(project);
                                    }}
                                    defaultValue={displayGrouptaskPoint(
                                      group,
                                      taskIndex,
                                      subTaskIndex
                                    )}
                                  />
                                );
                              }
                              return <React.Fragment key={subTaskIndex} />;
                            })}
                          </Stack>
                        </StyledTableCell>
                      );
                    } else {
                      return (
                        <StyledTableCell key={taskIndex}>
                          <Stack direction="row" justifyContent="space-around">
                            <TextInput
                              type="number"
                              width={"100px"}
                              marginright={"5px"}
                              marginleft={"5px"}
                              onKeyPress={(event) => {
                                if (event?.key === "-" || event?.key === "+") {
                                  event.preventDefault();
                                }
                                if (event.key === "Enter") {
                                  handleUpdateTotalPoint(index);
                                  handleUpdateProject(project);
                                }
                              }}
                              onChange={(event) =>
                                handlePointValueChange(
                                  event.target.value,
                                  index,
                                  taskIndex
                                )
                              }
                              onBlur={() => {
                                handleUpdateTotalPoint(index);
                                handleUpdateProject(project);
                              }}
                              defaultValue={displayGrouptaskPoint(
                                group,
                                taskIndex
                              )}
                            />
                          </Stack>
                        </StyledTableCell>
                      );
                    }
                  }
                  return <StyledTableCell key={taskIndex}></StyledTableCell>;
                })}
                <StyledTableCell>
                  {group.totalPoint
                    ? group.totalPoint < 0
                      ? 0
                      : group.totalPoint
                    : 0}
                </StyledTableCell>
                <StyledTableCell style={{ cursor: "pointer" }}>
                  <NoteAltIcon
                    onClick={() => {
                      handleOpen();
                      setSelectedGroup(group);
                      queryGroupNote(group);
                    }}
                  ></NoteAltIcon>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Note: Group {selectedGroup?.groupName}
          </Typography>
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              height: "500px",
            }}
          >
            <TextField
              id="outlined-name"
              // label="Note"
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
              }}
              sx={{ width: "100%", height: "500px" }}
              multiline
            />
          </Box>
          <Box
            sx={{
              flexDirection: "row",
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <Button
              sx={{ color: color.primaryOrange }}
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: color.primaryOrange,
                ":hover": { backgroundColor: "red" },
              }}
              onClick={() => {
                handleAddNewMessage(note, selectedGroup);
                handleClose();
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </TableContainer>
  );
}
