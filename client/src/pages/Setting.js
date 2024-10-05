import React from "react";
const Setting = () => {
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="">
            <div className="card">
              <div className="card-body p-2">
                <h3 className="ps-3 mb-0">Account Settings</h3>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <div className="card-body p-4">
                <div className="">
                  {/* <p className="mb-5 text-center">
                    Sign in to continue to CST.
                  </p> */}
                  <form className="form-horizontal" action="index.html">
                    <div className="row mx-auto">
                      <div className="col-md-4 px-md-0">
                        <div className="mb-4">
                          <label className="form-label" for="userpassword">
                            Change Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="userpassword"
                            placeholder="Enter new password"
                            required
                          />
                        </div>
                        <div className="d-flex">
                          <div className="d-grid col-4">
                            <button
                              className="btn btn-primary waves-effect waves-light w-30"
                              type="button"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <div className="mt-5 text-center">
                <p className="text-white-50">
                  Don't have an account ?{" "}
                  <a
                    href="auth-register.html"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Register{" "}
                  </a>{" "}
                </p>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
