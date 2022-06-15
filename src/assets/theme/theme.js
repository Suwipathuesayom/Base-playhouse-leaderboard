import { createTheme } from "@mui/material";

const theme = createTheme({
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

export default theme;
