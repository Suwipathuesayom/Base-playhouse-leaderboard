import { Close } from "@mui/icons-material";
import { Alert, Collapse, IconButton } from "@mui/material";
import React from "react";

const ProjectStatusAlert = ({
  showAlert,
  setShowAlert,
  projectStatus = "info",
  setProjectStatus,
  projectAlertText,
  action,
}) => {
  return (
    <Collapse sx={{ width: "300px" }} in={showAlert}>
      <Alert
        severity={projectStatus}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setShowAlert(false);
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
        // sx={{ mb: 2, fontSize: 20, alignItems: "center" }}
      >
        {/* <AlertTitle>
        </AlertTitle> */}
        <strong>
          {`${projectStatus === "info" ? "กำลัง" : ""}${
            action === "new" ? "สร้าง" : "แก้ไข"
          }โปรเจค${
            projectStatus === "success"
              ? "สำเร็จ"
              : projectStatus === "error"
              ? "ล้มเหลว"
              : " . . ."
          }`}
        </strong>
        {projectAlertText && <p>• {projectAlertText}</p>}
      </Alert>
    </Collapse>
  );
};

export default ProjectStatusAlert;
