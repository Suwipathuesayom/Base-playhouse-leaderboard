import { Stack, Typography } from "@mui/material";
import React from "react";
import { SyncLoader } from "react-spinners";
import color from "../constant/color";

function SplashScreen() {
  return (
    <Stack
      sx={{
        bgcolor: "#dcdfe1",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <SyncLoader
        color={color.primaryOrange}
        backgroundColor={"pink"}
        size={25}
      />
      <Typography
        variant={"h2"}
        sx={{
          marginTop: 5,
          color: color.primaryBlack,
        }}
      >
        Loading
      </Typography>
    </Stack>
  );
}

export default SplashScreen;
