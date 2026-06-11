import baseApi from "./baseApi";

export const fetchAllReports = () => {
  return baseApi.get(`/report/all`);
};

export const fetchAllReportsByPatientId = () => {
  return baseApi.get(`/report/all`);
};      

export const fetchReportById = (id) => {
  return baseApi.get(`/report/${id}`);
};

export const createReport = (form) => {
  return baseApi.post("/report", { ...form });
};

export const updateReport = (form,id) => {
  return baseApi.put(`/report/${id}`, { ...form });
};
