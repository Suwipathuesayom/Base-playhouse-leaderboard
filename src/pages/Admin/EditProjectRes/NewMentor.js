import React, { Fragment, useState } from "react";
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
import EditableRow from "./EditableRow";

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

export default function NewMentor({}) {
  const [selectedProject, setSelectedProject] = useState(defaultList);

  const [editContactId, setEditContactId] = useState(false);

  const [mentorName, setMentorName] = useState("");

  //copy to clipboard
  const [copyMentor, setCopyMentor] = useState("Copy clipboard");

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
      setCopyMentor("Copy clipboard");
    }, 1500);
  };

  const handleChange = (e) => {
    setMentorName(e.target.value);
  };

  // Remove mentorName
  const handleRemoveMentor = (index) => {
    let tempMentorList = [...selectedProject];
    tempMentorList.splice(index, 1);
    setSelectedProject(tempMentorList);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ fontSize: 24 }}>Mentor</StyledTableCell>
              <StyledTableCell align="left" width="500px">
                <InputBase
                  value={mentorName}
                  sx={{ flex: 1, bgcolor: "#ffffff", width: "100%" }}
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (event.key === "Enter" || event.key === "Return") {
                      setSelectedProject([
                        ...selectedProject,
                        { name: mentorName },
                      ]);
                      setMentorName("");
                    }
                  }}
                />
              </StyledTableCell>

              <StyledTableCell align="left">
                <AddCircleIcon
                  onClick={() => {
                    setSelectedProject([
                      ...selectedProject,
                      { name: mentorName },
                    ]);
                  }}
                />
                <ArrowDropDownIcon />
              </StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProject.map((item) => (
              <StyledTableRow key={item.name}>
                <StyledTableCell component="th" scope="row">
                  {/* {item.name} */}
                  {editContactId === item.name ? (
                    <EditableRow name={item.name} />
                  ) : (
                    item.name
                  )}
                </StyledTableCell>
                <StyledColorCell align="right"></StyledColorCell>
                <StyledColorCell align="right">
                  <EditIcon
                    onClick={(e) => {
                      setEditContactId(item.name);
                    }}
                  />
                  <ShareIcon />
                </StyledColorCell>
                <StyledColorCell>
                  <DeleteIcon
                    name={item.name}
                    onClick={() => handleRemoveMentor(item.name)}
                  />
                </StyledColorCell>
                <StyledColorCell
                  align="left"
                  onClick={() => {
                    copyToClipBoard(
                      `https://base-playhouse-leader-board.web.app/learner/${selectedProject?.projectName}`,
                      setCopyMentor("Copied!")
                    );
                    resetCopyClick("learner");
                  }}
                >
                  {copyMentor}
                </StyledColorCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
