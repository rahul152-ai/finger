import { useState } from "react";
import Swal from "sweetalert2";
import { StudentsApi, TableApi } from "../config/apis";
import useToken from "./useToken";

const useDeleteStudent = () => {
  const token = useToken(); // Fetch token
  const [loading, setLoading] = useState(false); // Loading state

  const deleteStudent = async (batchId) => {
    // Check if the token exists
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Authentication Error",
        text: "You are not authenticated. Please log in again.",
        confirmButtonText: "OK",
      });
      return false; // Return false if token is missing
    }

    // Ask the user for confirmation before proceeding
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Are you sure want to Delete this Student?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) {
      Swal.fire({
        icon: "info",
        title: "Cancelled",
        text: "The Student was not deleted.",
        confirmButtonText: "OK",
      });
      return false; // Return false if the user cancels
    }

    try {
      setLoading(true); // Start loading

      // Show loading modal
      Swal.fire({
        title: "Deleting batch...",
        text: "Please wait while we process your request.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Show loading spinner
        },
      });

      const response = await StudentsApi.deletStudent(token, batchId); // API call

      if (response.status === 200) {
        // Success alert after deletion
        Swal.fire({
          icon: "success",
          title: "Batch Deleted",
          text: "The Student has been successfully deleted.",
          confirmButtonText: "OK",
        });
        return true; // Return true when deletion is successful
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      let errorMessage =
        "There was an error deleting the Student. Please try again.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message; // Custom error message from API
      }

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "Retry",
      });
      return false; // Return false if deletion fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return { deleteStudent, loading };
};

export default useDeleteStudent;
