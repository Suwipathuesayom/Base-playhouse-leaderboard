import { Close } from "@mui/icons-material";
import { Alert, Box, Collapse, IconButton } from "@mui/material";
import React from "react";

const ProjectStatusAlert = ({
  editProjectStatus = "info",
  setEditProjectStatus,
  action,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        paddingX: "35%",
        position: "absolute",
        top: "10px",
      }}
    >
      <Collapse
        in={
          editProjectStatus === "info" ||
          editProjectStatus === "success" ||
          editProjectStatus === "error"
        }
      >
        <Alert
          severity={editProjectStatus}
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
          sx={{ mb: 2, fontSize: 20, alignItems: "center" }}
        >
          {`${editProjectStatus === "info" ? "กำลัง" : ""}${
            action === "new" ? "สร้าง" : "แก้ไข"
          }โปรเจค${
            editProjectStatus === "success"
              ? "สำเร็จ"
              : editProjectStatus === "error"
              ? "ล้มเหลว"
              : " . . ."
          }`}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default ProjectStatusAlert;
