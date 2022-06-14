import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import "../assets/styles/AdminDashboard.css";

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

function createData(name, lastEdit, total, button) {
  return { name, lastEdit, total, button };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0),
];

export default function CustomizedTables() {
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
                ชื่อโปรเจค (ทั้งหมด 69 โปรเจค)
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
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center" component="th" scope="row">
                  <StarBorderIcon></StarBorderIcon>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.lastEdit}</StyledTableCell>
                <StyledTableCell align="center">{row.total}</StyledTableCell>
                <StyledTableCell
                  align="left"
                  style={{
                    // display: "flex",
                    // backgroundColor: "#FFFFFF",
                    flexDirection: "row",
                    // justifyContent: "space-evenly",
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
                        variant="p"
                        style={{
                          color: "#FF5B4A",
                          fontSize: 15,
                          fontFamily: "Raleway",
                          textTransform: "uppercase",
                        }}
                      >
                        Edit
                      </Typography>
                    </Box>
                  </Stack>
                  {/* <div>555</div>
                <div>555</div> */}
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
                Avengers
              </Typography>
            </DialogContentText>
            <InputLabel>Speaker</InputLabel>
            <TextField id="outlined" fullWidth />
            <InputLabel>Leaner</InputLabel>
            <TextField id="outlined" fullWidth />
            <InputLabel>Mentor/Judge</InputLabel>
            <TextField id="outlined" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
