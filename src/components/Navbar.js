import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { firebase } from "../config/firebase";
import { Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import color from "../constant/color";

export default function Navbar({ header = "" }) {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          color: color.primaryOrange,
          backgroundColor: color.primaryBlack,
          paddingX: "2%",
        }}
      >
        <Toolbar>
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography
              variant="h6"
              component="div"
              sx={{
                marginRight: 2,
                cursor: "pointer",
                textDecoration: "none",
                color: color.primaryOrange,
              }}
            >
              หน้าแรก
            </Typography>
          </Link>
          <Typography
            variant="h4"
            component="div"
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
            mr={"20px"}
            sx={{ flexGrow: 1 }}
          >
            {header}
          </Typography>
          <Link to="/">
            <Logout
              sx={{ fontSize: 40, color: color.primaryOrange }}
              onClick={() => {
                handleLogout();
              }}
            />
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
