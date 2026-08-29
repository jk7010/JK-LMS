import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import { clearAuth } from "../auth";

const SuperAdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [pendingRes, allRes] = await Promise.all([
        api.get("/admin/pending-users"),
        api.get("/admin/users"),
      ]);
      setPendingUsers(pendingRes.data);
      setAllUsers(allRes.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approveUser = async (id) => {
    try {
      await api.put(`/admin/users/${id}/approve`);
      toast.success("User approved");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Approval failed");
    }
  };

  const removeUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) {
      return;
    }

    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User removed");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/admin/login");
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="fade-in" style={{ minHeight: "100vh", backgroundColor: "#f7f9fc" }}>
      <nav className="navbar navbar-expand-lg shadow-sm px-4" style={{ background: "linear-gradient(135deg, #0d3b66 0%, #2a9d8f 100%)" }}>
        <span className="navbar-brand fw-bold text-white">Super Admin Dashboard</span>
        <div className="ms-auto">
          <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </nav>

      <Container fluid className="mt-4">
        <Row className="g-4">
          <Col lg={12}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h4 className="mb-3">Pending Approvals</h4>
                {pendingUsers.length === 0 ? (
                  <p className="mb-0 text-muted">No pending users</p>
                ) : (
                  <Table responsive bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingUsers.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <Button size="sm" variant="success" className="me-2" onClick={() => approveUser(user._id)}>
                              Approve
                            </Button>
                            <Button size="sm" variant="danger" onClick={() => removeUser(user._id)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={12}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h4 className="mb-3">All Users</h4>
                <Table responsive bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Approved By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <Badge bg={user.approvalStatus === "Approved" ? "success" : user.approvalStatus === "Rejected" ? "danger" : "warning"}>
                            {user.approvalStatus}
                          </Badge>
                        </td>
                        <td>{user.approvedBy || "-"}</td>
                        <td>
                          <Button size="sm" variant="danger" onClick={() => removeUser(user._id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SuperAdminDashboard;
