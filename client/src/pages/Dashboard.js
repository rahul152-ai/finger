import React from "react";
import { Link } from "react-router-dom";
import DashboardShimmer from "../shimmer/dashboard";
import useGetDashboardData from "../customHooks/useDashboard";

export const Dashboard = () => {
  const data = useGetDashboardData();
  // console.log(data);

  if (data.loading) {
    return <DashboardShimmer />;
  }

  if (data.status === "error") {
    return (
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              <h3> {data.message}</h3>
            </div>
          </div>
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
              <h4 className="mb-sm-0">Dashboard</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item breadactive">Home</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4  col-sm-6">
            <div className="card">
              <div className="card-body">
                <Link to={"/batchs"}>
                  <div className="d-flex text-muted">
                    <div className="flex-shrink-0 me-3 align-self-center">
                      <div className="dashboard-card_icon_container">
                        <div className="dashboard-card-icon bg-light text-primary ">
                          <i className="ri-file-list-2-line fs-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden m-auto dashboard-card-head">
                      <p className="mb-1 d-flex justify-content-between">
                        <span className="text-dark">Total Batches</span>
                        <div className="mb-0">{data?.data?.batch}</div>
                      </p>
                      <p className="text-truncate d-flex justify-content-between mb-0">
                        <div
                          className="text-decoration-underline"
                          to={"/batchs"}
                        >
                          View Details
                        </div>
                        <span className="text-success">
                          <div to={"/batchs"}>
                            <i className="ri-arrow-right-line align-bottom ms-1 fs-3"></i>
                          </div>
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              {/* <!-- end card-body --> */}
            </div>
            {/* <!-- end card --> */}
          </div>

          <div className="col-xl-4  col-sm-6">
            <div className="card">
              <div className="card-body">
                <Link to={"/students"}>
                  <div className="d-flex text-muted">
                    <div className="flex-shrink-0 me-3 align-self-center">
                      <div className="dashboard-card_icon_container">
                        <div className="dashboard-card-icon bg-light text-primary ">
                          <i className="ri-file-list-2-line fs-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden m-auto dashboard-card-head">
                      <p className="mb-1 d-flex justify-content-between">
                        <span className="text-dark">Total Students</span>
                        <div className="mb-0">{data?.data?.students}</div>
                      </p>
                      <p className="text-truncate d-flex justify-content-between mb-0">
                        <div
                          className="text-decoration-underline"
                          to={"/students"}
                        >
                          View Details
                        </div>
                        <span className="text-success">
                          <div to={"/students"}>
                            <i className="ri-arrow-right-line align-bottom ms-1 fs-3"></i>
                          </div>
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              {/* <!-- end card-body --> */}
            </div>
            {/* <!-- end card --> */}
          </div>
          <div className="col-xl-4  col-sm-6">
            <div className="card">
              <div className="card-body">
                <Link>
                  <div className="d-flex text-muted">
                    <div className="flex-shrink-0 me-3 align-self-center">
                      <div className="dashboard-card_icon_container">
                        <div className="dashboard-card-icon bg-light text-primary ">
                          <i className="ri-file-list-2-line fs-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden m-auto dashboard-card-head">
                      <p className="mb-1 d-flex justify-content-between">
                        <span className="text-dark">Others</span>
                        <div className="mb-0">0</div>
                      </p>
                      <p className="text-truncate d-flex justify-content-between mb-0">
                        <div className="text-decoration-underline">
                          View Details
                        </div>
                        <span className="text-success">
                          <div>
                            <i className="ri-arrow-right-line align-bottom ms-1 fs-3"></i>
                          </div>
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              {/* <!-- end card-body --> */}
            </div>
            {/* <!-- end card --> */}
          </div>
        </div>
      </div>
    </div>
  );
};
