import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import api from "../api";

const CheckAssignment = () => {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [obtainmarks, setObtainmarks] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await api.get(`/getsubmissions/${assignmentId}`);
        setAssignment(response.data.assignment);
        setSubmissions(response.data.submissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        alert('Error fetching submissions');
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) {
      fetchSubmissions();
    }
  }, [assignmentId]);

  const handleGrade = (submission) => {
    setSelectedSubmission(submission);
    setObtainmarks(submission.obtainmarks || '');
    setComments(submission.comments || '');
    setShowModal(true);
  };

  const handleSubmitGrade = async () => {
    try {
      await api.put(`/gradesubmission/${selectedSubmission._id}`, {
        obtainmarks: parseInt(obtainmarks),
        comments
      });
      alert('Submission graded successfully!');
      setShowModal(false);
      // Refresh submissions
      const response = await api.get(`/getsubmissions/${assignmentId}`);
      setSubmissions(response.data.submissions);
    } catch (error) {
      console.error('Error grading submission:', error);
      alert('Error grading submission');
    }
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#e8f5e8' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
          <Col md={3} className="bg-light border-end p-3 shadow-sm">
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
            <h3 className="fw-bold mb-4">Check Assignment: {assignment?.title}</h3>

            {assignment && (
              <Card className="mb-4 shadow border-0">
                <Card.Body>
                  <h5>Assignment Details</h5>
                  <p><strong>Question:</strong> {assignment.question}</p>
                  <p><strong>Total Marks:</strong> {assignment.totalmarks}</p>
                  <p><strong>Due Date:</strong> {new Date(assignment.duedate).toLocaleDateString()}</p>
                  <p><strong>Course:</strong> {assignment.course_id?.name}</p>
                </Card.Body>
              </Card>
            )}

            <h4 className="mb-3">Student Submissions</h4>

            {submissions.length === 0 ? (
              <Alert variant="info">
                <p className="mb-0">No submissions yet for this assignment.</p>
              </Alert>
            ) : (
              submissions.map((submission) => (
                <Card key={submission._id} className="mb-3 shadow border-0">
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <h5>{submission.student_id?.name}</h5>
                        <p><strong>Email:</strong> {submission.student_id?.email}</p>
                        <p><strong>Submitted:</strong> {new Date(submission.submitted_date).toLocaleString()}</p>
                        <p><strong>Answer:</strong></p>
                        <div className="bg-light p-3 rounded">
                          {submission.answer}
                        </div>
                      </Col>
                      <Col md={4} className="text-end">
                        <div className="mb-2">
                          <strong>Marks: {submission.obtainmarks || 0}/{assignment?.totalmarks}</strong>
                        </div>
                        {submission.comments && (
                          <div className="mb-2">
                            <strong>Comments:</strong> {submission.comments}
                          </div>
                        )}
                        <Button
                          variant="success"
                          onClick={() => handleGrade(submission)}
                        >
                          {submission.obtainmarks !== null ? 'Update Grade' : 'Grade'}
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Grade Submission: {selectedSubmission?.student_id?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <h6>Student Answer:</h6>
            <div className="bg-light p-3 rounded">
              {selectedSubmission?.answer}
            </div>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Marks Obtained (out of {assignment?.totalmarks})</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max={assignment?.totalmarks}
                value={obtainmarks}
                onChange={(e) => setObtainmarks(e.target.value)}
                placeholder="Enter marks"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Enter comments (optional)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitGrade}>
            Submit Grade
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckAssignment;
