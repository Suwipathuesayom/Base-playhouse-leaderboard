<<<<<<< HEAD
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
=======
import React from "react";
import "../assets/Styles/Landing.css";
import { Table } from "react-bootstrap";
import "../assets/Styles/LearnerTable.css";
import BgDark from "../assets/images/Bg-dark.png";
>>>>>>> 81a6852a5f5a37c91206571932c62cded1a90151

function createData(rank,group, name, total, protein) {
  return {rank, group, name, total, protein };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const rows = [
  createData(1,5,'Frozen yoghurt', 159, 6.0, 24),
  createData(2,6,'Ice cream sandwich', 237, 9.0, 37),
  createData(3,12,'Eclair', 262, 16.0, 24),
  createData(4,4,'Cupcake', 305, 3.7, 67),
  createData(5,10,'Gingerbread', 356, 16.0, 49),
];

export default function LeanerTable() {
  return (
<<<<<<< HEAD
    <TableContainer component={Paper}>
      <Table style={{width: 969}} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow style={{textTransform: 'uppercase'}}>
            <StyledTableCell  align="right">Rank</StyledTableCell>
            <StyledTableCell  align="left">Group</StyledTableCell>
            <StyledTableCell  align="left">Name</StyledTableCell>
            <StyledTableCell  align="left">Total</StyledTableCell>
            <StyledTableCell  align="left">Point</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.group}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell align="right">{row.rank}</TableCell>
              <TableCell component="th" scope="row">
                {row.group}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.total}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
=======
    <div className="learner-container">
      <div className="bgdark">
        <img src={BgDark} alt="logo-name" />
      </div>
      {/* <Table striped hover>
        <thead style={{backgroundColor: '#151515' , color: '#ffffff'}}>
          <tr>
            <th>RANK</th>
            <th>GROUP</th>
            <th>NAME</th>
            <th>TOTAL</th>
            <th>POINT</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor: '#FF5B4A'}}>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@111</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@222</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
            <td>@333</td>
          </tr>
        </tbody>
      </Table> */}
    </div>
>>>>>>> 81a6852a5f5a37c91206571932c62cded1a90151
  );
}
