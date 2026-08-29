import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Badge, Alert, Table, Modal, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../api";

const Gradeassignment = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [marks, setMarks] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await api.get("/getallsubmissions");
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        alert('Error fetching submissions');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleSubmitGrade = async () => {
    try {
      await api.put(`/gradesubmission/${selectedSubmission._id}`, {
        obtainmarks: parseInt(marks),
        comments
      });
      alert('Assignment checked and graded successfully!');
      setShowGradeModal(false);
      // Refresh all submissions
      const response = await api.get("/getallsubmissions");
      setSubmissions(response.data);
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
            <h3 className="fw-bold mb-4">Check & Grades</h3>

            {submissions.length === 0 ? (
              <Alert variant="info">
                <p className="mb-0">No submissions found.</p>
              </Alert>
            ) : (
              <Card className="shadow border-0">
                <Card.Body>
                  <Table striped bordered hover responsive>
                    <thead className="table-primary">
                      <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Assignment Title</th>
                        <th>Course Code</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((submission, index) => (
                        <tr key={submission._id}>
                          <td>{index + 1}</td>
                          <td>{submission.student_id?.name || 'N/A'}</td>
                          <td>{submission.assignment_id?.title || 'N/A'}</td>
                          <td>{submission.assignment_id?.course_id?.code || 'N/A'}</td>
                          <td>
                            <Button
                              variant="primary"
                              size="sm"
                              disabled={submission.obtainmarks !== null}
                              onClick={() => {
                                setSelectedAssignment(submission.assignment_id);
                                setSelectedSubmission(submission);
                                setMarks(submission.obtainmarks || '');
                                setComments(submission.comments || '');
                                setShowGradeModal(true);
                              }}
                            >
                              {submission.obtainmarks !== null ? 'Checked' : 'Check'}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      {/* Grading Modal */}
      <Modal show={showGradeModal} onHide={() => setShowGradeModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Check Assignment: {selectedAssignment?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubmission ? (
            // Show grading form for selected submission
            <>
              <div className="mb-3">
                <h6>Student: {selectedSubmission.student_id?.name}</h6>
                <h6>Student Answer:</h6>
                <div className="bg-light p-3 rounded border">
                  {selectedSubmission.answer}
                </div>
              </div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Obtain Marks</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>{selectedAssignment?.totalmarks || 10} / </InputGroup.Text>
                    <Form.Control
                      type="number"
                      min="0"
                      max={selectedAssignment?.totalmarks || 10}
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                      placeholder="Enter marks"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Comments (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Enter comments"
                  />
                </Form.Group>
              </Form>
            </>
          ) : (
            // Show list of submissions
            <>
              <h6>Student Submissions:</h6>
              {submissions.length === 0 ? (
                <Alert variant="info">
                  <p className="mb-0">No submissions yet for this assignment.</p>
                </Alert>
              ) : (
                <Table striped bordered hover responsive>
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Student Name</th>
                      <th>Submitted Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission, index) => (
                      <tr key={submission._id}>
                        <td>{index + 1}</td>
                        <td>{submission.student_id?.name || 'N/A'}</td>
                        <td>{new Date(submission.submitted_date).toLocaleDateString()}</td>
                        <td>
                          <Badge bg={submission.obtainmarks !== null ? 'success' : 'warning'}>
                            {submission.obtainmarks !== null ? 'Checked' : 'Pending'}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setMarks(submission.obtainmarks || '');
                              setComments(submission.comments || '');
                            }}
                          >
                            Check
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            if (selectedSubmission) {
              setSelectedSubmission(null);
              setMarks('');
              setComments('');
            } else {
              setShowGradeModal(false);
            }
          }}>
            {selectedSubmission ? 'Back' : 'Cancel'}
          </Button>
          {selectedSubmission && (
            <Button variant="primary" onClick={handleSubmitGrade}>
              Submit Grade
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Gradeassignment;
