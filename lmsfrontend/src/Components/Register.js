import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        role,
      });
      toast.success(response.data.message || "Registered successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed! Try again.");
      console.error(error);
    }
  };

  return (
    <div className="fade-in" style={{ background: 'transparent', minHeight: '100vh' }}>
      {/* Header / Navbar */}
      <header className="navbar py-3" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 2px 10px rgba(0,0,0,.1)' }}>
        <Container fluid className="d-flex align-items-center justify-content-between px-4">
          <div className="d-flex align-items-center">
            <Link to="/" className="text-decoration-none">
              <div className="logo rounded-circle bg-white text-primary me-3 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                <i className="fas fa-graduation-cap"></i>
              </div>
            </Link>
            <Link to="/" className="text-decoration-none">
              <span className="h5 mb-0 fw-bold text-white">JK LMS</span>
            </Link>
          </div>
          <nav className="d-flex align-items-center">
            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
            <Link to="/register" className="btn btn-light text-dark">Register</Link>
          </nav>
        </Container>
      </header>

      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Col md={6} lg={4}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <i className="fas fa-user-plus fa-3x text-primary mb-3"></i>
                  <h2 className="fw-bold">Create Account</h2>
                  <p className="text-muted">Join our learning community</p>
                </div>

                <Form onSubmit={handleRegister}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                    </Form.Select>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 mb-3">
                    <i className="fas fa-user-plus me-2"></i>Register
                  </Button>
                </Form>

                <div className="text-center">
                  <span className="text-muted">Already have an account? </span>
                  <Link to="/login" className="text-primary fw-bold">Login</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
