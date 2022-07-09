import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const EditProjectNameAndColor = () => {
  return (
    <Box marginTop={5}>
      <TextField label="ชื่อโปรเจค" size="small" sx={{ bgcolor: "white" }} />
      {/* <NewProjectNameAndColor /> */}
    </Box>
  );
};

export default EditProjectNameAndColor;
