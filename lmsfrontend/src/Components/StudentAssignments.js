import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          alert('Please login first');
          navigate('/login');
          return;
        }

        const response = await api.get(`/studentassignments/${userId}`);
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        alert('Error fetching assignments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [navigate]);

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setAnswer(assignment.submission?.answer || '');
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await api.post('/submitassignment', {
        assignment_id: selectedAssignment._id,
        student_id: userId,
        answer
      });
      alert('Assignment submitted successfully!');
      setShowModal(false);
      // Refresh assignments
      const response = await api.get(`/studentassignments/${userId}`);
      setAssignments(response.data);
    } catch (error) {
      console.error('Error submitting assignment:', error);
      alert('Error submitting assignment');
    }
  };

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
            <h3 className="fw-bold mb-4 text-success">My Assignments</h3>

            {assignments.length === 0 ? (
              <Alert variant="info">
                <p className="mb-0">You don't have any assignments yet.</p>
              </Alert>
            ) : (
              <Row>
                {assignments.map((assignment) => (
                  <Col md={6} key={assignment._id} className="mb-4">
                    <Card className="shadow border-0 h-100">
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-success fw-bold">{assignment.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Course: {assignment.course_id?.name || 'N/A'}
                        </Card.Subtitle>
                        <Card.Text className="flex-grow-1">
                          <strong>Question:</strong> {assignment.question}
                        </Card.Text>
                        <Card.Text className="text-muted">
                          <strong>Total Marks:</strong> {assignment.totalmarks}
                        </Card.Text>
                        <Card.Text className="text-muted">
                          <strong>Due Date:</strong> {new Date(assignment.duedate).toLocaleDateString()}
                        </Card.Text>
                        <Card.Text className="text-muted">
                          <strong>Status:</strong> {assignment.submission?.status || 'Not Submitted'}
                        </Card.Text>
                        {assignment.submission?.obtainmarks !== null && assignment.submission?.obtainmarks !== undefined && (
                          <Card.Text className="text-success">
                            <strong>Obtained Marks:</strong> {assignment.submission.obtainmarks}
                          </Card.Text>
                        )}
                        {assignment.submission?.comments && (
                          <Card.Text className="text-muted">
                            <strong>Comments:</strong> {assignment.submission.comments}
                          </Card.Text>
                        )}
                        <Button
                          variant="success"
                          className="mt-auto"
                          onClick={() => handleEdit(assignment)}
                        >
                          {assignment.submission?.status === 'Submitted' ? 'Edit Submission' : 'Submit Assignment'}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Submit Assignment: {selectedAssignment?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question:</Form.Label>
              <p>{selectedAssignment?.question}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Answer:</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Assignment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentAssignments;
