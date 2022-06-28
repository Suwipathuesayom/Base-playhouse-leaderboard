import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getAuth } from "firebase/auth";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";

const StylesError = styled("div")(({ theme }) => ({
  textAlign: "center",
  justifyContent: "center",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
}));

const auth = getAuth();

function NotFoundPage() {
  const navigate = useNavigate();
  const [isTimeout, setIsTimeout] = useState(false);

  const goBackToLandingScreen = () => {
    console.log(auth.currentUser);
    if (auth.currentUser) {
      navigate("/admin-leaderboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsTimeout(true);
    }, 3000);
  });

  if (isTimeout) {
    return (
      <StylesError>
        <Box>
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
          <Button
            variant="contained"
            color="error"
            sx={{
              marginTop: "2%",
              width: "300px",
              height: "90px",
              fontSize: "30px",
            }}
            onClick={() => goBackToLandingScreen()}
          >
            กลับไปหน้าแรก
          </Button>
        </Box>
      </StylesError>
    );
  } else {
    return <SplashScreen />;
  }
}

export default NotFoundPage;
