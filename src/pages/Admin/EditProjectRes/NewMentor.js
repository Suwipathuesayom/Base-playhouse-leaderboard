import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { StyledColorCell } from "../../../assets/styles/TypographyStyles";
import { db } from "../../../config/firebase";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: "#FF5B4A",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#242424",
    color: "#ffffff",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const defaultList = [
  { name: "Frozen yoghurt" },
  { name: "Ice cream sandwich" },
  { name: "ItemThree" },
];

export default function NewMentor() {
  const [selectedProject, setSelectedProject] = useState(defaultList);
  // const [deletedProject, setDeletedProject] = useState(false);

  // const [editing, setEditing] = useState(null);

  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name");
    setSelectedProject(selectedProject.filter((item) => item.name !== name));
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ fontSize: 24 }}>Mentor</StyledTableCell>
            <StyledTableCell align="left" width="500px">
              <InputBase sx={{ flex: 1, bgcolor: "#ffffff", width: "100%" }} />
            </StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
            {/* <StyledTableCell align="left"></StyledTableCell> */}
            <StyledTableCell align="left">
              <AddCircleIcon />
              <ArrowDropDownIcon />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProject.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledColorCell align="right"></StyledColorCell>
              <StyledColorCell align="right" sx={{ paddingRight: "5px" }}>
                <EditIcon />
                <DeleteIcon name={item.name} onClick={handleRemoveItem} />
                {/* <ShareIcon /> */}
              </StyledColorCell>
              <StyledColorCell align="left">Copy Clipboard</StyledColorCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
