import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { TableApi } from "../config/apis";
import { AuthContext } from "../context/context";
import useToken from "./useToken";

const useEditBatch = (batchId) => {
  const token = useToken();
  const [user] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const editBatch = async (data, goBack) => {
    data.batchAdmin = user._id;
    try {
      setLoading(true);
      const response = await TableApi.editbatch(token, data, batchId);
      if (response.status === 200) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Batch Edited!",
          text: "The batch has been successfully edited.",
          confirmButtonText: "OK",
        }).then(() => {
          if (goBack) {
            goBack(); // Optional: go back if a callback is provided
          }
        });
      }
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error editing the batch. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { editBatch, loading };
};

export default useEditBatch;
