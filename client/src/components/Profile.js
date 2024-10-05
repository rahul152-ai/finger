import React, { useContext } from "react";
import { AuthContext } from "../context/context";
import { baseUrl } from "../utils/imagePath";
const ProfilePage = () => {
  const [user] = useContext(AuthContext);
  return (
    <div className="row align-items-center">
      <div className="col-12 col-sm-3">
        <div class="text-center border-end">
          <img
            width={"120px"}
            src={baseUrl + user?.defaultIcon}
            className="img-fluid avatar-xxl rounded-circle"
            alt=""
          />
          <h4 className="text-primary font-size-20 mt-3 mb-2">
            {user?.userName}
          </h4>
        </div>
      </div>
      <div className="col-12 col-sm-9">
        <div className="ms-3">
          <div>
            <h4 className="card-title mb-2 p-1 bg-info text-white text-sm-center">
              Profile Details
            </h4>
          </div>
          <div className="row my-4">
            <div className="col-md-12">
              <div className="form-group row mb-2">
                <label className="col-form-label col-md-4 bold-font">
                  Email
                </label>
                <div className="col-md-8" style={{ marginTop: "6px" }}>
                  : {user?.email}
                </div>
              </div>
              <hr className="m-0 mb-2" />
              <div className="form-group row mb-2">
                <label className="col-form-label col-md-4 bold-font">
                  Role
                </label>
                <div
                  className="col-md-8 text-capitalize"
                  style={{ marginTop: "6px" }}
                >
                  : {user?.role}
                </div>
              </div>
              <hr className="m-0 mb-2" />
              <div className="form-group row mb-2">
                <label className="col-form-label col-md-4 bold-font">
                  Allowed Batch
                </label>
                <div className="col-md-8" style={{ marginTop: "6px" }}>
                  : {user?.allowedBatch}
                </div>
              </div>
              <hr className="m-0 mb-2" />
              <div className="form-group row mb-2">
                <label className="col-form-label col-md-4 bold-font">
                  Allowed student/Batch
                </label>
                <div className="col-md-8" style={{ marginTop: "6px" }}>
                  : {user?.allowedStudentPerBatch}
                </div>
              </div>
              <hr className="m-0 mb-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
