import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../api";

const ViewAssignment = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    api
      .get("/getassignment")
      .then((responce) => {
        setdata(responce.data);
        console.log(responce.data);
      })
      .catch((error) => {
        console.error(error);
        setdata([]);
      });
  }, []);

  return (
    <div className="vh-100" style={{ backgroundColor: '#e8f5e8' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-success shadow-sm px-4">
        <span className="navbar-brand fw-bold text-white">
          Teacher Dashboard
        </span>
        <div className="ms-auto d-flex align-items-center">
          <Button variant="outline-light" size="sm">
            <Link to="/" className="text-white text-decoration-none">Logout</Link>
          </Button>
        </div>
      </nav>

      <Container fluid className="mt-4">
        <Row>
          <Col md={3} className="bg-light border-end  p-3 shadow-sm">
            <h5 className="fw-bold mb-4 text-success">Menu</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/teacherdashboard" className="nav-link text-dark">
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/createcourses" className="nav-link text-dark">
                  Create Courses
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/viewcourses" className="nav-link text-dark">
                  View Courses
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/createassignment" className="nav-link text-dark">
                  Create Assignment
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/viewassignment" className="nav-link text-dark">
                  View Assignment
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/gradeassignment" className="nav-link text-dark">
                  Check & Grades
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={9} className="p-4">
            <h3 className="fw-bold mb-4">View Assignment</h3>
            {data.map((item) => {
              return (
                <>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.question}</p>
                    <h6>Total marks : {item.totalmarks}</h6>
                    <h6>Last Date : {item.duedate}</h6>
                    <hr></hr>
                  </div>
                </>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewAssignment;
