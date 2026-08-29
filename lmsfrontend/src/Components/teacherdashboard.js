import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { clearAuth } from "../auth";

const TeacherDashboard = () => {
  return (
    <div className="fade-in">
      <nav className="navbar navbar-expand-lg navbar-light bg-success shadow-sm px-4">
        <span className="navbar-brand fw-bold text-white">
          Teacher Dashboard
        </span>
        <div className="ms-auto d-flex align-items-center">
          <Button variant="outline-light" size="sm">
            <Link to="/" onClick={clearAuth} className="text-white text-decoration-none">Logout</Link>
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

          <Col md={9} className="main-content p-4">
            <h3 className="fw-bold mb-4">Welcome to Your Dashboard</h3>

            <Row>
              <Col md={4} className="mb-4">
                <Card className="text-center h-100">
                  <Card.Body>
                    <i className="fas fa-book fa-3x text-primary mb-3"></i>
                    <Card.Title>Courses</Card.Title>
                    <Card.Text>Manage your courses</Card.Text>
                    <Link to="/viewcourses"><Button variant="primary">Manage Courses</Button></Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="text-center h-100">
                  <Card.Body>
                    <i className="fas fa-tasks fa-3x text-success mb-3"></i>
                    <Card.Title>Assignments</Card.Title>
                    <Card.Text>Create and view assignments</Card.Text>
                    <Link to="/viewassignment"><Button variant="success">Manage Assignments</Button></Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="text-center h-100">
                  <Card.Body>
                    <i className="fas fa-chart-line fa-3x text-warning mb-3"></i>
                    <Card.Title>Grades</Card.Title>
                    <Card.Text>Check and grade assignments</Card.Text>
                    <Link to="/gradeassignment"><Button variant="warning">Check Grades</Button></Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TeacherDashboard;
