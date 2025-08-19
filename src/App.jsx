// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/EmployeeForm";
import EmployeeLookup from "./components/EmployeeLookup";
import LeaveForm from "./components/LeaveForm";
import LeaveList from "./components/LeaveList";
import ManagerDashboard from "./components/ManagerDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/lookup-employee" element={<EmployeeLookup />} />
          <Route path="/apply-leave" element={<LeaveForm />} />
          <Route path="/leaves" element={<LeaveList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
