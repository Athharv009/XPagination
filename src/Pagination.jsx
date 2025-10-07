import axios from "axios";
import { useEffect, useState } from "react";

const Table = ({ employees }) => {
  return (
    <table
      //   border="1"
      cellPadding="10"
      style={{ borderCollapse: "collapse", width: "80%", margin: "auto" }}
    >
      <thead>
        <tr style={{ backgroundColor: "#009879", color: "white" }}>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody style={{ borderBottom: "2px solid #009879" }}>
        {employees.map((data) => (
          <tr key={data.id} style={{ borderBottom: "1px solid gray" }}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Pagination() {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => setEmployeeData(res.data))
      .catch(() => alert("failed to fetch data"));
  }, []);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentEmployees = employeeData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(employeeData.length / rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Employee Data Table</h1>

      <Table employees={currentEmployees} />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          style={{
            background: "#009879",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Previous
        </button>
        <button
          style={{
            background: "#009879",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {currentPage}
        </button>
        <button
          onClick={handleNext}
          style={{
            background: "#009879",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
