import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
const CreateAssignment = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [course_id, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [totalmarks, setTotalmarks] = useState("");
  const [duedate, setDuedate] = useState("");

  useEffect(() => {
    api
      .get("/getcourse")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/addassignment", {
        course_id,
        title,
        question,
        totalmarks,
        duedate,
      });
      alert("Assignment added Successfully!");
      navigate("/viewassignment");
    } catch (error) {
      alert("Not added failed! Try again.");
      console.error(error);
    }
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
            <h3 className="fw-bold mb-4">Create Assignment</h3>

            <form onSubmit={handlesubmit}>
              <label>Course Code : </label>
              <select
                className="w-100 mb-3"
                value={course_id}
                onChange={(e) => setCode(e.target.value)}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
              <br></br>
              <label>Title : </label>
              <input
                className="w-100 mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <br></br>
              <label>Question : </label>
              <textarea
                className="w-100 mb-3"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
              <br></br>

              <label>Total Marks : </label>
              <input
                className="w-100 mb-3"
                value={totalmarks}
                onChange={(e) => setTotalmarks(e.target.value)}
              ></input>
              <br></br>
              <label>Due Date : </label>
              <input
                type="date"
                className="w-100 mb-3"
                value={duedate}
                onChange={(e) => setDuedate(e.target.value)}
              ></input>
              <br></br>

              <button type="submit" className="w-20 mb-3">
                Create Assignment
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateAssignment;
