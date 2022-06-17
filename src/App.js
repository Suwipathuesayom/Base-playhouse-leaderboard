import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Learner from "./pages/Learner";
import SpeakerScreen from "./pages/SpeakerScreen";
import "./App.css";
import NewProject from "./pages/Admin/NewProject";
import theme from "./assets/theme/theme";
import EditProject from "./pages/Admin/EditProject";
import AdminLeaderboard from "./pages/Admin/AdminLeaderboard";
import Landing from "./pages/Landing";
import Mentor from "./pages/Mentor";
import Note from "./pages/Note";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="speaker/:projectNameParams"
            element={<SpeakerScreen />}
          />
          <Route path="new-project" element={<NewProject />} />
          <Route path="edit-project" element={<EditProject />} />
          <Route path="admin-leaderboard" element={<AdminLeaderboard />} />
          <Route path="learner" element={<Learner />} />
          <Route path="mentor/:projectNameParams" element={<Mentor />} />
          <Route path="note" element={<Note />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
