import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/imagePath";
import DeletStudentBtn from "../../components/deletStudentBtn";

const columns = (handleStudent) => [
  {
    name: <span className="font-weight-bold">Name</span>,
    selector: (row) => row?.name,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold">Batch</span>,
    selector: (row) => row?.batchId?.batchName,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold">Mobile</span>,
    selector: (row) => row?.mobileNumber,
    sortable: true,
    width: "110px",
    compact: true,
    center: true,
  },
  {
    name: <span className="font-weight-bold">Finger1</span>,
    selector: (row) => (
      <img
        src={baseUrl + row?.fingerPrint[0]}
        alt="FingerPrint"
        width={90}
        height={90}
      />
    ),
    center: true,
    width: "100px",
    compact: true,
  },
  {
    name: <span className="font-weight-bold">Finger2</span>,
    selector: (row) => (
      <img
        src={baseUrl + row?.fingerPrint[1]}
        alt="FingerPrint"
        width={90}
        height={90}
      />
    ),
    width: "100px",
    compact: true,
    center: true,
  },
  {
    name: <span className="font-weight-bold">Finger3</span>,
    selector: (row) => (
      <img
        src={baseUrl + row?.fingerPrint[2]}
        alt="FingerPrint"
        width={90}
        height={90}
      />
    ),
    width: "100px",
    compact: true,
    center: true,
  },
  {
    name: <span className="font-weight-bold">Finger4</span>,
    selector: (row) => (
      <img
        src={baseUrl + row?.fingerPrint[3]}
        alt="FingerPrint"
        width={90}
        height={90}
      />
    ),
    width: "100px",
    compact: true,
    center: true,
  },
  {
    name: <span className="font-weight-bold">Finger5</span>,
    selector: (row) => (
      <img
        src={baseUrl + row?.fingerPrint[4]}
        alt="FingerPrint"
        width={90}
        height={90}
      />
    ),
    width: "100px",
    compact: true,
    center: true,
  },
  {
    name: <span className="font-weight-bold">Edit</span>,
    selector: (row) => (
      <Link
        to={`/edit-student/${row._id}`}
        title="Edit student"
        className="d-flex justify-content-center btn btn-sm btn-warning rounded-circle"
      >
        <i className="scale-1 ri-edit-box-line fs-6 "> </i>
      </Link>
    ),
    compact: true,
    center: true,
    width: "56px",
  },
  {
    name: <span className="font-weight-bold">Delete</span>,

    selector: (row) => (
      <DeletStudentBtn
        studentId={row._id}
        handleDeleteStudent={handleStudent}
      ></DeletStudentBtn>
    ),
    center: true,
    compact: true,
    width: "56px",
  },
];

export { columns };
