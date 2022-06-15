import React from "react";
import "../assets/Styles/Landing.css";
import { Button } from 'react-bootstrap';



function Landing() {
  return (
      <div className="container2">
        <div className="header-title">
          <h1> Leader board score </h1> 
        </div>
        <div>
        <Button  variant="primary">Leaderboard</Button>
        </div>
      </div>
    
  );
}

export default Landing;
