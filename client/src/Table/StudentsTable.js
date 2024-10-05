import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useToken from "../customHooks/useToken";
import { columns } from "./column/student";
import { StudentsApi } from "../config/apis";

const customStyles = {
  subHeader: {
    style: {
      justifyContent: "center",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#bec7ea",
      color: "#0056b3",
      borderTop: "1px solid #838383",
      borderLeft: "1px solid #838383",
      borderRight: "1px solid #838383",
      fontWeight: "bold",
      fontSize: "medium",
    },
  },
  headCells: {
    style: {
      "&:not(:last-of-type)": {
        borderRight: "0.5px solid #838383",
      },
    },
  },

  table: {
    style: {
      // width: "fit-content",
      borderCollapse: "collapse",
    },
  },
  rows: {
    style: {
      border: "1px solid #838383",
    },
  },
  cells: {
    style: {
      "&:not(:last-of-type)": {
        borderRight: "0.5px solid #838383",
      },
    },
  },
};

const StudentsTable = () => {
  // State for search and filtered data
  const token = useToken();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  // State for search and filtered data
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Handle search input change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFilterText(searchValue);
    const filtered = data.filter(
      (item) =>
        item?.name?.toLowerCase().includes(searchValue) ||
        item?.batchId?.batchName?.toLowerCase().includes(searchValue) ||
        item?.mobileNumber == searchValue
    );
    setFilteredData(filtered);
  };

  // Function to remove a batch after deletion
  const handleStudent = (studentId) => {
    setData((preveStudent) =>
      preveStudent.filter((student) => student._id !== studentId)
    );
    setFilteredData((prevStudent) =>
      prevStudent.filter((student) => student._id !== studentId)
    );
    setTotalData(totalData - 1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await StudentsApi.students(token, query);
        setData(response.data.data);
        setFilteredData(response.data.data);
        setTotalData(response.data.pagination.totalBatches);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, token]);

  const handleRowPerPage = (newPerPage, page) => {
    setQuery({ ...query, limit: newPerPage, page: page });
  };
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <Link to={"/add-students"}>
          <button className="btn btn-outline-primary">Add</button>
        </Link>
        <div className="d-flex flex-row table-search-header">
          <div className="data-syn-icon">
            <i className="ri-search-line" id="TooltipExample"></i>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={handleSearchChange}
            className="table-search"
          />
          <div className="data-syn-icon">
            <i className="ri-close-line"></i>
          </div>
        </div>
      </div>

      {/* DataTable Component */}
      <DataTable
        columns={columns(handleStudent)}
        data={filteredData}
        customStyles={customStyles}
        pagination
        striped
        responsive
        progressPending={loading}
        paginationServer
        paginationTotalRows={totalData}
        onChangeRowsPerPage={handleRowPerPage}
        onChangePage={(page) => setQuery({ ...query, page: page })}
      />
    </div>
  );
};

export default StudentsTable;
