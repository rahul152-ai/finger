import api from "./axios.js";

export const AuthApi = {
  signIn: async (data) => {
    const response = await api.request({
      url: "/auth/login",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  validateToken: async (token) => {
    const response = await api.request({
      url: "/auth/validate",
      method: "get",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  chagePassword: async (data, token) => {
    const response = await api.request({
      url: "/auth/update-password",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
};

export const TableApi = {
  batches: async (token, query) => {
    const response = await api.request({
      url: `/batch/get-batchs?page=${query.page}&limit=${query.limit}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  Addbatch: async (token, data) => {
    const response = await api.request({
      url: `/batch/add`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
    return response;
  },
  editbatch: async (token, data, batchId) => {
    const response = await api.request({
      url: `/batch/edit-batch/${batchId}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
    return response;
  },
  batch: async (batchId) => {
    const response = await api.request({
      url: `/batch/get-batch/${batchId}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  deleteBatch: async (token, batchId) => {
    const response = await api.request({
      url: `/batch/delete-batch/${batchId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};

export const StudentsApi = {
  batchStudent: async (token, query, batchId) => {
    const response = await api.request({
      url: `/student/batch/${batchId}?page=${query.page}&limit=${query.limit}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  addStudent: async (token, data) => {
    const response = await api.request({
      url: `/student/add`,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
    return response;
  },
  editStudent: async (token, data, studentId) => {
    const response = await api.request({
      url: `/student/edit/${studentId}`,
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
    return response;
  },
  deletStudent: async (token, studentId) => {
    const response = await api.request({
      url: `/student/delete/${studentId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  students: async (token, query) => {
    const response = await api.request({
      url: `/student/get-all/?page=${query.page}&limit=${query.limit}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  student: async (token, studentId) => {
    const response = await api.request({
      url: `/student/get/${studentId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};
export const DashboardApi = {
  dashboard: async (token) => {
    const response = await api.request({
      url: `/dashboard`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};
