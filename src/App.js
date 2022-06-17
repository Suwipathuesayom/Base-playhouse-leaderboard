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
import Mentor2 from "./pages/Mentor2";
import Note from "./pages/Note";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="speaker" element={<SpeakerScreen />} />
          <Route path="new-project" element={<NewProject />} />
          <Route path="edit-project" element={<EditProject />} />
          <Route path="admin-leaderboard" element={<AdminLeaderboard />} />
          <Route path="learner" element={<Learner />} />
          <Route path="mentor2" element={<Mentor2 />} />
          <Route path="note" element={<Note />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
