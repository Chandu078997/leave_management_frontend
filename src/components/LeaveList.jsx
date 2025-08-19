import React, { useEffect, useState } from "react";
import "./LeaveList.css";
function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLeaves = async () => {
    const res = await fetch("http://localhost:8080/api/leaves/all");
    const data = await res.json();
    setLeaves(data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleApprove = async (id) => {
    await fetch(`http://localhost:8080/api/leaves/${id}/approve`, { method: "PUT" });
    fetchLeaves();
  };

  const handleReject = async (id) => {
    await fetch(`http://localhost:8080/api/leaves/${id}/reject`, { method: "PUT" });
    fetchLeaves();
  };

  const filteredLeaves = leaves.filter(
    (l) =>
      (l.employeeName && l.employeeName.toLowerCase().includes(search.toLowerCase())) ||
      (l.reason && l.reason.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="leave-requests-container clearfix">
  <h2>Leave Requests</h2>

  <input
    type="text"
    placeholder="Search by Employee / Reason"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="leave-search"
  />

  <table className="leave-table">
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
          <td>{leave.appliedAt}</td>
          <td>
            {leave.status === "PENDING" && (
              <>
                <button onClick={() => handleApprove(leave.id)}>Approve</button>
                <button onClick={() => handleReject(leave.id)}>Reject</button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default LeaveRequests;
