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
});

export default theme;
