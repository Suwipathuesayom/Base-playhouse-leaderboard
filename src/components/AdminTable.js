import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import data from "../../src/mock.js";
import "../../src/assets/styles/AdminDashboard.css";
// import EditableRow from "./EditableRow";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";

function AdminTable() {
  const [show, setShow] = useState(false);
  const [project, setProject] = useState(data);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="table-container mt-2">
      <form>
        <Table striped bordered variant="dark" hover id="adminTable">
          <thead>
            <tr>
              <th>ชื่อโปรเจค</th>
              <th>แก้ไขล่าสุด</th>
              <th colSpan={3}>คะแนนรวม</th>
            </tr>
          </thead>
          <tbody>
            {project.map((project, index) => (
              <tr key={index}>
                <td>{project.name}</td>
                {console.log(project.people)}
                <td>
                  {project.people?.map((person, index) => {
                    return (
                      <tr key={index}>
                        <td>{person.firstName}</td>
                      </tr>
                    );
                  })}
                </td>
                <td>
                  {project.people?.map((person, index) => {
                    return (
                      <tr key={index}>
                        <td>{person.score}</td>
                      </tr>
                    );
                  })}
                </td>

                {/* {console.log(project)} */}
                <td>
                  <div className="btn-group">
                    <Button
                      variant="danger"
                      onClick={handleShow}
                      style={{ width: 10 }}
                    >
                      Export
                    </Button>
                  </div>
                </td>
                <td>
                  <h4 className="Edit-Txt" type="buttonText">
                    Edit
                  </h4>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </form>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="My-modal"
      >
        <Modal.Header
          style={{ background: "#151515", height: 100, color: "white" }}
          closeButton
        >
          <Modal.Title>
            <div className="title-modal mt-2">
              <h3>Export Project</h3>
              <p className="Avengers-title">Avengers</p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#242424", fontSize: 20 }}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-bold">Speaker</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Leaner</Form.Label>
              <Form.Control
                type="url"
                placeholder="https//google.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Mentor/Judge</Form.Label>
              <Form.Control
                type="url"
                placeholder="https//some_really_long_url.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                Excel <br />{" "}
                {/* <ReactHTMLTableToExcel
                  className="btn btn-danger"
                  table="adminTable"
                  filename="Table Excel file"
                  sheet="Sheet"
                  buttonText="Download"
                /> */}
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            background: "#242424",
            fontSize: 35,
            color: "#FF5B4A",
            cursor: "pointer",
          }}
          onClick={handleClose}
        >
          <p>ปิด</p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminTable;
