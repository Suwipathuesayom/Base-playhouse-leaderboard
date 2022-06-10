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
        <Route path="/" element={<SpeakerScreen  />} />
        <Route path="landing" element={<Landing />}>
        </Route>
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;

