import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { firebase } from "../config/firebase";
import { Home, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import color from "../constant/color";
import { iconStyle } from "../assets/styles/IconStyles";

export default function Navbar({ header = "" }) {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        color: color.primaryOrange,
        backgroundColor: color.primaryBlack,
      }}
    >
      <Toolbar>
        <Link style={{ textDecoration: "none" }} to="/">
          <Home sx={iconStyle} />
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
            sx={iconStyle}
            onClick={() => {
              handleLogout();
            }}
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
}
