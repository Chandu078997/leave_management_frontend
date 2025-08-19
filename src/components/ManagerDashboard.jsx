import React, { useEffect, useState } from "react";
import "./ManagerDashboard.css";

function ManagerDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all leaves
  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/leaves/all");
      if (!res.ok) throw new Error("Failed to fetch leaves");
      const data = await res.json();
      setLeaves(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load leaves. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Approve leave
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/leaves/${id}/approve`, { method: "PUT" });
      if (!res.ok) throw new Error("Failed to approve leave");
      fetchLeaves();
    } catch (err) {
      console.error(err);
      alert("Error approving leave: " + err.message);
    }
  };

  // Reject leave
  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/leaves/${id}/reject`, { method: "PUT" });
      if (!res.ok) throw new Error("Failed to reject leave");
      fetchLeaves();
    } catch (err) {
      console.error(err);
      alert("Error rejecting leave: " + err.message);
    }
  };

  // Filter leaves by employee name or reason
  const filteredLeaves = leaves.filter(
    (l) =>
      (l.employeeName && l.employeeName.toLowerCase().includes(search.toLowerCase())) ||
      (l.reason && l.reason.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="dashboard-container">
      <h2>🌿 Leave Management - Manager Dashboard</h2>

      <input
        type="text"
        placeholder="Search by Employee / Reason"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <p>Loading leaves...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredLeaves.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <table className="leaves-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Applied At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.id}</td>
                <td>{leave.employeeName}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>{leave.appliedAt?.slice(0, 19).replace("T", " ")}</td>
                <td>
                  {leave.status === "PENDING" && (
                    <>
                      <button onClick={() => handleApprove(leave.id)} className="approve-btn">
                        Approve
                      </button>
                      <button onClick={() => handleReject(leave.id)} className="reject-btn">
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManagerDashboard;
