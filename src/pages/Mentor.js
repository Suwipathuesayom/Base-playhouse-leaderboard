import React from "react";
import "../assets/Styles/Mentor.css";
import { Table } from "react-bootstrap";

function Mentor() {
  return (
    <div className="container">
      <div className="container__mentorName">
        <h2>A</h2>
      </div>
      <div className="container_table">
        <Table striped bordered hover variant="dark">
          <thead >
            <tr>
              <th>ลำดับกลุ่ม</th>
              <th>ชื่อกลุ่ม</th>
              <th rowspan="2">
                A1<th text-center> 1</th>{" "}
              </th>
              <th rowspan="2" colspan="2">
                A2<th text-center>2</th>{" "}
              </th>
              <th rowspan="2">
                A3<th>1</th>{" "}
              </th>
              <th rowspan="2">
                A4<th>1</th>{" "}
              </th>
              <th rowspan="2">
                Total<th>5</th>{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>กลุ่มที่ 1</td>
              <td>แตงโม</td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>กลุ่มที่2</td>
              <td>กล้วยหอม</td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>กลุ่มที่3</td>
              <td>ไก่ย่าง</td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>กลุ่มที่4</td>
              <td>ว๊าวซ่า</td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>กลุ่มที่5</td>
              <td>แอปเปิ้ล</td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Mentor;
