import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import { AddCircle, ArrowDropDown, Edit, Delete } from "@mui/icons-material";
import EditableRow from "./EditableRow";
import "./NewMentor.css";
import { Divider } from "@mui/material";

export default function NewEditTask({ project, setProject }) {
  const [selectedProject, setSelectedProject] = useState(project.mentors);

  const [editContactId, setEditContactId] = useState(false);

  const [taskName, setTaskName] = useState("");

  // State Handler
  const handleAddLearner = (taskName) => {
    // handle UI State
    let tempMentorList = [...selectedProject];
    tempMentorList.push({
      fullName: taskName,
      index: selectedProject.length,
    });
    setSelectedProject(tempMentorList);

    // clear TextInput
    setTaskName("");
  };

  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  // Remove learnerName
  const handleRemoveLearner = (index) => {
    let tempMentorList = [...selectedProject];
    tempMentorList.splice(index, 1);
    setSelectedProject(tempMentorList);
  };

  return (
    <div className="newTask__container">
      <div className="newTask__header">
        <h3>Task</h3>
        <InputBase
          value={taskName}
          sx={{ flexGrow: 1, bgcolor: "#ffffff", mr: "10px" }}
          onChange={handleChange}
          onKeyPress={(event) => {
            if (event.key === "Enter" || event.key === "Return") {
              if (event.target.value !== "") {
                setSelectedProject([
                  ...selectedProject,
                  { fullName: taskName, index: selectedProject.length },
                ]);
                setTaskName("");
              }
            }
          }}
        />
        <AddCircle
          className="newTask__icon"
          onClick={() => {
            if (taskName !== "") {
              handleAddLearner(taskName);
            }
          }}
        />
        <ArrowDropDown className="newTask__icon" />
      </div>
      <Divider sx={{ bgcolor: "white" }} />
      {selectedProject.map((item) => (
        <React.Fragment>
          <div className="newTask__body">
            <p>
              {editContactId === item.fullName ? (
                <EditableRow
                  name={item.fullName}
                  setSelectedProject={setSelectedProject}
                  selectedProject={selectedProject}
                  setEditContactId={setEditContactId}
                />
              ) : (
                item.fullName
              )}
            </p>
            <Edit
              className="newTask__icon"
              onClick={(e) => {
                setEditContactId(item.fullName);
              }}
            />
            <Delete className="newTask__icon" />
          </div>
          <Divider sx={{ bgcolor: "white" }} />
        </React.Fragment>
      ))}
    </div>
  );
}
