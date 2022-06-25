import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLeaderboard from "../pages/Admin/AdminLeaderboard";
import EditProject from "../pages/Admin/EditProject";
import NewProject from "../pages/Admin/NewProject";
import Learner from "../pages/Learner";
import Login from "../pages/Login";
import Mentor from "../pages/Mentor";
import NotFoundPage from "../pages/NotFoundPage";
import Speaker from "../pages/Speaker";

export default function AdminStack() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-leaderboard" element={<AdminLeaderboard />} />
        <Route path="new-project" element={<NewProject />} />
        <Route path="edit-project" element={<EditProject />} />
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
      </Routes>
    </BrowserRouter>
  );
}
