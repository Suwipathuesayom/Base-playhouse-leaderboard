import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const EditProjectNameAndColor = () => {
  return (
    <Box
      sx={{
        width: "100%",
        // maxWidth: "50%",
        marginTop: 3,
        marginLeft: 2,
      }}
    >
      <TextField label="ชื่อโปรเจค" sx={{ bgcolor: "white" }} />
      {/* <NewProjectNameAndColor /> */}
    </Box>
  );
};

export default EditProjectNameAndColor;
