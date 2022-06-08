import React  from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Landing from './pages/Landing';
import SpeakerScreen from './pages/SpeakerScreen';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="speaker" element={<SpeakerScreen />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
