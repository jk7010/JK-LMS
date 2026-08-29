import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", { email, password });
      if (res.data.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);
        localStorage.removeItem("userId");
        toast.success(res.data.message);
        navigate("/admin/dashboard");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <div className="fade-in" style={{ background: "transparent", minHeight: "100vh" }}>
      <header className="navbar py-3" style={{ background: "linear-gradient(135deg, #0d3b66 0%, #2a9d8f 100%)" }}>
        <Container fluid className="d-flex align-items-center justify-content-between px-4">
          <Link to="/" className="text-decoration-none">
            <span className="h5 mb-0 fw-bold text-white">JK LMS Admin</span>
          </Link>
          <Link to="/login" className="btn btn-light text-dark">User Login</Link>
        </Container>
      </header>

      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
          <Col md={6} lg={4}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <h2 className="fw-bold text-center mb-2">Super Admin Login</h2>
                <p className="text-muted text-center mb-4">Approve teachers and students before access</p>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Admin Email</Form.Label>
                    <Form.Control
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100">Login as Admin</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;
