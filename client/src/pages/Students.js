import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import StudentsTable from "../Table/StudentsTable";

const Students = () => {
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">Students List</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item breadactive">Student</li>
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
                <StudentsTable />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
