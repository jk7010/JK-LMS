import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../api";
const ViewCourses = () => {
  const [data, setdata] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ code: '', name: '', description: '', credithours: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    api
      .get("/getcourse")
      .then((responce) => {
        setdata(responce.data);
        console.log(responce.data);
      })
      .catch((error) => {
        console.error(error);
        setdata([]);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/deletecourse/${id}`);
        alert('Course deleted successfully');
        fetchCourses();
      } catch (error) {
        alert('Error deleting course: ' + error.message);
      }
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course._id);
    setFormData({ code: course.code, name: course.name, description: course.description, credithours: course.credithours });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/updatecourse/${editingCourse}`, formData);
      alert('Course updated successfully');
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      alert('Error updating course: ' + error.message);
    }
  };

  const handleCancel = () => {
    setEditingCourse(null);
    setFormData({ code: '', name: '', description: '', credithours: '' });
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
            <h3 className="fw-bold mb-4">View Courses</h3>
            {data.map((item) => {
              return (
                <div key={item._id}>
                  {editingCourse === item._id ? (
                    <Card className="mb-3">
                      <Card.Body>
                        <Form>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Course Code</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={formData.code}
                                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Course Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Credit Hours</Form.Label>
                            <Form.Control
                              type="text"
                              value={formData.credithours}
                              onChange={(e) => setFormData({ ...formData, credithours: e.target.value })}
                            />
                          </Form.Group>
                          <Button variant="success" onClick={handleUpdate} className="me-2">Update</Button>
                          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  ) : (
                    <div>
                      {item.code}--{item.name}-{item.credithours}
                      <p>{item.description}</p>
                      <Button variant="warning" size="sm" onClick={() => handleEdit(item)} className="me-2">Update</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>Delete</Button>
                      <hr />
                    </div>
                  )}
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewCourses;
