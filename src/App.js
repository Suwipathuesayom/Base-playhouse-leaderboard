import React  from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Learner from './pages/Learner';
import SpeakerScreen from './pages/SpeakerScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Learner />} />
        <Route path="speaker" element={<SpeakerScreen />}>
        </Route>
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;

