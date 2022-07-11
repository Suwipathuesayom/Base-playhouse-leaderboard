import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import {
  AddCircle,
  ArrowDropDown,
  Edit,
  Delete,
  Share,
  ContentCopy,
} from "@mui/icons-material";
import EditableRow from "./EditableRow";
import "./NewMentor.css";
import { Divider } from "@mui/material";

export default function NewMentor({ project, setProject }) {
  const [selectedProject, setSelectedProject] = useState(project.mentors);

  const [editContactId, setEditContactId] = useState(false);

  const [mentorName, setMentorName] = useState("");

  // State Handler
  const handleAddMentor = (mentorName) => {
    // handle UI State
    let tempMentorList = [...selectedProject];
    tempMentorList.push({
      fullName: mentorName,
      index: selectedProject.length,
    });
    setSelectedProject(tempMentorList);

    // clear TextInput
    setMentorName("");
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
    <div className="newMentor__container">
      <div className="newMentor__header">
        <h3>Mentor</h3>
        <InputBase
          value={mentorName}
          sx={{ flexGrow: 1, bgcolor: "#ffffff", mr: "10px" }}
          onChange={handleChange}
          onKeyPress={(event) => {
            if (event.key === "Enter" || event.key === "Return") {
              if (event.target.value !== "") {
                setSelectedProject([
                  ...selectedProject,
                  { fullName: mentorName, index: selectedProject.length },
                ]);
                setMentorName("");
              }
            }
          }}
        />
        <AddCircle
          className="newMentor__icon"
          onClick={() => {
            if (mentorName !== "") {
              handleAddMentor(mentorName);
            }
          }}
        />
        <ArrowDropDown className="newMentor__icon" />
      </div>
      <Divider sx={{ bgcolor: "white" }} />
      {selectedProject.map((item, index) => (
        <React.Fragment key={index}>
          <div className="newMentor__body">
            <p>
              {editContactId === item.fullName ? (
                <EditableRow
                  name={item.fullName}
                  setSelectedProject={setSelectedProject}
                  index={index}
                  selectedProject={selectedProject}
                  setEditContactId={setEditContactId}
                />
              ) : (
                item.fullName
              )}
            </p>
            <Edit
              className="newMentor__icon"
              onClick={(e) => {
                setEditContactId(item.fullName);
              }}
            />
            <Share className="newMentor__icon" />
            <Delete
              className="newMentor__icon"
              onClick={() => handleRemoveMentor(index)}
            />
            <ContentCopy className="newMentor__icon" />
          </div>
          <Divider sx={{ bgcolor: "white" }} />
        </React.Fragment>
      ))}
    </div>
  );
}
