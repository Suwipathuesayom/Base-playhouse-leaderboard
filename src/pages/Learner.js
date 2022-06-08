import React from "react";
import "../assets/styles/Landing.css";
import LearnerTable from "../components/LeanerTable";
import { Row, Col } from "react-bootstrap";
import marvelSvg from "../assets/images/marvelImg.svg";
import "../assets/styles/Leaner.css";
import Dropdown from "react-bootstrap/Dropdown";

function Learner() {
  return (
    <div>
      <Row>
        <Col>
          <div className="marvel-image">
            <img src={marvelSvg} alt="logo-name" />
          </div>
        </Col>
        <Col>
          <div className="text-name-project">
            <h1>PROJECT</h1>
            <br />
            <h2>Avengers</h2>
          </div>
        </Col>
        <Col>
          <div className="text-leaderboard">
            <h1>Leaderboard</h1>
          </div>
        </Col>
        <Col>
          <div>
            <Dropdown>
              <Dropdown.Toggle id="dropdownBtn">เกณฑ์</Dropdown.Toggle>{" "}
              <Dropdown.Menu>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>

      <br />
      <LearnerTable />
    </div>
  );
}

export default Learner;
