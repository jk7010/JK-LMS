import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api";

const StudentGrades = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          alert('Please login first');
          navigate('/login');
          return;
        }

        const response = await api.get(`/studentsubmissions/${userId}`);
        setSubmissions(response.data || []);
      } catch (error) {
        console.error('Error fetching grades:', error);
        alert('Error fetching grades');
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [navigate]);

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#e8f5e8' }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <div className="vh-100" style={{ backgroundColor: '#e8f5e8' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-success shadow-sm px-4">
        <span className="navbar-brand fw-bold text-white">
          Student Dashboard
        </span>
        <div className="ms-auto d-flex align-items-center">
          <Button variant="outline-light" size="sm">
            <Link to="/studentdashboard" className="text-white text-decoration-none">Back to Dashboard</Link>
          </Button>
        </div>
      </nav>

      <Container fluid className="mt-4">
        <Row>
          <Col md={12} className="p-4">
            <h3 className="fw-bold mb-4 text-success">My Grades</h3>

            {submissions.length === 0 ? (
              <Alert variant="info">
                <p className="mb-0">You don't have any grades yet.</p>
              </Alert>
            ) : (
              <Row>
                {submissions.map((submission) => (
                  <Col md={6} key={submission._id} className="mb-4">
                    <Card className="shadow border-0 h-100">
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-success fw-bold">Grade Details</Card.Title>
                        <Card.Text className="flex-grow-1">
                          <strong>Assignment:</strong> {submission.assignment_id?.title || 'N/A'}
                        </Card.Text>
                        <Card.Text className="text-muted">
                          <strong>Course:</strong> {submission.assignment_id?.course_id?.code || 'N/A'}
                        </Card.Text>
                        <Card.Text className="text-muted">
                          <strong>Marks Obtained:</strong> {submission.obtainmarks !== null ? `${submission.obtainmarks} / ${submission.assignment_id?.totalmarks || 'N/A'}` : 'Not graded yet'}
                        </Card.Text>
                        <Card.Text className="text-muted">
                          <strong>Comments:</strong> {submission.comments || 'No comments'}
                        </Card.Text>
                        <Card.Text className="text-muted">
                          <strong>Status:</strong> {submission.status}
                        </Card.Text>
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

export default StudentGrades;
