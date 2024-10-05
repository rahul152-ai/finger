import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useGoBack from "../customHooks/useGoBack";
import useAddBatch from "../customHooks/useAddBatch";

const AddBatch = () => {
  const goBack = useGoBack();
  const { addBatch, loading } = useAddBatch(); // Destructure addBatch and loading state from the custom hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addBatch(data, goBack); // Call the custom hook function to add batch
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">Profile Page</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item breadactive">Add Batch</li>
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
                {" "}
                Add Batch
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
                              errors?.batchName ? "is-invalid" : ""
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
                          disabled={loading}
                          type="submit"
                          className="btn btn-success col-md-2 me-1"
                        >
                          Submit
                        </button>

                        <button
                          disabled={loading}
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

export default AddBatch;
