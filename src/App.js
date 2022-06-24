import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Speaker from "./pages/Speaker";
import "./App.css";
import NewProject from "./pages/Admin/NewProject";
import theme from "./assets/theme/theme";
import EditProject from "./pages/Admin/EditProject";
import AdminLeaderboard from "./pages/Admin/AdminLeaderboard";
import Landing from "./pages/Landing";
import Mentor from "./pages/Mentor";
import Learner from "./pages/Learner";
import LoginScreen from "./pages/LoginScreen";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="speaker/:projectNameParams" element={<Speaker />} />
          <Route
            path="learner/:projectNameParams/:groupNameParams"
            element={<Learner />}
          />
          <Route path="learner/:projectNameParams" element={<Learner />} />
          <Route path="loginscreen" element={<LoginScreen />} />
          <Route path="new-project" element={<NewProject />} />
          <Route path="edit-project" element={<EditProject />} />
          <Route path="admin-leaderboard" element={<AdminLeaderboard />} />
          <Route
            path="mentor/:projectNameParams/:mentorNameParams"
            element={<Mentor />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
