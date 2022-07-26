import React from "react";
import { ThemeProvider } from "@mui/material";
import "./App.css";
import theme from "./assets/theme/theme";
import RootNavigation from "./navigation/RootNavigation";
import NewLanding from "./components/NewLanding";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <RootNavigation /> */}
      <NewLanding />
    </ThemeProvider>
  );
}

export default App;
