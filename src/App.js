import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SpeakerScreen from "./pages/SpeakerScreen";
import Mentor2 from "./pages/Mentor2";
import Mentor from "./pages/Mentor";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="speaker" element={<SpeakerScreen />} />
        <Route path="mentor2" element={<Mentor2 />} />
        <Route path="mentor" element={<Mentor/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
