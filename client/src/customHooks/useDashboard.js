import { useEffect, useState } from "react";
import useToken from "./useToken";
import { DashboardApi } from "../config/apis";

const useGetDashboardData = () => {
  const token = useToken();
  const [data, setData] = useState({
    data: null,
    loading: true,
    status: "",
    message: "",
  });

  useEffect(() => {
    const getData = async () => {
      setData((prevState) => ({ ...prevState, loading: true }));
      try {
        const response = await DashboardApi.dashboard(token);
        console.log("api response", response.data.data);
        setData({
          data: response.data.data,
          loading: false,
          status: "success",
          message: "",
        });
      } catch (error) {
        let errorMessage = "";

        if (error.response && error.response.data) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = error.message;
        }

        setData({
          data: null,
          loading: false,
          status: "error",
          message: errorMessage || "Failed to fetch dashboard data",
        });
      }
    };

    if (token) {
      getData();
    }
  }, [token]);

  return data;
};

export default useGetDashboardData;
