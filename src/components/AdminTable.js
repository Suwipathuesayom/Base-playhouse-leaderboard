import React from "react";
import Moment from "react-moment";
import { styled } from "@mui/material/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Stack,
  Typography,
  InputLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Paper,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  tableCellClasses,
} from "@mui/material";
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
  console.log(projectDashboard);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                      onClick={handleClickOpen}
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
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
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
                firefox
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
              ></TextField>
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
              ></TextField>
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
              ></TextField>
              <Button>
                <ContentCopyIcon></ContentCopyIcon>
              </Button>
            </div>
            <div style={{ marginTop: 10 }}>
              <CSVLink
                data={projectDashboard}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="success">
                  Dowload Excel
                </Button>
              </CSVLink>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
