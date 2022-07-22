import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { firebase } from "../config/firebase";
import { Home, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ header = "" }) {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppBar component="nav" position="sticky">
      <Toolbar className="navbar__container">
        <Link className="navbar__icon" to="/">
          <Home />
        </Link>
        <h4 className="navbar__headerText">{header}</h4>
        <Link className="navbar__icon" to="/">
          <Logout
            onClick={() => {
              handleLogout();
            }}
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
}
