import baseApi from "./baseApi";

export const fetchDashboardOverview = () => {
  return baseApi.get(`/dashboard/overview`);
};

export const fetchTopReportTemplates = () => {
  return baseApi.get(`/dashboard/top-five-stats`);
};            

export const fetchMonthlyReports = (month) => {
  return baseApi.get(`/dashboard/report-by-month?month=${month}`);
};

export const fetchRecentReports = () => {
  return baseApi.get(`/dashboard/recent-report`);
};

export const fetchTodayReports = () => {
  return baseApi.get(`/dashboard/today-report`);
};

// User Dashboard APIs

export const fetchUserDashboardOverview = () => {
  return baseApi.get(`/dashboard/user/overview`);
};

export const fetchUserLastGeneratedReport = () => {
  return baseApi.get(`/dashboard/user/last-generated-report`);
};            

export const fetchUserMonthlyReports = (month) => {
  return baseApi.get(`/dashboard/user/report-by-month?month=${month}`);
};

export const fetchUserRecentReports = () => {
  return baseApi.get(`/dashboard/user/recent-report`);
};

export const fetchUserTodayReports = () => {
  return baseApi.get(`/dashboard/user/report-stats`);
};