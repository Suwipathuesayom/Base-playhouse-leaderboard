import { Button } from "@mui/material";
import React from "react";
import "../../assets/Styles/NewProject.css";

import color from "../../constant/color";

function NewProjectFooter() {
  return (
    <div className="footer">
      <Button
        // className="button"
        style={{
          fontSize: 24,
          borderRadius: 20,
          color: color.primaryOrange,
          backgroundColor: color.primaryBlack,
        }}
        disableElevation
        variant="contained"
      >
        ย้อนกลับ
      </Button>
      <Button
        // className="button"
        style={{
          fontSize: 24,
          borderRadius: 20,
          color: color.primaryOrange,
          backgroundColor: color.primaryBlack,
        }}
        disableElevation
        variant="contained"
      >
        สร้างเลย
      </Button>
    </div>
  );
}

export default NewProjectFooter;
