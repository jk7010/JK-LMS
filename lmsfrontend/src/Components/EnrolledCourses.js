import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from "react-toastify";
import api from "../api";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          toast.error('Please login first');
          navigate('/login');
          return;
        }

        const response = await api.get(`/enrolledcourses/${userId}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        toast.error('Error fetching enrolled courses');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [navigate]);

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#e8f5e8' }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <div className="vh-100 fade-in" style={{ background: 'transparent' }}>
      <Navbar />

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
            <h3 className="fw-bold mb-4">My Enrolled Courses</h3>

            {courses.length === 0 ? (
              <Card className="text-center p-5">
                <Card.Body>
                  <i className="fas fa-book-open fa-4x text-muted mb-3"></i>
                  <Card.Title>No Courses Enrolled</Card.Title>
                  <Card.Text>You haven't enrolled in any courses yet.</Card.Text>
                  <Button variant="primary" as={Link} to="/allcourses">
                    <i className="fas fa-plus me-2"></i>Browse Courses
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Row>
                {courses.map((course) => (
                  <Col md={6} lg={4} key={course._id} className="mb-4">
                    <Card className="h-100">
                      <Card.Body className="d-flex flex-column">
                        <div className="text-center mb-3">
                          <i className="fas fa-graduation-cap fa-3x text-primary"></i>
                        </div>
                        <Card.Title className="text-center fw-bold">{course.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted text-center">Code: {course.code}</Card.Subtitle>
                        <Card.Text className="flex-grow-1 text-center">
                          {course.description}
                        </Card.Text>
                        <div className="text-center">
                          <small className="text-muted">Credit Hours: {course.credithours}</small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EnrolledCourses;
