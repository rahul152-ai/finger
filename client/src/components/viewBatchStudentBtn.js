import React, { useState } from "react";
import BatchStudentsModal from "./BatchStudentModal";

const ViewBatchStudentBtn = ({ batchId }) => {
  const [show, setShow] = useState(false);

  const onClose = () => {
    setShow(false);
  };
  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className="btn btn-sm btn-primary rounded-circle d-flex justify-content-center"
      >
        <i className="scale-1 ri-eye-fill fs-6"> </i>
      </button>

      {show && (
        <BatchStudentsModal show={show} onClose={onClose} batchId={batchId} />
      )}
    </>
  );
};

export default ViewBatchStudentBtn;
