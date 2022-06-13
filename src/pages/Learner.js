import React from "react";
import "../assets/Styles/Landing.css";
import LearnerTable from "../components/LeanerTable";
import { Row, Col } from "react-bootstrap";
import marvelSvg from "../assets/images/marvelImg.svg";
import "../assets/Styles/Leaner.css";

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
