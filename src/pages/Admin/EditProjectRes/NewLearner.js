import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import { AddCircle, ArrowDropDown, Edit, Delete } from "@mui/icons-material";
import { Divider } from "@mui/material";
import EditableRow from "./EditableRow";
import "./NewMentor.css";

export default function NewLearner({ project, setProject }) {
  const [selectedProject, setSelectedProject] = useState(project.mentors);

  const [editContactId, setEditContactId] = useState(false);

  const [learnerName, setLearnerName] = useState("");

  // State Handler
  const handleAddMentor = (learnerName) => {
    // handle UI State
    let tempMentorList = [...selectedProject];
    tempMentorList.push({
      fullName: learnerName,
      index: selectedProject.length,
    });
    setSelectedProject(tempMentorList);

    // clear TextInput
    setLearnerName("");
  };

  const handleChange = (e) => {
    setLearnerName(e.target.value);
  };

  // Remove learnerName
  const handleRemoveLearner = (index) => {
    let tempMentorList = [...selectedProject];
    tempMentorList.splice(index, 1);
    setSelectedProject(tempMentorList);
  };
  return (
    <div className="newLearner__container">
      <div className="newLearner__header">
        <h3>Learner</h3>
        <InputBase
          value={learnerName}
          sx={{ flexGrow: 1, bgcolor: "#ffffff", mr: "10px" }}
          onChange={handleChange}
          onKeyPress={(event) => {
            if (event.key === "Enter" || event.key === "Return") {
              if (event.target.value !== "") {
                setSelectedProject([
                  ...selectedProject,
                  { fullName: learnerName, index: selectedProject.length },
                ]);
                setLearnerName("");
              }
            }
          }}
        />
        <AddCircle
          className="newLearner__icon"
          onClick={() => {
            if (learnerName !== "") {
              handleAddMentor(learnerName);
            }
          }}
        />
        <ArrowDropDown className="newLearner__icon" />
      </div>
      <Divider sx={{ bgcolor: "white" }} />
      {selectedProject.map((item) => (
        <React.Fragment>
          <div className="newLearner__body">
            <p>
              {editContactId === item.fullName ? (
                <EditableRow
                  className="newLearner__icon"
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
              className="newLearner__icon"
              onClick={(e) => {
                setEditContactId(item.fullName);
              }}
            />

            <Delete className="newLearner__icon" />
          </div>
          <Divider sx={{ bgcolor: "white" }} />
        </React.Fragment>
      ))}
    </div>
  );
}
