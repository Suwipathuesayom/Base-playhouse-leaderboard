<<<<<<< HEAD
import React  from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Learner from './pages/Learner';
import './App.css';
import AdminLeaderboard from './pages/Admin/AdminLeaderboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Learner />} />
        <Route path="AdminLeaderboard" element={<AdminLeaderboard />}>
        </Route>
      </Routes>
    </BrowserRouter>
    
    
=======
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Learner from "./pages/Learner";
import SpeakerScreen from "./pages/SpeakerScreen";
import "./App.css";
import NewProject from "./pages/Admin/NewProject";
import theme from "./assets/theme/theme";
import EditProject from "./pages/Admin/EditProject";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Learner />} />
          <Route path="speaker" element={<SpeakerScreen />} />
          <Route path="new-project" element={<NewProject />} />
          <Route path="edit-project" element={<EditProject />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
>>>>>>> 81a6852a5f5a37c91206571932c62cded1a90151
  );
}

export default App;
