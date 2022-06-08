import React from "react";
import "../assets/styles/Landing.css";
import { Table } from "react-bootstrap";
import '../assets/styles/LearnerTable.css'
import BgDark from '../assets/images/Bg-dark.png'

function LearnerTable() {
  return (
    <div className="learner-container">
    <div className="bgdark">
    <img src={BgDark} alt="logo-name" />
    </div>
      {/* <Table striped hover>
        <thead style={{backgroundColor: '#151515' , color: '#ffffff'}}>
          <tr>
            <th>RANK</th>
            <th>GROUP</th>
            <th>NAME</th>
            <th>TOTAL</th>
            <th>POINT</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor: '#FF5B4A'}}>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@111</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@222</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
            <td>@333</td>
          </tr>
        </tbody>
      </Table> */}
    </div>
  );
}

export default LearnerTable;
