const getHttpError = (error) => {
  let err = "Unhandled Exception";
  if (!error.response) {
    err = "Service Unavailable";
  } else if (error.response.status === 404) {
    err = "Requested page not found";
  } else if (error.response.status === 500) {
    err = "Internal Server Error";
  } else if (error.message === "Network Error") {
    err = "Network error";
  } else if (error.code === "ECONNABORTED") {
    err = "Time out error";
  } else {
    err = "Unhandled Error";
  }
  return err;
};

export default getHttpError;
