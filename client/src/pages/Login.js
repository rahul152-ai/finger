import React from "react";
import logo from "../assets/images/logo-dark.png";
import { Link } from "react-router-dom";
import useLogin from "../Hooks/useLogin";
import { useForm } from "react-hook-form";
import { Alert } from "reactstrap";

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [login, loading, status, alertDismiss] = useLogin(reset);

  return (
    <>
      <div className="bg-overlay bg-pattern"></div>
      <div className="account-pages my-5 pt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-6 col-md-8">
              <div className="card">
                {status?.message && (
                  <Alert
                    color={status?.type}
                    isOpen={status?.alertVisible}
                    toggle={alertDismiss}
                    fade={false}
                  >
                    {status?.message}
                  </Alert>
                )}
                <div className="card-body p-4">
                  <div className="">
                    <div className="text-center">
                      <Link to={"/"} className="">
                        <img
                          src={logo}
                          alt=""
                          height="24"
                          className="auth-logo logo-dark mx-auto"
                        />
                        <img
                          src={logo}
                          alt=""
                          height="24"
                          className="auth-logo logo-light mx-auto"
                        />
                      </Link>
                    </div>

                    <h4 className="font-size-18 text-muted mt-2 text-center">
                      Welcome Back !
                    </h4>
                    <p className="mb-5 text-center">Sign in to continue.</p>
                    <form
                      className="form-horizontal"
                      onSubmit={handleSubmit(login)}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-4">
                            <label className="form-label" htmlFor="username">
                              Email
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors?.email && "is-invalid"
                              }`}
                              id="username"
                              placeholder="Enter Email"
                              {...register("email", {
                                required: {
                                  value: true,
                                  message: "Email is required",
                                },
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Enter a Valid Email",
                                },
                              })}
                            />

                            {errors?.email && (
                              <small className="error">
                                {errors?.email?.message}
                              </small>
                            )}
                          </div>
                          <div className="mb-4">
                            <label
                              className="form-label"
                              htmlFor="userpassword"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              className={`form-control ${
                                errors?.password && "is-invalid"
                              }`}
                              id="userpassword"
                              placeholder="Enter password"
                              {...register("password", {
                                required: {
                                  value: true,
                                  message: "Password is required",
                                },
                                minLength: {
                                  value: 6,
                                  message:
                                    "Password should have at least 6 characters",
                                },
                              })}
                            />

                            {errors?.password && (
                              <small className="error">
                                {errors?.password?.message}
                              </small>
                            )}
                          </div>

                          <div className="row">
                            <div className="col">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customControlInline"
                                  // required
                                />
                                <label
                                  className="form-check-label from-label"
                                  htmlFor="customControlInline"
                                >
                                  Remember me
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* <Link to="/dashboard" className="black-link"> */}
                          <div className="d-grid mt-4">
                            <button
                              className="btn btn-primary waves-effect waves-light"
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? "Loading..." : "Log In"}
                            </button>
                          </div>
                          {/* </Link> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
