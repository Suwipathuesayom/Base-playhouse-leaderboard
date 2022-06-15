import React from "react";
import "../../src/assets/Styles/Mentor2.css";
// import { Table } from "react-bootstrap";
import MentorTable from "../../src/pages/MentorTable";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";


export default function BoxSx() {
  const name = "เกณฑ์ A";
  return (
    <>
      {/* <div className="head-mentor"></div> */}
      <Box
        className="mentor"
        sx={{
          width: "100%",
          height: "100vh",
          // marginLeft: "center",
          marginRight: "center",
          backgroundColor: "pink",
        }}
      >
        <Stack
          // flexDirection={"row"}
          height={"100%"}
          alignItems="center"
          justifyContent="space-between"
          paddingX={"50px"}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              minWidth: 350,
              height: 200,
              justifyContent: "center",
              marginRight: "0px",
              backgroundColor: "black",
              borderRadius: 10,
              color: "white",
            }}
          >
            <Typography
              variant={"h1"}
              sx={{ backgroundColor: "red", textAlign: "center",textColor:"red" }}
            >
              {name?.length > 10 ? `${name.slice(0, 9)}...` : name}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "75%",
              width: "100%",
              borderRadius: 10,
              // minWidth: 1500,
              minHeight: 650,
              backgroundColor: "gray",
              "& .mentor-header": {
                // overflowX: "hidden",
              
              },
            }}
          >
            <MentorTable
            sx={{height: "100%"}}
            >
            
            </MentorTable>
            {/* {name?.length > 6 ? `${name.slice(0, 5)}...` : name} */}
          </Box>
        </Stack>
      </Box>
    </>
  );
}
