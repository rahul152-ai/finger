import React, { useEffect, useState } from "react";
import { baseUrl } from "../utils/imagePath";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import fingerPrintIcon from "../assets/images/fingerprint-Icon.png";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";
import getHttpError from "../utils/getHttpError";
import { StudentsApi, TableApi } from "../config/apis";
import useToken from "../customHooks/useToken";
import useGoBack from "../customHooks/useGoBack";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/spinner";
const uri = "http://localhost:8004/mfs100/"; // Non-Secure
const returnFinger = (fingers, oldImage, index) => {
  if (fingers[index]) {
    return fingers[index];
  } else {
    return baseUrl + oldImage[index];
  }
};

const EditStudent = () => {
  const { studentId } = useParams();
  const goBack = useGoBack();
  const [batchs, setBatch] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [fingers, setFingers] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [imageMetaData, setImageMetaData] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const token = useToken();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  // Handle form submit
  const handleFormSubmit = async (data) => {
    try {
      setSubmitting(true);
      let newImmg = fingers.filter((finger) => finger !== "");
      data.fingerImage = JSON.stringify(newImmg);
      data.imageMetaData = imageMetaData;
      data.oldImages = oldImage;

      const response = await StudentsApi.editStudent(token, data, studentId);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Student updateda successfully!",
        confirmButtonText: "OK",
      }).then(() => {
        goBack();
      });
      console.log(response);
    } catch (error) {
      let errorMessage = "";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        confirmButtonText: "OK",
      });
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const CaptureFinger = async (quality, timeout, index) => {
    const MFS100Request = {
      Quality: quality,
      TimeOut: timeout,
    };
    const jsondata = JSON.stringify(MFS100Request);

    const response = await PostMFS100Client("capture", jsondata);
    if (response.httpStatus === true) {
      let string = "data:image/png;base64," + response?.data?.BitmapData;
      setImageMetaData([...imageMetaData, index]);
      setFingers((prev) => {
        prev[index] = string;
        return [...prev];
      });
    } else {
      alert("Failed to capture the fingerprint");
    }
  };

  const PostMFS100Client = async (method, jsonData) => {
    try {
      setCapturing(true);
      const response = await axios.post(uri + method, jsonData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      return { httpStatus: true, data: response.data };
    } catch (error) {
      console.error("HTTP Error:", error);
      return { httpStatus: false, err: getHttpError(error) };
    } finally {
      setCapturing(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [batchResponse, stuResponse] = await Promise.all([
          TableApi.batches(token, { page: 1, limit: 20 }),
          StudentsApi.student(token, studentId),
        ]);

        // Set batches first
        setBatch(batchResponse.data.data);
        setOldImage(stuResponse.data.student.fingerPrint);

        // Now, reset the form with student data
        reset(stuResponse.data.student);

        // After batches are set, update the batchId in the form
        setValue("batchId", stuResponse.data.student.batchId._id);
      } catch (error) {
        let errorMessage = "";

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = error.message;
        }

        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token, studentId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">Edit Student</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item breadactive">Edit Student</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Card>
              <CardHeader
                style={{
                  backgroundColor: "#7e7b7b",
                }}
              >
                <h5
                  className="mb-sm-0 text-center"
                  style={{
                    color: "white",
                  }}
                >
                  Edit Student
                </h5>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <Row className="mb-3">
                    <Col>
                      <FormGroup>
                        <Label for="studentName">Student Name</Label>
                        <input
                          type="text"
                          id="studentName"
                          className={`form-control ${
                            errors?.name ? "is-invalid" : ""
                          }`}
                          placeholder="Enter student name"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "Name is required",
                            },
                            pattern: {
                              value: /^[A-Za-z ]+$/,
                              message: "Name is not Valid",
                            },
                          })}
                        />
                        {errors?.name && (
                          <span className="text-danger">
                            {errors?.name?.message}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="mobile">Mobile</Label>
                        <input
                          type="tel"
                          id="mobile"
                          className={`form-control ${
                            errors?.mobileNumber ? "is-invalid" : ""
                          }`}
                          placeholder="Enter mobile number"
                          {...register("mobileNumber", {
                            required: {
                              value: true,
                              message: "Mobile number is required",
                            },
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Only number is allowed",
                            },
                          })}
                        />

                        {errors?.mobileNumber && (
                          <span className="text-danger">
                            {errors?.mobileNumber?.message}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <FormGroup>
                        <Label for="address">Address</Label>
                        <input
                          type="text"
                          id="address"
                          className={`form-control ${
                            errors?.address ? "is-invalid" : ""
                          }`}
                          placeholder="Enter address"
                          {...register("address", {
                            required: {
                              value: true,
                              message: "Address is required",
                            },
                          })}
                        />
                        {errors?.address && (
                          <span className="text-danger">
                            {errors?.address?.message}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="batchId">Batch</Label>
                        <select
                          className={`form-control ${
                            errors?.batchId ? "is-invalid" : ""
                          }`}
                          type="batchId"
                          id="batchId"
                          {...register("batchId", {
                            required: {
                              value: true,
                              message: "Batch is required",
                            },
                          })}
                        >
                          <option value="">- Select -</option>
                          {batchs?.map((batch) => (
                            <option key={batch?._id} value={batch?._id}>
                              {batch?.batchName}
                            </option>
                          ))}
                        </select>

                        {errors?.batchId && (
                          <span className="text-danger">
                            {errors?.batchId?.message}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="mb-3 text-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Col key={index}>
                        <Card className="border">
                          <CardBody className="flex-column d-flex justify-content-center align-items-center">
                            <img
                              src={returnFinger(fingers, oldImage, index)}
                              alt="Fingerprint"
                              className="img-fluid"
                              style={{ width: "150px" }}
                            />
                            <p className="mt-3">Fingerprint {index + 1}</p>
                            <Button
                              color="primary"
                              className="mt"
                              type="button"
                              disabled={capturing}
                              onClick={() => CaptureFinger(60, 10000, index)}
                            >
                              Capture
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="me-2 btn btn-primary"
                      disabled={submitting || capturing}
                    >
                      Submit
                    </button>
                    <Button
                      color="danger"
                      type="button"
                      disabled={submitting || capturing}
                      onClick={goBack}
                    >
                      Close
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
