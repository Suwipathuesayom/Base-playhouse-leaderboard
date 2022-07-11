import { Divider } from "@mui/material";
import React from "react";
import color from "../constant/color";
import "../pages/Admin/AdminProject.css";

const ProjectHeader = ({ children }) => {
  return (
    <Divider
      className="adminProject__boxHeader"
      textAlign="left"
      sx={{
        mb: "20px",
        color: color.primaryOrange,
        "&::before": {
          borderTop: "solid white",
        },
        "&::after": {
          borderTop: "solid white",
        },
      }}
    >
      {children}
    </Divider>
  );
};

export default ProjectHeader;
