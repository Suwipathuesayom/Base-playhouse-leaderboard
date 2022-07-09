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

export default function NewMentor({ saveTodo }) {
  const [selectedProject, setSelectedProject] = useState(defaultList);
  // const [deletedProject, setDeletedProject] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);

  //copy to clipboard
  const [copyLearner, setCopyLearner] = useState("Copy clipboard");

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
      setCopyLearner("Copy clipboard");
    }, 1500);
  };

  const handleAddTasks = () => {
    let tempTodoList = [...todoList];
    tempTodoList.push({
      task: todoText,
      isDone: false,
    });
    setTodoList(tempTodoList);
    setTodoText("");
  };

  const handleChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name");
    setSelectedProject(selectedProject.filter((item) => item.name !== name));
  };

  const handleReName = (e) => {
    setIsEditing(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table" onSubmit={handleAddTasks}>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ fontSize: 24 }}>Mentor</StyledTableCell>
              <StyledTableCell align="left" width="500px">
                <InputBase
                  value={todoText}
                  sx={{ flex: 1, bgcolor: "#ffffff", width: "100%" }}
                  onChange={handleChange}
                />
              </StyledTableCell>

              <StyledTableCell align="left">
                <AddCircleIcon
                  onClick={() => {
                    setSelectedProject([
                      ...selectedProject,
                      { name: "ItemThree" },
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
                <StyledTableCell
                  component="th"
                  scope="row"
                  onKeyPress={(event) => {
                    if (event.key === "Enter") handleReName(event);
                  }}
                >
                  {item.name}
                </StyledTableCell>
                <StyledColorCell align="right"></StyledColorCell>
                <StyledColorCell align="right" sx={{ paddingRight: "5px" }}>
                  <EditIcon onClick={handleReName} />
                  {/* <ShareIcon /> */}
                </StyledColorCell>
                <StyledColorCell>
                  <DeleteIcon name={item.name} onClick={handleRemoveItem} />
                </StyledColorCell>
                <StyledColorCell
                  align="left"
                  onClick={() => {
                    copyToClipBoard(
                      `https://base-playhouse-leader-board.web.app/learner/${selectedProject?.projectName}`,
                      setCopyLearner("Copied!")
                    );
                    resetCopyClick("learner");
                  }}
                >
                  {copyLearner}
                </StyledColorCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
