import { Close } from "@mui/icons-material";
import { Alert, Collapse, IconButton } from "@mui/material";
import React from "react";

const ProjectStatusAlert = ({
  editProjectStatus = "info",
  setEditProjectStatus,
  action,
  alertText = "",
}) => {
  return (
    <Collapse
      sx={{ width: "300px" }}
      in={
        editProjectStatus === "info" ||
        editProjectStatus === "success" ||
        editProjectStatus === "error"
      }
    >
      <Alert
        severity={
          editProjectStatus === "warning" ? "success" : editProjectStatus
        }
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setEditProjectStatus("warning");
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
          {`${editProjectStatus === "info" ? "กำลัง" : ""}${
            action === "new" ? "สร้าง" : "แก้ไข"
          }โปรเจค${
            editProjectStatus === "success"
              ? "สำเร็จ"
              : editProjectStatus === "error"
              ? "ล้มเหลว"
              : " . . ."
          }`}
        </strong>
        {!!alertText.length && <p>• {alertText}</p>}
      </Alert>
    </Collapse>
  );
};

export default ProjectStatusAlert;
