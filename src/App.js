import React from "react";
import { ThemeProvider } from "@mui/material";
import "./App.css";
import theme from "./assets/theme/theme";
import RootNavigation from "./navigation/RootNavigation";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RootNavigation />
    </ThemeProvider>
  );
}

export default App;
