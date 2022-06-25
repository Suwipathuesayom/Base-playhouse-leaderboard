import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
const StylesError = styled("Div")(({ theme }) => ({
  textAlign: "center",
  justifyContent: "center",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
}));

function NotFoundPage() {
  return (
    <StylesError>
      <Box sx={{}}>
        <Box
          sx={{
            fontSize: 94,
          }}
        >
          404
        </Box>

        <Box
          sx={{
            fontSize: 35,
            marginTop: "2%",
          }}
        >
          ขออภัย ไม่พบหน้าเว็บไซต์ที่คุณต้องการ
        </Box>
        <Link to="/">
          <Button
            variant="contained"
            color="error"
            sx={{
              textDecoration: "underline",
              marginTop: "2%",
              width: "300px",
              height: "90px",
              fontSize: "30px",
            }}
          >
            กลับไปหน้าแรก
          </Button>
        </Link>
      </Box>
    </StylesError>
  );
}

export default NotFoundPage;
