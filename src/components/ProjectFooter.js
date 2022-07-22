import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import "../pages/Admin/AdminProject.css";
import color from "../constant/color";
import { useNavigate } from "react-router-dom";
import handleAddNewProject from "./Functions/handleAddNewProject";
import handleUpdateProject from "./Functions/handleUpdateProject";
import { ChevronLeft, Save } from "@mui/icons-material";

const ProjectFooter = ({
  project,
  setProject,
  showAlert,
  setShowAlert,
  projectStatus,
  setProjectStatus,
  setProjectAlertText,
}) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        color: color.primaryOrange,
        backgroundColor: color.primaryBlack,
        top: "auto",
        bottom: 0,
      }}
    >
      <Toolbar className="projectFooter">
        <button
          disabled={projectStatus === "info"}
          id={"back-button"}
          onClick={() => navigate("/admin-leaderboard")}
        >
          <div>
            <ChevronLeft />
          </div>
          <span>ย้อนกลับ</span>
        </button>
        <div style={{ flexGrow: 1 }} />
        <button
          id={projectStatus === "info" ? "saving-button" : "save-button"}
          onClick={() => {
            if (!project.id)
              handleAddNewProject(
                project,
                setProject,
                showAlert,
                setShowAlert,
                setProjectStatus,
                setProjectAlertText
              );
            else
              handleUpdateProject(
                project,
                setProject,
                setShowAlert,
                setProjectStatus,
                setProjectAlertText
              );
          }}
        >
          {projectStatus !== "info" && (
            <div>
              <Save />
            </div>
          )}
          {projectStatus === "info" && <div className="loader"></div>}
          <span>{project.id ? "บันทึก" : "สร้าง"}</span>
        </button>
      </Toolbar>
    </AppBar>
  );
};

export default ProjectFooter;
