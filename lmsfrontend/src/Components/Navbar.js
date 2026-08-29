import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { clearAuth } from "../auth";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success shadow-sm px-4">
      <span className="navbar-brand fw-bold text-white">
        Student Dashboard
      </span>
      <div className="ms-auto d-flex align-items-center">
        <Button variant="outline-light" size="sm">
          <Link to="/" onClick={clearAuth} className="text-white text-decoration-none">Logout</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
