import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: "#FF5B4A",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

function createData(name, lastEdit, total) {
  return { name, lastEdit, total };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              ชื่อโปรเจค (ทั้งหมด 69 โปรเจค)
            </StyledTableCell>
            <StyledTableCell align="left">แก้ไขล่าสุด</StyledTableCell>
            <StyledTableCell align="left">คะแนนรวม</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ backgroundColor: "#151515" }}>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.lastEdit}</StyledTableCell>
              <StyledTableCell align="left">{row.total}</StyledTableCell>
              {/* <StyledTableCell>
                <Button variant="contained" color="danger">
                  Success
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button variant="contained" color="danger">
                  Success
                </Button>
              </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
