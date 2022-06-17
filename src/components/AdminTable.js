import React, { useState } from "react";
import Moment from "react-moment";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { db } from "../config/firebase";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "../assets/styles/AdminDashboard.css";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: "#FF5B4A",
    fontSize: "1.2rem",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "#ffffff",
    fontWeight: 800,
    fontFamily: "Raleway",
    fontSize: 15,
    fontStyle: "normal",
    flex: "none",
    order: 1,
    backgroundColor: "#242424",
    // flexGrow: 0,
    // height: 42,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#242424",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminTable({ projectDashboard }) {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);

  const handleClickOpen = (project) => {
    setOpen(true);
    queryProject(project);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject([]);
  };

  const queryProject = async (project) => {
    console.log("in query project");
    await db
      .collection("users")
      .doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2")
      .collection("project")
      .where("projectName", "==", project.projectName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = {
            createdAt: doc.data().createdAt.toDate(),
            id: doc.data().id,
            imageUrl: doc.data().imageUrl,
            learnerGroups: doc
              .data()
              .learnerGroups.map((group) => group.groupName),
            mentors: doc.data().mentors.map((mentor) => mentor.fullName),
            projectName: doc.data().projectName,
            tasks: doc.data().tasks.map((task) => task.taskName),
            points: doc.data().tasks.map((task) => task.point),
            subTasks: doc
              .data()
              .tasks.map((task, index) =>
                task.subTasks.map(
                  (subTask, subIndex) =>
                    `[${index},${subIndex},${subTask.subTaskName}]`
                )
              ),
            subTasksPoints: doc
              .data()
              .tasks.map((task, index) =>
                task.subTasks.map(
                  (subTask, subIndex) =>
                    `[${index},${subIndex},${subTask.point}]`
                )
              ),
            theme: [doc.data().theme.top3, doc.data().theme.hilight],
          };
          console.log(data);
          setSelectedProject(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <StarBorderIcon></StarBorderIcon>
                ชื่อโปรเจค (ทั้งหมด {projectDashboard?.length} โปรเจค)
              </StyledTableCell>
              <StyledTableCell align="center">
                แก้ไขล่าสุด <ArrowDropDownIcon></ArrowDropDownIcon>
              </StyledTableCell>
              <StyledTableCell align="center">
                คะแนนรวม <ArrowDropDownIcon></ArrowDropDownIcon>
              </StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody
            style={{ backgroundColor: "#151515" }}
            className="custom-bodyCell"
          >
            {projectDashboard.map((project, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  <StarBorderIcon></StarBorderIcon>
                  {project.projectName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Moment fromNow>
                    {project.createdAt.toDate().toISOString()}
                  </Moment>

                  {/* {5555} */}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {project.totalPoint}
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  style={{
                    flexDirection: "row",
                    alignItems: "left",
                    height: "100%",
                    padding: "5px",
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleClickOpen(project)}
                    >
                      Export
                    </Button>
                    <Box
                      sx={{
                        height: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        component={Link}
                        to="/edit-project"
                        state={{ projectName: project.projectName }}
                        variant="p"
                        style={{
                          color: "#FF5B4A",
                          fontSize: 15,
                          fontFamily: "Raleway",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        Edit
                      </Typography>
                    </Box>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Dialog
          open={open}
          onClose={() => handleClose()}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Export</DialogTitle>
          <DialogContent>
            <DialogContentText className="popup-header">
              Project:{" "}
              <Typography
                variant="p"
                style={{
                  color: "#FF5B4A",
                  fontSize: 15,
                  fontFamily: "Raleway",
                  textTransform: "uppercase",
                }}
              >
                {selectedProject.projectName}
                {/* firefox */}
                {/* {projectDashboard[0].projectName} */}
              </Typography>
            </DialogContentText>
            <InputLabel>Speaker</InputLabel>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <TextField
                disabled
                fullWidth
                id="filled-disabled"
                defaultValue="https://speakerdeck.com/firefox"
                inputProps={{
                  style: {
                    height: "1px",
                    display: "flex",
                  },
                }}
              />
              <Button>
                <ContentCopyIcon></ContentCopyIcon>
              </Button>
            </div>
            <InputLabel>Leaner</InputLabel>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <TextField
                disabled
                fullWidth
                id="filled-disabled"
                defaultValue="https://learner.com"
                inputProps={{
                  style: {
                    height: "1px",
                    display: "flex",
                  },
                }}
              />
              <Button>
                <ContentCopyIcon></ContentCopyIcon>
              </Button>
            </div>
            <InputLabel>Mentor/Judge</InputLabel>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <TextField
                disabled
                fullWidth
                id="filled-disabled"
                defaultValue="https://mentor/judge"
                inputProps={{
                  style: {
                    height: "1px",
                    display: "flex",
                  },
                }}
              />
              <Button>
                <ContentCopyIcon></ContentCopyIcon>
              </Button>
            </div>
            <div style={{ marginTop: 10 }}>
              <CSVLink
                data={[selectedProject]}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="success">
                  Dowload Excel
                </Button>
              </CSVLink>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
