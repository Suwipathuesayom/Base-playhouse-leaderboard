import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import color from "../constant/color";
import { useNavigate } from "react-router-dom";
import handleAddNewProject from "./Functions/handleAddNewProject";
import handleUpdateProject from "./Functions/handleUpdateProject";

const ProjectFooter = ({
  project,
  setProject,
  setEditProjectStatus,
  setEditProjectStatusText,
}) => {
  const navigate = useNavigate();
  const buttonStyle = {
    width: 100,
    backgroundColor: color.primaryOrange,
    color: "white",
    ":hover": {
      backgroundColor: color.secondaryOrange,
    },
  };
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
      <Toolbar>
        <Button
          variant="contained"
          sx={buttonStyle}
          onClick={() => navigate("/admin-leaderboard")}
        >
          ย้อนกลับ
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          sx={buttonStyle}
          onClick={() => {
            if (!project.id)
              handleAddNewProject(
                project,
                setProject,
                setEditProjectStatus,
                setEditProjectStatusText
              );
            else handleUpdateProject(project, setProject, setEditProjectStatus);
          }}
        >
          {project.id ? "บันทึก" : "สร้าง"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ProjectFooter;
