import React from "react";
import useDeleteBatch from "../customHooks/useDeleteBatch";

const DeletBatchBtn = ({ batchId, handleDeleteBatch }) => {
  const { deleteBatch, loading } = useDeleteBatch();

  const handleDelete = async () => {
    const isDeleted = await deleteBatch(batchId); // Call the delete function
    if (isDeleted) {
      handleDeleteBatch(batchId); // Only call onDelete if the batch was deleted successfully
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-sm btn-danger rounded-circle d-flex justify-content-center"
      disabled={loading} // Disable the button while deletion is in progress
    >
      {loading ? (
        <i className="scale-1 ri-loader-4-line fs-6"> </i> // Loading spinner icon
      ) : (
        <i className="scale-1 ri-delete-bin-6-line fs-6"> </i> // Delete icon
      )}
    </button>
  );
};

export default DeletBatchBtn;
