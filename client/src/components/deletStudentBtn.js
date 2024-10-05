import React from "react";
import useDeleteStudent from "../customHooks/useDeleteStudent";

const DeletStudentBtn = ({ studentId, handleDeleteStudent }) => {
  const { deleteStudent, loading } = useDeleteStudent();

  const handleDelete = async () => {
    const isDeleted = await deleteStudent(studentId); // Call the delete function
    if (isDeleted) {
      handleDeleteStudent(studentId); // Only call onDelete if the batch was deleted successfully
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

export default DeletStudentBtn;
