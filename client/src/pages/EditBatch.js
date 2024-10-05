import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useGoBack from "../customHooks/useGoBack";
import useEditBatch from "../customHooks/useEditBatch";
import { TableApi } from "../config/apis"; // Assuming you have an API utility for fetching data

const EditBatch = () => {
  const goBack = useGoBack();
  const { batchId } = useParams(); // Get the batch ID from the route params
  const { editBatch, loading: updating } = useEditBatch(batchId); // Destructure editBatch and loading state from the custom hook

  const {
    register,
    handleSubmit,
    reset, // Used to set form data
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false); // Loading state for data fetching
  const [error, setError] = useState(null); // State for any error during fetch

  // Fetch the batch data when the component mounts
  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        setLoading(true);
        const response = await TableApi.batch(batchId);
        console.log(response);
        reset(response.data.data);
        if (response.data.data === null) {
          setError("No Batch Found");
        }
      } catch (err) {
        setError("Failed to fetch batch data.");
      } finally {
        setLoading(false);
      }
    };

    if (batchId) {
      fetchBatchData();
    }
  }, [batchId, reset]);

  // Submit updated form data
  const onSubmit = (data) => {
    editBatch(data, goBack); // Call the custom hook function to edit the batch
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="container-fluid">
          <div className="text-center">loading...</div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="page-content">
        <div className="container-fluid">
          <div className="text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">Edit Batch</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item breadactive">Edit Batch</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* student body */}
        <div className="row">
          <div className="col-12">
            <Card>
              <CardHeader className="bg-secondary text-center text-white">
                Edit Batch
              </CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group row mb-2">
                        <label className="col-form-label col-md-2 bold-font required-field">
                          Batch Name
                        </label>
                        <div className="col-md-10">
                          <input
                            id="batchName"
                            className={`form-control ${
                              errors.batchName ? "is-invalid" : ""
                            }`}
                            {...register("batchName", {
                              required: "Batch Name is required",
                              pattern: {
                                value: /^[A-Za-z0-9 ]+$/,
                                message:
                                  "Batch Name can only contain letters and numbers",
                              },
                            })}
                          />
                          {errors?.batchName && (
                            <span className="text-danger">
                              {errors?.batchName?.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <hr />

                      <div style={{ textAlign: "center" }} className="mt-0">
                        <button
                          disabled={updating}
                          type="submit"
                          className="btn btn-success col-md-2 me-1"
                        >
                          Submit
                        </button>

                        <button
                          disabled={updating}
                          onClick={goBack}
                          type="button"
                          className="btn btn-danger col-md-2 ms-1"
                        >
                          Close
                        </button>
                      </div>
                      <br />
                    </form>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBatch;
