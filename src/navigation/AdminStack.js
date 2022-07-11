import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SmallScreen from "../components/SmallScreen";
import AdminLeaderboard from "../pages/Admin/AdminLeaderboard";
import AdminProject from "../pages/Admin/AdminProject";
import NewProject from "../pages/Admin/NewProject";
import Landing from "../pages/Landing";
import Learner from "../pages/Learner";
import Login from "../pages/Login";
import Mentor from "../pages/Mentor";
import NotFoundPage from "../pages/NotFoundPage";
import Speaker from "../pages/Speaker";
import EditProjectRes from "../pages/Admin/EditProjectRes/EditNewProject";

export default function AdminStack() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin-leaderboard" element={<AdminLeaderboard />} />
        <Route path="new-project" element={<NewProject />} />
        {/* <Route path="edit-project" element={<EditProject />} /> */}
        <Route path="smallscreen" element={<SmallScreen />} />
        <Route path="speaker/:projectNameParams" element={<Speaker />} />
        <Route
          path="learner/:projectNameParams/:groupNameParams"
          element={<Learner />}
        />
        <Route path="learner/:projectNameParams" element={<Learner />} />
        <Route path="login" element={<Login />} />
        <Route
          path="mentor/:projectNameParams/:mentorNameParams"
          element={<Mentor />}
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="project" element={<AdminProject />} />
        <Route path="project/:projectNameParams" element={<AdminProject />} />
        <Route path="edit-project" element={<EditProjectRes />} />
      </Routes>
    </BrowserRouter>
  );
}
