import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, createTheme, ThemeProvider, Typography } from "@mui/material";
import Learner from "./pages/Learner";
import SpeakerScreen from "./pages/SpeakerScreen";
import "./App.css";
import NewProject from "./pages/Admin/NewProject";
import theme from "./assets/theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Learner />} />
          <Route path="speaker" element={<SpeakerScreen />} />
          <Route path="new-project" element={<NewProject />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
