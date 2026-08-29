import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      if (res.data.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);

        if (res.data.role === "Teacher") {
          navigate("/teacherdashboard");
        } else if (res.data.role === "Student") {
          navigate("/studentdashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during login. Please try again.");
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
                  <i className="fas fa-graduation-cap fa-3x text-primary mb-3"></i>
                  <h2 className="fw-bold">Welcome Back</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                <Form onSubmit={handleSubmit}>
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 mb-3">
                    <i className="fas fa-sign-in-alt me-2"></i>Login
                  </Button>
                </Form>

                <div className="text-center">
                  <span className="text-muted">Don't have an account? </span>
                  <Link to="/register" className="text-primary fw-bold">Register</Link>
                </div>
                <div className="text-center mt-2">
                  <Link to="/admin/login" className="text-decoration-none">Login as Super Admin</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;