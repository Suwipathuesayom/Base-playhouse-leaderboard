import React from "react";
import { ThemeProvider } from "@mui/material";
import "./App.css";
import theme from "./assets/theme/theme";
import RootNavigation from "./navigation/RootNavigation";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <RootNavigation /> */}
      <Leaderboard></Leaderboard>
    </ThemeProvider>
  );
}

export default App;
