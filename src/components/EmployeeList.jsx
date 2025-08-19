/*import React, { useEffect, useState } from "react";
import "./EmployeeList.css"; // import CSS

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/employees")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch employees");
        return res.json();
      })
      .then((data) => setEmployees(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="list-container">
      <div className="list-box">
        <h2>Employees</h2>
        {error && <p className="error">{error}</p>}
        <ul>
          {employees.map((emp) => (
            <li key={emp.id}>
              {emp.name} - {emp.department}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EmployeeList;
*/
import React, { useEffect, useState } from "react";
import "./EmployeeList.css"; // Import CSS

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/employees")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch employees");
        return res.json();
      })
      .then((data) => setEmployees(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="list-container">
      <div className="list-box">
        <h2>Employees</h2>
        {error && <p className="error">{error}</p>}
        <ul>
          {employees.map((emp) => (
            <li key={emp.id}>
              <strong>{emp.name}</strong> <br />
              <span style={{ color: "#555" }}>{emp.department}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EmployeeList;
