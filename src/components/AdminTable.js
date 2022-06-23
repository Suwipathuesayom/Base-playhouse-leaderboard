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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { db } from "../config/firebase";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import ExportPlayer from "./Functions/exportCsv";
import ExportCsv from "./Functions/exportCsv";

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
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#242424",
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#FF5B4A",
  fontSize: 15,
  fontFamily: "Raleway",
  textTransform: "uppercase",
  textDecoration: "none",
}));

const StyledDiv = styled("Div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
}));

const StyledStack = styled("Stack")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
}));

export default function AdminTable({ projectDashboard }) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);

  //copy to clipboard
  const [copySpeaker, setCopySpeaker] = useState("Copy");
  const [copyLearner, setCopyLearner] = useState("Copy");

  // function copy here
  const copyToClipBoard = async (copyMe, setCopyFunction) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopyFunction("Copied!");
    } catch (err) {
      setCopyFunction("Failed to copy!");
    }
  };

  const resetCopyClick = (text) => {
    if (text === "speaker") {
      setCopySpeaker("Copied!");
    } else if (text === "learner") {
      setCopyLearner("Copied!");
    }
    setTimeout(() => {
      setCopySpeaker("Copy");
      setCopyLearner("Copy");
    }, 1500);
  };

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
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <StarBorderIcon sx={{ mr: "10px" }} />
                  ชื่อโปรเจค (ทั้งหมด {projectDashboard?.length} โปรเจค)
                </Stack>
              </StyledTableCell>
              {!smallScreen && (
                <StyledTableCell>
                  แก้ไขล่าสุด <ArrowDropDownIcon></ArrowDropDownIcon>
                </StyledTableCell>
              )}
              {!smallScreen && (
                <StyledTableCell>
                  คะแนนรวม <ArrowDropDownIcon></ArrowDropDownIcon>
                </StyledTableCell>
              )}
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody
            style={{ backgroundColor: "#151515" }}
            className="custom-bodyCell"
          >
            {projectDashboard.map((project, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <StarBorderIcon sx={{ mr: "10px" }} />
                    {project.projectName}
                  </Stack>
                </StyledTableCell>
                {!smallScreen && (
                  <StyledTableCell>
                    <Moment fromNow>
                      {project.createdAt.toDate().toISOString()}
                    </Moment>
                  </StyledTableCell>
                )}
                {!smallScreen && (
                  <StyledTableCell>{project.totalPoint}</StyledTableCell>
                )}
                <StyledTableCell align="left">
                  <StyledStack>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleClickOpen(project)}
                    >
                      Export
                    </Button>
                    <Box
                      sx={{
                        ml: "10px",
                        height: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <StyledTypography
                        component={Link}
                        to="/edit-project"
                        state={{ projectName: project.projectName }}
                        variant="p"
                      >
                        Edit
                      </StyledTypography>
                    </Box>
                  </StyledStack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Box Modal */}

      <Box>
        <Dialog
          open={open}
          onClose={() => handleClose()}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Export</DialogTitle>
          <DialogContent>
            <DialogContentText className="popup-header">
              Project:{" "}
              <StyledTypography variant="p">
                {selectedProject.projectName}
              </StyledTypography>
            </DialogContentText>
            <InputLabel>Speaker</InputLabel>
            <StyledDiv>
              <TextField
                disabled
                fullWidth
                id="filled-disabled"
                value={`localhost:3000/speaker/${selectedProject.projectName}`}
                size={"small"}
              />
              <Button
                onClick={() => {
                  copyToClipBoard(
                    `localhost:3000/speaker/${selectedProject.projectName}`
                    // setCopySpeaker("copied!")
                  );
                  resetCopyClick("speaker");
                }}
                style={{ marginLeft: "5px", textTransform: "unset" }}
              >
                {copySpeaker}
              </Button>
            </StyledDiv>
            <InputLabel>Learner</InputLabel>
            <StyledDiv>
              <TextField
                disabled
                fullWidth
                id="filled-disabled"
                value={`localhost:3000/learner/${selectedProject.projectName}`}
                size={"small"}
              />
              <Button
                onClick={() => {
                  copyToClipBoard(
                    `localhost:3000/learner/${selectedProject.projectName}`,
                    setCopyLearner("copied!")
                  );
                  resetCopyClick("learner");
                }}
                style={{ marginLeft: "5px", textTransform: "unset" }}
              >
                {copyLearner}
              </Button>
            </StyledDiv>
            {/* <InputLabel>Mentor/Judge</InputLabel>
            <StyledDiv>
              <TextField
                disabled
                fullWidth
                id="filled-disabled"
                value={`localhost:3000/mentor/${selectedProject.projectName}`}
                // inputProps={{
                //   style: {
                //     StyledInputProps,
                //   },
                // }}
                size={"small"}
                sx={StyledInputProps}
              />
              <Button
                onClick={() =>
                  copyToClipBoard(
                    `localhost:3000/mentor/${selectedProject.projectName}`,
                    setCopyMentor
                  )
                }
              >
                <ContentCopyIcon></ContentCopyIcon>
              </Button>
              {copyMentor}
            </StyledDiv> */}
            <div style={{ marginTop: 10 }}>
              <CSVLink
                data={[selectedProject]}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="success">
                  <ExportCsv />
                </Button>
              </CSVLink>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleClose()}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
