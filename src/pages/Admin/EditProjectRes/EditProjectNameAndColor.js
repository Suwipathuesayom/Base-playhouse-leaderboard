import React from "react";
import Box from "@mui/material/Box";
import { ColorInput } from "../../../assets/styles/InputStyles";

const EditProjectNameAndColor = () => {
  return (
    <Box marginTop={5}>
      {/* <TextField label="ชื่อโปรเจค" size="small" sx={{ bgcolor: "white" }} /> */}
      <ColorInput sx={{ width: 100 }} type="color" />
    </Box>
  );
};

export default EditProjectNameAndColor;
