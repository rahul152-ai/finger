import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import BatchesTable from "../Table/BatchesTables";

const Batches = () => {
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">Batch List</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item breadactive">Batch</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* student body */}
        <div className="row">
          <div className="col-12">
            <Card>
              <CardBody>
                <BatchesTable />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batches;
