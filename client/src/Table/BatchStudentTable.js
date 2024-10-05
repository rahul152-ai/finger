import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns } from "./column/batchStudent";
import useToken from "../customHooks/useToken";
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
      borderTop: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      fontWeight: "bold",
      fontSize: "medium",
    },
  },
  headCells: {
    style: {
      "&:not(:last-of-type)": {
        borderRight: "0.5px solid black",
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
      border: "1px solid black",
    },
  },
  cells: {
    style: {
      "&:not(:last-of-type)": {
        borderRight: "0.5px solid black",
      },
    },
  },
};

const BatchStudentTable = ({ batchId }) => {
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

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await StudentsApi.batchStudent(token, query, batchId);
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
  }, [query, token, batchId]);

  const handleRowPerPage = (newPerPage, page) => {
    setQuery({ ...query, limit: newPerPage, page: page });
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <div></div>
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
        columns={columns}
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
        noDataComponent="No Student data found"
      />
    </div>
  );
};

export default BatchStudentTable;
