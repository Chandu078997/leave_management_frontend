import React, { useState } from "react";
import "./EmployeeForm.css"; // import the CSS

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    joining_date: ""
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: employee.name,
          email: employee.email,
          department: employee.department,
          joiningDate: employee.joining_date,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to add employee");
      }

      alert("✅ Employee Added Successfully!");
      setEmployee({ name: "", email: "", department: "", joining_date: "" });
    } catch (error) {
      alert("❌ Failed to add employee: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="employee-form">
        <h2>Add Employee</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            placeholder="Enter full name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email address"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            name="department"
            placeholder="Enter department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Joining Date</label>
          <input
            name="joining_date"
            type="date"
            value={employee.joining_date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
