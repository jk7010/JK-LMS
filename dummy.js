import React, { useState } from "react";  
import Button from "react-bootstrap/Button";  
import Form from "react-bootstrap/Form";  
import { Link, useNavigate } from "react-router-dom";  
import axios from "axios";  

const Register = () => {  
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [role, setRole] = useState("Student");  
  const navigate = useNavigate();  

  const handleRegister = async (e) => {  
    e.preventDefault();  
    try {  
      await axios.post("http://localhost:3210/register", {  
        name,  
        email,  
        password,  
        role,  
      });  
      alert("Registered Successfully!");  
      navigate("/");  
    } catch (error) {  
      alert("Registration failed! Try again.");  
      console.error(error);  
    }  
  };  

  return (  
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#0f8a3a' }}>  
      <div  
        className="card p-0 shadow rounded"  
        style={{  
          width: 420,  
          background: "#fff",  
          borderRadius: 20,  
          overflow: "hidden",  
        }}  
      >  
        {/* Header strip */}  
        <div  
          style={{  
            background: "#2ecc71",  
            padding: "14px 20px",  
            textAlign: "center",  
            color: "#fff",  
            fontWeight: 700,  
            letterSpacing: ".5px",  
          }}  
        >  
          REGISTER FORM  
        </div>  

        {/* Form body */}  
        <Form  
          onSubmit={handleRegister}  
          className="p-4"  
          style={{ paddingTop: 28, paddingBottom: 28 }}  
        >  
          <Form.Group className="mb-3" controlId="formName">  
            <Form.Label className="visually-hidden">Full Name</Form.Label>  
            <Form.Control  
              type="text"  
              placeholder="Full Name"  
              value={name}  
              onChange={(e) => setName(e.target.value)}  
              required  
              style={{  
                height: 52,  
                borderRadius: 12,  
                border: "1px solid #e5e5e5",  
              }}  
            />  
          </Form.Group>  

          <Form.Group className="mb-3" controlId="formEmail">  
            <Form.Label className="visually-hidden">Email address</Form.Label>  
            <Form.Control  
              type="email"  
              placeholder="Email address"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)}  
              required  
              style={{  
                height: 52,  
                borderRadius: 12,  
                border: "1px solid #e5e5e5",  
              }}  
            />  
          </Form.Group>  

          <Form.Group className="mb-3" controlId="formPassword">  
            <Form.Label className="visually-hidden">Password</Form.Label>  
            <Form.Control  
              type="password"  
              placeholder="Password"  
              value={password}  
              onChange={(e) => setPassword(e.target.value)}  
              required  
              style={{  
                height: 52,  
                borderRadius: 12,  
                border: "1px solid #e5e5e5",  
              }}  
            />  
          </Form.Group>  

          <Form.Group className="mb-3" controlId="formRole">  
            <Form.Label className="visually-hidden">Select Role</Form.Label>  
            <Form.Select  
              value={role}  
              onChange={(e) => setRole(e.target.value)}  
              required  
              style={{  
                height: 52,  
                borderRadius: 12,  
              }}  
            >  
              <option value="Student">Student</option>  
              <option value="Teacher">Teacher</option>  
            </Form.Select>  
          </Form.Group>  

          <Button variant="success" type="submit" className="w-100" style={{ height: 50, borderRadius: 12, fontWeight: 600 }}>  
            Register  
          </Button>  

          <div className="text-center mt-3">  
            Already have an account?{" "}  
         <Link to="/login" className="text-decoration-none" style={{ color: "#2e7d32", fontWeight: 600 }}>
  Login
</Link>
</div>
</Form>
</div>
</div>
);
};