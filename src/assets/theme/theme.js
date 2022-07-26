import { createTheme } from "@mui/material";
import color from "../../constant/color";

const theme = createTheme({
  overrides: {
    MuiSwitch: {
      switchBase: {
        // Controls default (unchecked) color for the thumb
        color: "#ccc",
        "&$checked": {
          // Controls checked color for the thumb
          color: color.primaryOrange,
        },
      },
      track: {
        // Controls default (unchecked) color for the track
        opacity: 0.2,
        backgroundColor: "#fff",
        "$checked$checked + &": {
          // Controls checked color for the track
          opacity: 0.7,
          backgroundColor: color.primaryOrange,
        },
      },
    },
  },
  typography: {
    fontFamily: ["Prompt"].join(","),
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "10px",
          },
          "*::-webkit-scrollbar-track": {
            background: "#E4EFEF",
          },
          "*::-webkit-scrollbar-thumb": {
            background: "#1D388F61",
            borderRadius: "2px",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

export default theme;
