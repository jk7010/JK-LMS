import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";

const CreateCourses = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credithours, setcredithours] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/addcourse", {
        name,
        code,
        credithours,
        description,
      });
      alert("Course added Successfully!");
      navigate("/viewcourses");
    } catch (error) {
      alert("Not added failed! Try again.");
      console.error(error);
    }
  };
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
            <h3 className="fw-bold mb-4">Create Courses</h3>

            <form onSubmit={handlesubmit}>
              <label>Course name : </label>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-100 mb-3"
              ></input>
              <br></br>
              <label>Code : </label>
              <input
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-100 mb-3"
              ></input>
              <br></br>

              <label>Credit hours : </label>
              <input
                name="caredithours"
                value={credithours}
                className="w-100 mb-3"
                onChange={(e) => setcredithours(e.target.value)}
              ></input>
              <br></br>
              <label>Decsription : </label>
              <input
                name="description"
                value={description}
                className="w-100 mb-3"
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              ></input>
              <br></br>

              <button type="submit" className="w-20 mb-3">
                Create Course
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateCourses;
