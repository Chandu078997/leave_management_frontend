import React, { useState, useEffect } from "react";

function LeaveForm() {
  const [leave, setLeave] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
    reason: ""
  });
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  // Fetch all employees for dropdown
  useEffect(() => {
    fetch("https://leave-management-sbrr.onrender.com/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => setError("Failed to fetch employees"));
  }, []);

  const handleChange = (e) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate dates before sending
    if (leave.endDate < leave.startDate) {
      alert("❌ End date cannot be before start date");
      return;
    }

    try {
      const response = await fetch("https://leave-management-sbrr.onrender.com/api/leaves/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: Number(leave.employeeId), // convert to Long
          startDate: leave.startDate,
          endDate: leave.endDate,
          reason: leave.reason
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to apply leave");
      }

      const data = await response.json();
      alert(`✅ Leave Applied Successfully for ${data.employeeName}!`);
      setLeave({ employeeId: "", startDate: "", endDate: "", reason: "" });
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="form-container">
      <form className="employee-form" onSubmit={handleSubmit}>
        <h2>Apply Leave</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="form-group">
          <label>Employee</label>
          <select
            name="employeeId"
            value={leave.employeeId}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} - {emp.department}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={leave.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={leave.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Reason</label>
          <input
            type="text"
            name="reason"
            value={leave.reason}
            placeholder="Reason for leave"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LeaveForm;
