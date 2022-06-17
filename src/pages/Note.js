import React from "react";
import "../assets/styles/Note.css"
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function BoxSx() {
  return (
  <Box
        className="Note"
        sx={{
          width: "100%",
          height: "100vh",
          marginRight: "center",
          backgroundColor: "black",
          textAlign: "center",
        }}
      >
        <Box
        sx={{
          borderRadius: 10,
          width: "50%",
          top:10,
          marginRight: "10px",
          
        }}
        >
        <Typography
              variant={"h1"}
              sx={{
                top:10,
                backgroundColor: "white",
                textAlign: "center",
                textColor: "red",
              }}
            >
            หัวข้อ
            </Typography>
          </Box>  
      </Box>
      
  )
}

