import React from "react";
import "../assets/Styles/Landing.css";
import LearnerTable from "../components/LeanerTable";
import { Row, Col } from "react-bootstrap";
import marvelSvg from "../assets/images/marvelImg.svg";
<<<<<<< HEAD
import "../assets/styles/Leaner.css";
=======
import "../assets/Styles/Leaner.css";
import Dropdown from "react-bootstrap/Dropdown";
>>>>>>> 81a6852a5f5a37c91206571932c62cded1a90151

function Learner() {
  return (
    <div>
      <div className="container">
        <Row>
          <Col>
            <div className="marvel-image">
              <img src={marvelSvg} alt="logo-name" />
            </div>
          </Col>
          <Col>
            <div className="text-leaderboard">
              <h1>Leaderboard</h1>
            </div>
          </Col>
          <Col>
            <div className="text-name-project">
              <h1>PROJECT</h1>
              <h2>Avengers</h2>
            </div>
          </Col>
        </Row>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <LearnerTable />
    </div>
  );
}

export default Learner;
