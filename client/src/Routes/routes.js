import React from "react";
import { Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import Working from "../pages/Working";
import Students from "../pages/Students";
import AddStudent from "../pages/AddStudent";
import FingerprintCapture from "../pages/FingerTest";
import Profile from "../pages/profile";
import Batches from "../pages/Batches";
import AddBatch from "../pages/AddBatch";
import EditBatch from "../pages/EditBatch";
import EditStudent from "../pages/editStudents";

// import ForgetPasswordPage from "../Pages/ForgetPassword";

const authProtectedRoutes = [
  //dashboard
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/batchs", component: <Batches /> },
  { path: "/students", component: <Students /> },
  { path: "/add-students", component: <AddStudent /> },
  { path: "/edit-student/:studentId", component: <EditStudent /> },
  { path: "/profile", component: <Profile /> },
  { path: "/test", component: <FingerprintCapture /> },
  { path: "/add-batch", component: <AddBatch /> },
  { path: "/edit-batch/:batchId", component: <EditBatch /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  // { path: "/forgot-password", component: <ForgetPasswordPage /> },
];

export { authProtectedRoutes, publicRoutes };
