import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { clearAuth } from "../auth";

const Studentdashboard = () => {
  return <div className="fade-in">
      <nav className="navbar navbar-expand-lg shadow-sm px-4">
        <span className="navbar-brand fw-bold text-white">
          Student Dashboard
        </span>
        <div className="ms-auto d-flex align-items-center">
          <Button variant="outline-light" size="sm">
            <Link to="/" onClick={clearAuth} className="text-white text-decoration-none">Logout</Link>
          </Button>
        </div>
      </nav>

      <Container fluid className="mt-4">
        <Row>
          <Col md={3} className="sidebar p-3">
            <h5 className="fw-bold mb-4">Menu</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/studentdashboard" className="nav-link">
                  <i className="fas fa-home me-2"></i>Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/allcourses" className="nav-link">
                  <i className="fas fa-book me-2"></i>Courses List
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/enrolledcourses" className="nav-link">
                  <i className="fas fa-graduation-cap me-2"></i>Enrolled Courses
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/assignments" className="nav-link">
                  <i className="fas fa-tasks me-2"></i>Assignments
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/StudentGrades" className="nav-link">
                  <i className="fas fa-chart-line me-2"></i>Grades
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
                    <Card.Text>Browse and enroll in available courses</Card.Text>
                    <Link to="/allcourses"><Button variant="primary">View Courses</Button></Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="text-center h-100">
                  <Card.Body>
                    <i className="fas fa-tasks fa-3x text-success mb-3"></i>
                    <Card.Title>Assignments</Card.Title>
                    <Card.Text>View and submit your assignments</Card.Text>
                    <Link to="/assignments"><Button variant="success">View Assignments</Button></Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="text-center h-100">
                  <Card.Body>
                    <i className="fas fa-chart-line fa-3x text-warning mb-3"></i>
                    <Card.Title>Grades</Card.Title>
                    <Card.Text>Check your academic performance</Card.Text>
                    <Link to="/StudentGrades"><Button variant="warning">View Grades</Button></Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
};

export default Studentdashboard;
