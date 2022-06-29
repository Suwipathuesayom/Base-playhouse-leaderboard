import React, { useState } from "react";
import Moment from "react-moment";
import {
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
import { Delete } from "@mui/icons-material";
import color from "../constant/color";
import queryNoteFromId from "./Functions/queryNoteFromId";

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

export default function AdminTable({ projectDashboard, setProjectDashboard }) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [mentors, setMentors] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
    setMentors([]);
  };

  const queryProject = async (project) => {
    await db
      .collection("users")
      .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
      .collection("project")
      .where("projectName", "==", project.projectName)
      .get()
      .then((snapshot) => {
        let project;
        snapshot.forEach((doc) => {
          // console.log(doc.data());
          project = doc.data();
          setSelectedProject(project);
        });
        queryNoteFromId(project.id, setMentors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteProject = async (project) => {
    const collectionRef = db
      .collection("users")
      .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3");

    const projectRef = collectionRef
      .collection("project")
      .where("projectName", "==", project.projectName);

    await projectRef
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
      })
      .catch((error) => console.log(error));

    const projectDashboardRef = collectionRef
      .collection("projectDashboard")
      .where("projectName", "==", project.projectName);

    await projectDashboardRef
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
        setProjectDashboard([]);
      })
      .catch((error) => console.log(error));
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
                  แก้ไขล่าสุด <ArrowDropDownIcon />
                </StyledTableCell>
              )}
              {!smallScreen && (
                <StyledTableCell>
                  คะแนนรวม <ArrowDropDownIcon />
                </StyledTableCell>
              )}
              <StyledTableCell align="left" />
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
                    <Delete
                      className="newProject__icon"
                      style={{
                        fontSize: 28,
                        color: color.primaryOrange,
                      }}
                      onClick={() => {
                        setSelectedProject(project);
                        setShowDeleteDialog(true);
                      }}
                    />
                    <StyledTypography
                      component={Link}
                      to="/edit-project"
                      state={{ projectName: project.projectName }}
                      variant="p"
                    >
                      Edit
                    </StyledTypography>
                  </StyledStack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Box Modal */}

      <Dialog open={open} onClose={() => handleClose()} fullWidth maxWidth="sm">
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
            <ExportCSV selectedProject={selectedProject} mentors={mentors} />
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

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText className="popup-header">
            Project:{" "}
            <StyledTypography variant="p">
              {selectedProject?.projectName}
            </StyledTypography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="error"
            onClick={() => setShowDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setShowDeleteDialog(false);
              handleDeleteProject(selectedProject);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
