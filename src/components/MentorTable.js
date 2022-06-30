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
import Checkbox from "@mui/material/Checkbox";
import color from "../constant/color";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
  const handleClose = () => setOpen(false);

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

  const handleCheckTaskByIndex = (groupIndex, taskIndex, subTaskIndex = -1) => {
    // handle UI State
    const tempLearnerGroups = project.learnerGroups;
    // console.log(tempLearnerGroups);
    if (tempLearnerGroups[groupIndex].points.length === 0) {
      for (let i = 0; i < project.tasks.length; i++) {
        tempLearnerGroups[groupIndex].points.push({});
      }
    }
    if (subTaskIndex === -1) {
      if (
        Object.keys(tempLearnerGroups[groupIndex].points[taskIndex]).length ===
        0
      ) {
        tempLearnerGroups[groupIndex].points[taskIndex] = {
          isChecked: true,
          taskIndex: taskIndex,
          taskPoint: project.tasks[taskIndex].point,
          subTasks: [],
        };
      } else {
        tempLearnerGroups[groupIndex].points[taskIndex].isChecked =
          !tempLearnerGroups[groupIndex].points[taskIndex].isChecked;
      }
    } else {
      if (
        Object.keys(tempLearnerGroups[groupIndex].points[taskIndex]).length ===
        0
      ) {
        let tempSubTask = [];
        project.tasks[taskIndex].subTasks.forEach((subTask, subTaskIndex) => {
          tempSubTask.push({
            isChecked: false,
            subTaskIndex: subTaskIndex,
            subTaskPoint: subTask.point,
          });
        });
        tempSubTask[subTaskIndex].isChecked = true;
        tempLearnerGroups[groupIndex].points[taskIndex] = {
          isChecked: true,
          taskIndex: taskIndex,
          taskPoint: project.tasks[taskIndex].point,
          subTasks: tempSubTask,
        };
      } else {
        tempLearnerGroups[groupIndex].points[taskIndex].subTasks[
          subTaskIndex
        ].isChecked =
          !tempLearnerGroups[groupIndex].points[taskIndex].subTasks[
            subTaskIndex
          ].isChecked;
      }
    }
    tempLearnerGroups[groupIndex].totalPoint = calculateNewTotalPoint(
      tempLearnerGroups,
      groupIndex
    );
    setLearnerGroups([...tempLearnerGroups]);

    // handle Data State
    const tempProject = project;
    if (tempProject.learnerGroups[groupIndex].points.length === 0) {
      for (let i = 0; i < project.tasks.length; i++) {
        tempProject.learnerGroups[groupIndex].points.push({});
      }
    }
    if (subTaskIndex === -1) {
      if (
        Object.keys(tempProject.learnerGroups[groupIndex].points[taskIndex])
          .length === 0
      ) {
        tempProject.learnerGroups[groupIndex].points[taskIndex] = {
          isChecked: true,
          taskIndex: taskIndex,
          taskPoint: project.tasks[taskIndex].point,
        };
      } else {
        tempProject.learnerGroups[groupIndex].points[taskIndex].isChecked =
          tempLearnerGroups[groupIndex].points[taskIndex].isChecked;
      }
    } else {
      if (
        Object.keys(tempProject.learnerGroups[groupIndex].points[taskIndex])
          .length === 0
      ) {
        let tempSubTask = [];
        project.tasks[taskIndex].subTasks.forEach((subTask, subTaskIndex) => {
          tempSubTask.push({
            isChecked: false,
            subTaskIndex: subTaskIndex,
            subTaskPoint: subTask.point,
          });
        });
        tempSubTask[subTaskIndex].isChecked = true;
        tempProject.learnerGroups[groupIndex].points[taskIndex] = {
          isChecked: true,
          taskIndex: taskIndex,
          taskPoint: project.tasks[taskIndex].point,
          subTasks: tempSubTask,
        };
      } else {
        tempProject.learnerGroups[groupIndex].points[taskIndex].subTasks[
          subTaskIndex
        ].isChecked =
          tempLearnerGroups[groupIndex].points[taskIndex].subTasks[
            subTaskIndex
          ].isChecked;
      }
    }
    tempProject.learnerGroups[groupIndex].totalPoint = calculateNewTotalPoint(
      tempProject.learnerGroups,
      groupIndex
    );
    setProject(tempProject);
    // console.log(tempProject);
    handleUpdateProject(tempProject);
  };

  const calculateNewTotalPoint = (learnerGroup, groupIndex) => {
    let sum = 0;
    learnerGroup[groupIndex].points.forEach((point) => {
      if (!!point.subTasks.length) {
        point.subTasks.forEach((subTask) => {
          if (subTask.isChecked) {
            sum += subTask.subTaskPoint;
          }
        });
      } else {
        if (point.isChecked) {
          sum += point.taskPoint;
        }
      }
    });
    return sum;
  };

  const checkIfIsChecked = (group, taskIndex, subTaskIndex) => {
    console.log(group);
    if (
      !!group.points.length &&
      !!Object.keys(group.points[taskIndex]).length &&
      group.points[taskIndex].subTasks &&
      group.points[taskIndex].subTasks[subTaskIndex]
    ) {
      return group.points[taskIndex].subTasks[subTaskIndex].isChecked;
    }
    return false;
  };

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
                        task.subTasks.map((subTask, subTaskIndex) => (
                          <div
                            key={subTaskIndex}
                          >{`${subTask.subTaskName}`}</div>
                        ))}
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
                <StyledTableCell>
                  {group.groupName}
                  {/* <Stack direction="row" justifyContent={"space-between"}>
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
                        <Stack direction="row" justifyContent="space-around">
                          {!!task.subTasks.length &&
                            task.subTasks.map((subTask, subTaskIndex) => (
                              <Checkbox
                                key={subTaskIndex}
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={<RadioButtonChecked />}
                                checked={checkIfIsChecked(
                                  group,
                                  taskIndex,
                                  subTaskIndex
                                )}
                                onChange={() =>
                                  handleCheckTaskByIndex(
                                    index,
                                    taskIndex,
                                    subTaskIndex
                                  )
                                }
                                sx={{
                                  color: "white",
                                  "&.Mui-checked": {
                                    color: color.primaryOrange,
                                  },
                                }}
                              />
                            ))}
                          {!!!task.subTasks.length && (
                            <Checkbox
                              key={taskIndex}
                              icon={<RadioButtonUnchecked />}
                              checkedIcon={<RadioButtonChecked />}
                              checked={
                                group.points[taskIndex]
                                  ? group.points[taskIndex]?.isChecked
                                    ? group.points[taskIndex].isChecked
                                    : false
                                  : false
                              }
                              onChange={() =>
                                handleCheckTaskByIndex(index, taskIndex)
                              }
                              sx={{
                                color: "white",
                                "&.Mui-checked": {
                                  color: color.primaryOrange,
                                },
                              }}
                            />
                          )}
                        </Stack>
                      </StyledTableCell>
                    );
                  }
                  return <div></div>;
                  // ** DO NOT DELETE !!! Later for handling subTask

                  // if (!!!task.subTasks.length) {
                  //   return (
                  //     <StyledTableCell key={subIndex}>
                  //       <Checkbox
                  //         checked={
                  //           group.points[subIndex]
                  //             ? group.points[subIndex]?.isChecked
                  //               ? group.points[subIndex].isChecked
                  //               : false
                  //             : false
                  //         }
                  //         onChange={() =>
                  //           handleCheckTaskByIndex(index, subIndex)
                  //         }
                  //       />
                  //     </StyledTableCell>
                  //   );
                  // } else {
                  //   return task.subTasks.map((subTask, subTaksIndex) => (
                  //     <StyledTableCell key={subIndex}>
                  //       <Checkbox
                  //         checked={
                  //           group.points[subIndex]
                  //             ? group.points[subIndex]?.isChecked
                  //               ? group.points[subIndex].isChecked
                  //               : false
                  //             : false
                  //         }
                  //         onChange={() =>
                  //           handleCheckTaskByIndex(index, subIndex)
                  //         }
                  //       />
                  //     </StyledTableCell>
                  //   ));
                  // }
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
