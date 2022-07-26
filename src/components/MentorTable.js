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
import color from "../constant/color";
import { Box, Divider, Stack, Typography } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TextInput } from "../assets/styles/InputStyles";
import calculateLearnerGroupTotalPoint from "./Functions/calculateLearnerGroupTotalPoint";
import calculateLearnerGroupTaskPoint from "./Functions/calculateLearnerGroupTaskPoint";
import checkIfNumberIsEmpty from "./Functions/checkIfNumberIsEmpty";
import handleUpdateProjectPoint from "./Functions/handleUpdateProjectPoint";
import calculateLearnerGroupTaskWeightPoint from "./Functions/calculateLearnerGroupTaskWeightPoint";
import calculateLearnerGroupTotalWeightPoint from "./Functions/calculateLearnerGroupTotalWeightPoint";

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

  const handlePointValueChange = (
    newPointValue,
    groupIndex,
    taskIndex,
    subTaskIndex = -1
  ) => {
    let tempProject = project;
    let tempNewPointValue = checkIfNumberIsEmpty(newPointValue);
    if (subTaskIndex < 0) {
      tempProject.learnerGroups[groupIndex].points[taskIndex].taskPoint =
        tempNewPointValue;
      tempProject.learnerGroups[groupIndex].points[taskIndex].taskWeightPoint =
        ((tempNewPointValue / tempProject.tasks[taskIndex].taskMaxPoint) *
          tempProject.tasks[taskIndex].weight) /
        100.0;
    } else {
      tempProject.learnerGroups[groupIndex].points[taskIndex].subTasks[
        subTaskIndex
      ].subTaskPoint = tempNewPointValue;
      tempProject.learnerGroups[groupIndex].points[taskIndex].subTasks[
        subTaskIndex
      ].subTaskWeightPoint =
        ((tempNewPointValue /
          tempProject.tasks[taskIndex].subTasks[subTaskIndex].subTaskMaxPoint) *
          tempProject.tasks[taskIndex].subTasks[subTaskIndex].weight) /
        100.0;
      tempProject.learnerGroups[groupIndex].points[taskIndex].taskPoint =
        calculateLearnerGroupTaskPoint(
          tempProject.learnerGroups[groupIndex],
          taskIndex
        );
      tempProject.learnerGroups[groupIndex].points[taskIndex].taskWeightPoint =
        calculateLearnerGroupTaskWeightPoint(
          tempProject,
          groupIndex,
          taskIndex
        );
    }
    setProject(tempProject);
  };
  const handleUpdateGroupTotalPoint = (groupIndex) => {
    let tempProject = project;
    tempProject.learnerGroups[groupIndex].totalPoint =
      calculateLearnerGroupTotalPoint(tempProject.learnerGroups[groupIndex]);
    tempProject.learnerGroups[groupIndex].totalWeightPoint =
      calculateLearnerGroupTotalWeightPoint(tempProject, groupIndex);
    setProject(tempProject);
  };

  const displayGroupPoint = (group, taskIndex, subTaskIndex = -1) => {
    if (subTaskIndex < 0) {
      if (group.points[taskIndex]) return group.points[taskIndex].taskPoint;
    } else {
      if (
        group.points[taskIndex] &&
        group.points[taskIndex].subTasks[subTaskIndex]
      )
        return group.points[taskIndex].subTasks[subTaskIndex].subTaskPoint;
    }
    return 0;
  };

  const MentorTaskBox = ({ group, taskIndex }) => {
    const [isEditing, setIsEditing] = useState(false);
    if (isEditing) {
      return (
        <TextInput
          type="number"
          onFocus={(event) => {
            event.target.select();
          }}
          sx={{ width: 100, height: 40, m: 0 }}
          onKeyPress={(event) => {
            if (event?.key === "-" || event?.key === "+") {
              event.preventDefault();
            }
            if (event.key === "Enter") {
              setIsEditing(false);
              handleUpdateGroupTotalPoint(group.groupIndex - 1);
              handleUpdateProjectPoint(project);
            }
          }}
          onChange={(event) =>
            handlePointValueChange(
              event.target.value,
              group.groupIndex - 1,
              taskIndex
            )
          }
          onBlur={() => {
            setIsEditing(false);
            handleUpdateGroupTotalPoint(group.groupIndex - 1);
            handleUpdateProjectPoint(project);
          }}
          defaultValue={displayGroupPoint(group, taskIndex)}
        />
      );
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            width: 100,
            height: 40,
            alignItems: "center",
            pl: "10px",
            borderRadius: "5px",
            color: "black",
            bgcolor: "white",
          }}
          onClick={() => setIsEditing(true)}
        >
          <Typography sx={{ fontSize: 20 }}>
            {displayGroupPoint(group, taskIndex)}
          </Typography>
        </Box>
      );
    }
  };
  const MentorSubTaskBox = ({ group, taskIndex, subTaskIndex }) => {
    const [isEditing, setIsEditing] = useState(false);
    if (isEditing) {
      return (
        <TextInput
          type="number"
          onFocus={(event) => {
            event.target.select();
          }}
          sx={{ width: 100, height: 40, mx: "75px" }}
          onKeyPress={(event) => {
            if (event?.key === "-" || event?.key === "+") {
              event.preventDefault();
            }
            if (event.key === "Enter") {
              handleUpdateGroupTotalPoint(group.groupIndex - 1);
              handleUpdateProjectPoint(project);
            }
          }}
          onChange={(event) =>
            handlePointValueChange(
              event.target.value,
              group.groupIndex - 1,
              taskIndex,
              subTaskIndex
            )
          }
          onBlur={() => {
            handleUpdateGroupTotalPoint(group.groupIndex - 1);
            handleUpdateProjectPoint(project);
          }}
          defaultValue={displayGroupPoint(group, taskIndex, subTaskIndex)}
        />
      );
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            width: 100,
            height: 40,
            alignItems: "center",
            pl: "10px",
            mx: "75px",
            borderRadius: "5px",
            color: "black",
            bgcolor: "white",
          }}
          onClick={() => setIsEditing(true)}
        >
          <Typography sx={{ fontSize: 20 }}>
            {displayGroupPoint(group, taskIndex, subTaskIndex)}
          </Typography>
        </Box>
      );
    }
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
            <StyledTableCell>NAME</StyledTableCell>
            {project?.tasks.map((task, taskIndex) => {
              if (!task.isHidden) {
                return (
                  <StyledTableCell key={taskIndex}>
                    {`${task.taskName} (${task.taskMaxPoint})`}
                    {!!task.subTasks.length && (
                      <Divider
                        sx={{
                          borderBottomWidth: 2,
                          my: "5px",
                          borderColor: "white",
                        }}
                      />
                    )}
                    <Stack direction="row" justifyContent="space-evenly">
                      {!!task.subTasks.length &&
                        task.subTasks
                          .filter((subTask) => !subTask.isHidden)
                          .map((subTask, subTaskIndex) => {
                            return (
                              <div
                                style={{
                                  width: 250,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                key={subTaskIndex}
                              >
                                {`${subTask.subTaskName} (${subTask.subTaskMaxPoint})`}
                              </div>
                            );
                          })}
                    </Stack>
                  </StyledTableCell>
                );
              }
              return <StyledTableCell key={taskIndex} />;
            })}
            <StyledTableCell>TOTAL</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {learnerGroups
            .filter(
              (group) =>
                group.assignedMentorId ===
                project.mentors.find((mentor) => mentor.fullName === mentorName)
                  ?.id
            )
            .map((group, groupIndex) => {
              return (
                <StyledTableRow key={groupIndex}>
                  <StyledTableCell component="th" scope="row">
                    {group.groupIndex}
                  </StyledTableCell>
                  <StyledTableCell>{group.groupName}</StyledTableCell>
                  {project?.tasks.map((task, taskIndex) => {
                    if (!task.isHidden) {
                      if (!!task.subTasks.length) {
                        return (
                          <StyledTableCell key={taskIndex}>
                            <Stack
                              direction="row"
                              justifyContent="space-evenly"
                            >
                              {task.subTasks.map((subTask, subTaskIndex) => {
                                if (!subTask.isHidden) {
                                  return (
                                    <MentorSubTaskBox
                                      key={subTaskIndex}
                                      group={group}
                                      taskIndex={taskIndex}
                                      subTaskIndex={subTaskIndex}
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
                            <Stack
                              direction="row"
                              justifyContent="space-around"
                            >
                              <MentorTaskBox
                                group={group}
                                taskIndex={taskIndex}
                              />
                            </Stack>
                          </StyledTableCell>
                        );
                      }
                    }
                    return <StyledTableCell key={taskIndex} />;
                  })}
                  <StyledTableCell>{group.totalPoint}</StyledTableCell>
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
