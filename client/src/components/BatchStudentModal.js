import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import BatchStudentTable from "../Table/BatchStudentTable";

const BatchStudentsModal = ({ show, onClose, batchId }) => {
  return (
    <Modal isOpen={show} toggle={onClose} centered fullscreen="xl" size="lg">
      <ModalHeader className="d-flex justify-content-center">
        <div>Batch Students</div>
      </ModalHeader>
      <ModalBody>
        <BatchStudentTable batchId={batchId} />
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-primary"
          variant="secondary"
          onClick={onClose}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default BatchStudentsModal;
