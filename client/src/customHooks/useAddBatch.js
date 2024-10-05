import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { TableApi } from "../config/apis";
import { AuthContext } from "../context/context";
import useToken from "./useToken";

const useAddBatch = () => {
  const token = useToken();
  const [user] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const addBatch = async (data, goBack) => {
    data.batchAdmin = user._id;
    try {
      setLoading(true);
      const response = await TableApi.Addbatch(token, data);
      if (response.status === 201) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Batch Added!",
          text: "The batch has been successfully added.",
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
        text: "There was an error adding the batch. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { addBatch, loading };
};

export default useAddBatch;
