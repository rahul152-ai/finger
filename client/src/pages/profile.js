import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import ProfilePage from "../components/Profile";

const Profile = () => {
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
                  <li className="breadcrumb-item breadactive">Profile</li>
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
                <ProfilePage />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
