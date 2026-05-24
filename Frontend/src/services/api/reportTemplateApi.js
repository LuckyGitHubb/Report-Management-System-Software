import baseApi from "./baseApi";

export const fetchAllReportTemplates = () => {
  return baseApi.get(`/report-template/template/all`);
};

export const fetchReportTemplateById = (id) => {
  return baseApi.get(`/report-template/template/${id}`);
};

export const createReportTemplate = (form) => {
  return baseApi.post("/report-template/template", { ...form });
};

export const updateReportTemplate = (form,id) => {
  return baseApi.put(`/report-template/template/${id}`, { ...form });
};    