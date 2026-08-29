import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import api from "../api";
const AllCourses = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get("/getcourse")
      .then((responce) => {
        setdata(responce.data);
        console.log(responce.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEnroll = async (courseId) => {
    const studentId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    if (!studentId) {
      toast.error('Please log in first');
      return;
    }
    try {
      const response = await api.put(`/enrollcourse/${courseId}`, { studentId });
      toast.success(response.data);
      navigate('/enrolledcourses'); // Redirect to enrolled courses after successful enrollment
    } catch (error) {
      toast.error('Error enrolling: ' + (error.response ? error.response.data : error.message));
    }
  };
  return (
    <div className="vh-100" style={{ backgroundColor: '#e8f5e8' }}>
      <Navbar />

      <Container fluid className="mt-4">
        <Row>
          <Col md={3} className="bg-light border-end  p-3 shadow-sm">
            <h5 className="fw-bold mb-4 text-success">Menu</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/studentdashboard" className="nav-link text-dark">
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/allcourses" className="nav-link text-dark">
                  Courses List
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/enrolledcourses" className="nav-link text-dark">
                  Enrolled Courses
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/assignments" className="nav-link text-dark">
                  Assignments
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/StudentGrades" className="nav-link text-dark">
                  Grades
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={9} className="p-4">
           
            <h3 className="fw-bold mb-4">View All Courses</h3>
            {data.map((item) => {
              return (
                <>
                  <div>
                    {item.code}--{item.name}-{item.credithours}
                    <p>{item.description}</p>
                    <Button variant="success" onClick={() => handleEnroll(item._id)}>Enroll Now</Button>
                    <hr></hr>
                  </div>
                </>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AllCourses;
