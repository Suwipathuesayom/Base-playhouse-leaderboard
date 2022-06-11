import React from "react";
import "../../assets/Styles/NewProject.css";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import { AddCircle, HighlightOff } from "@mui/icons-material";

import color from "../../constant/color";

function NewProjectHeader() {
  return (
    <div className="header">
      <img src={require("../../assets/images/uploadImage.png")} alt="" />
      <Box
        className="header__content"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minWidth: 1200,
          justifyContent: "space-between",
          alignItems: "center",
          // backgroundColor: "pink",
        }}
      >
        <h1>NEW PROJECT</h1>
        <Stack
          className="header__contentImport"
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
          // bgcolor="red"
        >
          <p>เพิ่มเกณฑ์จากโปรเจคที่มีอยู่แล้ว ?</p>
        </Stack>
        <Stack
          width={"100%"}
          height={"70px"}
          sx={{ borderRadius: 5, padding: "0 20px" }}
          flexDirection="row"
          alignItems={"center"}
          bgcolor={color.secondaryBlack}
        >
          <Typography
            sx={{
              width: 180,
              fontSize: 32,
              fontWeight: 600,
              fontFamily: "Prompt",
              marginRight: "20px",
              color: color.primaryOrange,
            }}
          >
            ชื่อโปรเจค
          </Typography>
          <InputBase
            sx={{
              width: 500,
              padding: "0 10px",
              marginRight: "20px",
              borderRadius: 2,
              fontSize: 20,
              backgroundColor: "white",
            }}
          />
          <InputBase
            sx={{
              width: 150,
              padding: "0 10px",
              marginRight: "20px",
              borderRadius: 2,
              fontSize: 20,
              backgroundColor: "white",
            }}
            defaultValue={"#"}
          />
          <InputBase
            sx={{
              width: 150,
              padding: "0 10px",
              marginRight: "20px",
              borderRadius: 2,
              fontSize: 20,
              backgroundColor: "white",
            }}
            defaultValue={"#"}
          />
        </Stack>
        <Stack
          width={"100%"}
          height={"70px"}
          sx={{ borderRadius: 5, padding: "0 20px" }}
          flexDirection="row"
          alignItems={"center"}
          bgcolor={color.secondaryBlack}
        >
          <Typography
            sx={{
              width: 180,
              fontSize: 32,
              fontWeight: 600,
              marginRight: "20px",
              color: color.primaryOrange,
            }}
          >
            เพิ่ม Mentor
          </Typography>
          <InputBase
            sx={{
              width: 500,
              padding: "0 10px",
              marginRight: "20px",
              borderRadius: 2,
              fontSize: 20,
              backgroundColor: "white",
            }}
          />
          <AddCircle
            style={{
              fontSize: 40,
              color: color.primaryOrange,
              marginRight: "20px",
            }}
          />
          <Button
            variant="contained"
            sx={{
              fontSize: 16,
              fontWeight: 600,
              // borderRadius: 20,
              marginRight: "20px",
              color: color.primaryBlack,
              backgroundColor: "white",
            }}
            endIcon={<HighlightOff style={{ fontSize: 32 }} />}
          >
            Tony S.
          </Button>
          <Button
            variant="contained"
            sx={{
              fontSize: 16,
              fontWeight: 600,
              // borderRadius: 20,
              marginRight: "20px",
              color: color.primaryBlack,
              backgroundColor: "white",
            }}
            endIcon={<HighlightOff style={{ fontSize: 32 }} />}
          >
            Steve R.
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default NewProjectHeader;
