import React, { useEffect, useState } from "react";
import "./EmployeeForm.css"; // reuse your CSS for styling

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState(""); // <-- added search state

  useEffect(() => {
    fetch("https://leave-management-sbrr.onrender.com/api/employees")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch employees");
        return res.json();
      })
      .then((data) => setEmployees(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleMoreView = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="form-container">
      <div className="employee-form" style={{ maxWidth: "600px" }}>
        {/* Header + Search Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2>All Employees</h2>
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "180px",
              fontSize: "14px",
            }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
              <th>Name</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: "1px solid #eee" }}>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    onClick={() => handleMoreView(emp)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    More View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal / Details View */}
        {selectedEmployee && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "10px",
                maxWidth: "400px",
                width: "90%",
                color: "#333",
                position: "relative",
              }}
            >
              <h3>Employee Details</h3>
              <p><b>ID:</b> {selectedEmployee.id}</p>
              <p><b>Name:</b> {selectedEmployee.name}</p>
              <p><b>Email:</b> {selectedEmployee.email}</p>
              <p><b>Department:</b> {selectedEmployee.department}</p>
              <p><b>Joining Date:</b> {selectedEmployee.joiningDate}</p>
              <p><b>Leave Balance:</b> {selectedEmployee.leaveBalance}</p>

              <button
                onClick={handleCloseModal}
                style={{
                  marginTop: "15px",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
