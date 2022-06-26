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
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import ExportCSV from "./ExportCSV";

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

const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
}));

export default function AdminTable({ projectDashboard }) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState();

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

  const resetCopyClick = () => {
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
    setSelectedProject();
  };

  const queryProject = async (project) => {
    console.log("in query project");
    await db
      .collection("users")
      .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
      .collection("project")
      .where("projectName", "==", project.projectName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // const data = {
          //   createdAt: doc.data().createdAt.toDate(),
          //   id: doc.data().id,
          //   imageUrl: doc.data().imageUrl,
          //   learnerGroups: doc
          //     .data()
          //     .learnerGroups.map((group) => group.groupName),
          //   mentors: doc.data().mentors.map((mentor) => mentor.fullName),
          //   projectName: doc.data().projectName,
          //   tasks: doc.data().tasks.map((task) => task.taskName),
          //   points: doc.data().tasks.map((task) => task.point),
          //   subTasks: doc
          //     .data()
          //     .tasks.map((task, index) =>
          //       task.subTasks.map(
          //         (subTask, subIndex) =>
          //           `[${index},${subIndex},${subTask.subTaskName}]`
          //       )
          //     ),
          //   subTasksPoints: doc
          //     .data()
          //     .tasks.map((task, index) =>
          //       task.subTasks.map(
          //         (subTask, subIndex) =>
          //           `[${index},${subIndex},${subTask.point}]`
          //       )
          //     ),
          //   theme: [doc.data().theme.top3, doc.data().theme.hilight],
          // };
          // console.log(data);
          // setSelectedProject(data);
          setSelectedProject(doc.data());
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
                {selectedProject?.projectName}
              </StyledTypography>
            </DialogContentText>
            <InputLabel>Speaker</InputLabel>
            <StyledDiv>
              {selectedProject && (
                <TextField
                  disabled
                  fullWidth
                  id="filled-disabled"
                  value={`https://base-playhouse-leader-board.web.app/speaker/${selectedProject?.projectName}`}
                  size={"small"}
                />
              )}
              {!selectedProject && (
                <LoadingButton
                  disabled
                  loading={!selectedProject}
                  fullWidth
                  size={"large"}
                />
              )}
              {selectedProject && (
                <Button
                  onClick={() => {
                    copyToClipBoard(
                      `https://base-playhouse-leader-board.web.app/speaker/${selectedProject?.projectName}`,
                      setCopySpeaker("Copied!")
                    );
                    resetCopyClick("speaker");
                  }}
                  style={{ marginLeft: "5px", textTransform: "unset" }}
                >
                  {copySpeaker}
                </Button>
              )}
            </StyledDiv>
            <InputLabel>Learner</InputLabel>
            <StyledDiv>
              {selectedProject && (
                <TextField
                  disabled
                  fullWidth
                  id="filled-disabled"
                  value={`https://base-playhouse-leader-board.web.app/learner/${selectedProject?.projectName}`}
                  size={"small"}
                />
              )}
              {!selectedProject && (
                <LoadingButton
                  disabled
                  loading={!selectedProject}
                  fullWidth
                  size={"large"}
                />
              )}
              {selectedProject && (
                <Button
                  onClick={() => {
                    copyToClipBoard(
                      `https://base-playhouse-leader-board.web.app/learner/${selectedProject?.projectName}`,
                      setCopyLearner("Copied!")
                    );
                    resetCopyClick("learner");
                  }}
                  style={{ marginLeft: "5px", textTransform: "unset" }}
                >
                  {copyLearner}
                </Button>
              )}
            </StyledDiv>
            <div style={{ marginTop: 10 }}>
              <ExportCSV selectedProject={selectedProject} />
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
