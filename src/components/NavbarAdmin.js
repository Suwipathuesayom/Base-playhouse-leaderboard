import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { firebase } from "../config/firebase";
import { Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import color from "../constant/color";

export default function NavbarAdmin() {
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
        sx={{ color: color.primaryOrange, backgroundColor: color.primaryBlack }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 3 }}
          ></IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            LEADERBOARD
          </Typography>
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
