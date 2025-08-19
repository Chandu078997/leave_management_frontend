// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">🌿 Leave Management</div>
      <ul className="navbar-links">
        <li><Link to="/">Employees</Link></li>
        <li><Link to="/add-employee">Add Employee</Link></li>
        <li><Link to="/lookup-employee">Lookup Employee</Link></li>
        <li><Link to="/apply-leave">Apply Leave</Link></li>
        <li><Link to="/leaves">Leaves</Link></li>
      
      </ul>
    </nav>
  );
}

export default Navbar;
