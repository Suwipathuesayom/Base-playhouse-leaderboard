import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Learner from "../pages/Learner";
import Login from "../pages/Login";
import Mentor from "../pages/Mentor";
import NotFoundPage from "../pages/NotfoundPage";
import Speaker from "../pages/Speaker";

export default function UserStack() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
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
