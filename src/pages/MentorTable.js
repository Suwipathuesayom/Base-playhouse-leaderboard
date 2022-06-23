import React, { useState } from "react";
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
import { Box, Stack, Typography } from "@mui/material";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: color.primaryOrange,
    color: theme.palette.common.white,
    borderBottomWidth: 0,
    fontSize: 20,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
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

export default function MentorTable({ dummyData, setDummyData }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [selectedGroup, setSelectedGroup] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [learnerGroups, setLearnerGroups] = React.useState(
    dummyData?.learnerGroups
  );

  const handleUpdateProject = async (tempProject) => {
    try {
      let userRef = db.collection("users").doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2");

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

  const handleAddNewMessage = async (note, groupIndex) => {
    try {
      let message = {};
      await db
        .collection("messages")
        .doc(dummyData.id)
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
            mentorName: "test mentor name",
            note: note,
          });
        }
        await db
          .collection("messages")
          .doc(dummyData.id)
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
          .doc(dummyData.id)
          .set({
            id: dummyData.id,
            mentors: [
              {
                groupIndex: groupIndex,
                mentorName: "test mentor name",
                note: note,
              },
            ],
            projectName: dummyData.projectName,
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckTaskByIndex = (index, subIndex) => {
    // handle UI State
    const tempLearnerGroups = dummyData.learnerGroups;
    if (tempLearnerGroups[index].points.length === 0) {
      for (let i = 0; i < dummyData.tasks.length; i++) {
        tempLearnerGroups[index].points.push({});
      }
    }
    if (Object.keys(tempLearnerGroups[index].points[subIndex]).length === 0) {
      tempLearnerGroups[index].points[subIndex] = {
        isChecked: true,
        taskIndex: subIndex,
        taskPoint: dummyData.tasks[subIndex].point,
      };
    } else {
      tempLearnerGroups[index].points[subIndex].isChecked =
        !tempLearnerGroups[index].points[subIndex].isChecked;
    }
    tempLearnerGroups[index].totalPoint = calculateNewTotalPoint(
      tempLearnerGroups,
      index
    );
    setLearnerGroups([...tempLearnerGroups]);

    // handle Data State
    const tempDummyData = dummyData;
    if (tempDummyData.learnerGroups[index].points.length === 0) {
      for (let i = 0; i < dummyData.tasks.length; i++) {
        tempDummyData.learnerGroups[index].points.push({});
      }
    }
    if (
      Object.keys(tempDummyData.learnerGroups[index].points[subIndex])
        .length === 0
    ) {
      tempDummyData.learnerGroups[index].points[subIndex] = {
        isChecked: true,
        taskIndex: subIndex,
        taskPoint: dummyData.tasks[subIndex].point,
      };
    } else {
      tempDummyData.learnerGroups[index].points[subIndex].isChecked =
        tempLearnerGroups[index].points[subIndex].isChecked;
    }
    tempDummyData.learnerGroups[index].totalPoint = calculateNewTotalPoint(
      tempDummyData.learnerGroups,
      index
    );
    setDummyData(tempDummyData);
    handleUpdateProject(tempDummyData);
  };

  const calculateNewTotalPoint = (arr, index) => {
    let sum = 0;
    arr[index].points.forEach((point) => {
      if (point.isChecked) {
        sum = sum + point.taskPoint;
      }
    });
    return sum;
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, marginTop: 0, borderRadius: 20, minHeight: 650 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>GROUP</StyledTableCell>
            <StyledTableCell>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography fontWeight={600} fontSize={20}>
                  NAME
                </Typography>
                <Box
                  sx={{
                    width: "2px",
                    height: "50px",
                    backgroundColor: "white",
                  }}
                />
              </Stack>
            </StyledTableCell>
            {dummyData?.tasks.map((task, subIndex) => {
              if (!task.isHidden) {
                return (
                  <StyledTableCell key={subIndex}>
                    {task.taskName}
                  </StyledTableCell>
                );
              }
              return <div></div>;
              // ** DO NOT DELETE !!! Later for handling subTask

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
                  <Stack direction="row" justifyContent={"space-between"}>
                    {group.groupName}
                    <Box
                      sx={{
                        width: "2px",
                        height: "50px",
                        backgroundColor: "white",
                      }}
                    />
                  </Stack>
                </StyledTableCell>
                {dummyData?.tasks.map((task, subIndex) => {
                  if (!task.isHidden) {
                    return (
                      <StyledTableCell key={subIndex}>
                        <Checkbox
                          icon={<RadioButtonUnchecked />}
                          checkedIcon={<RadioButtonChecked />}
                          checked={
                            group.points[subIndex]
                              ? group.points[subIndex]?.isChecked
                                ? group.points[subIndex].isChecked
                                : false
                              : false
                          }
                          onChange={() =>
                            handleCheckTaskByIndex(index, subIndex)
                          }
                          sx={{
                            color: "white",
                            "&.Mui-checked": {
                              color: color.primaryOrange,
                            },
                          }}
                        />
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
                  {group.totalPoint < 0 ? 0 : group.totalPoint}
                </StyledTableCell>
                <StyledTableCell style={{ cursor: "pointer" }}>
                  <NoteAltIcon
                    onClick={() => {
                      handleOpen();
                      setSelectedGroup(index);
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
            Text in a modal
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
              label="Note"
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleAddNewMessage(note, selectedGroup)}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </TableContainer>
  );
}
