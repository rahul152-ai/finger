import { baseUrl } from "../../utils/imagePath";
const columns = [
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
    compact: true,
    center: true,
    width: "110px",
  },
  {
    name: <span className="font-weight-bold">Finger1</span>,
    selector: (row) => (
      <img
        src={baseUrl + row?.fingerPrint[0]}
        alt="FingerPrint 1"
        width={50}
        height={50}
      />
    ),
    center: true,
    width: "70px",
    compact: true,
  },
  {
    name: <span className="font-weight-bold">Finger2</span>,
    selector: (row) => (
      <img
        src={baseUrl + row?.fingerPrint[1]}
        alt="FingerPrint 2"
        width={50}
        height={50}
      />
    ),
    center: true,
    width: "70px",
    compact: true,
  },
  {
    name: <span className="font-weight-bold">Finger3</span>,
    selector: (row) => (
      <img
        src={baseUrl + row?.fingerPrint[2]}
        alt="FingerPrint 3"
        width={50}
        height={50}
      />
    ),
    center: true,
    width: "70px",
    compact: true,
  },
  {
    name: <span className="font-weight-bold">Finger4</span>,
    selector: (row) => (
      <img
        src={baseUrl + row?.fingerPrint[3]}
        alt="FingerPrint 4"
        width={50}
        height={50}
      />
    ),
    center: true,
    width: "70px",
    compact: true,
  },
  {
    name: <span className="font-weight-bold">Finger5</span>,
    selector: (row) => (
      <img
        src={baseUrl + row?.fingerPrint[4]}
        alt="FingerPrint 5"
        width={50}
        height={50}
      />
    ),
    center: true,
    width: "70px",
    compact: true,
  },
];

export { columns };
