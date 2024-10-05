import React from "react";
import { Link } from "react-router-dom";

const DashboardShimmer = () => {
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
                    <Link to={"."}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Home</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {[1, 2, 3, 4].map((index) => (
            <div className="col-xl-4 col-sm-6" key={index + "shimmer"}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex text-muted">
                    <div className="flex-shrink-0 me-3 align-self-center">
                      <div
                        style={{
                          width: "72px",
                          height: "73px",
                        }}
                      >
                        <div className="dashboard-card-icon bg-light text-primary shimmerBG"></div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden m-auto dashboard-card-head">
                      <p
                        className="mb-1 shimmerBG"
                        style={{
                          height: "20px",
                          width: "80%",
                        }}
                      >
                        {" "}
                      </p>
                      <h5
                        className="mb-3 shimmerBG"
                        style={{
                          height: "20px",
                          width: "80%",
                        }}
                      >
                        {" "}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardShimmer;
