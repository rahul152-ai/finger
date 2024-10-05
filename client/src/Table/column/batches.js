import { Link } from "react-router-dom";
import DeletBatchBtn from "../../components/DeletBatchBtn";
import ViewBatchStudentBtn from "../../components/viewBatchStudentBtn";
// Define columns for the table
const columns = (handleDeleteBatch) => [
  {
    name: <span className="font-weight-bold">Batch Name</span>,
    selector: (row) => row?.batchName,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold">Batch Admin</span>,
    selector: (row) => row?.batchAdmin?.userName,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold">Student Count</span>,
    selector: (row) => row?.studentCount,
    sortable: true,
    width: "170px",
    center: "true",
  },
  {
    name: <span className="font-weight-bold"> View </span>,
    selector: (row) => <ViewBatchStudentBtn batchId={row._id} />,
    compact: "true",
    center: "true",
    width: "60px",
  },

  {
    name: <span className="font-weight-bold">Edit</span>,
    selector: (row) => (
      <Link
        to={`/edit-batch/${row._id}`}
        className="btn btn-sm btn-warning rounded-circle d-flex justify-content-center"
      >
        <i className="scale-1  ri-edit-box-line fs-6 "> </i>
      </Link>
    ),
    compact: "true",
    center: "true",
    width: "60px",
  },
  {
    name: <span className="font-weight-bold">Delete</span>,
    selector: (row) => (
      <DeletBatchBtn batchId={row._id} handleDeleteBatch={handleDeleteBatch} />
    ),
    center: "true",
    compact: "true",
    width: "60px",
  },
];

export default columns;
