import { useEffect, useState } from "react";
import {
  fetchUserDashboardOverview,
  fetchUserLastGeneratedReport,
  fetchUserMonthlyReports,
  fetchUserRecentReports,
  fetchUserTodayReports,
} from "../services/api/dashboardApi";

const useUserDashboard = (month) => {
  const [loading, setLoading] = useState(false);

  const [dashboardOverview, setDashboardOverview] = useState([]);
  const [lastGeneratedReport, setLastGeneratedReport] = useState(null);
  const [monthlyReports, setMonthlyReports] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [todayReports, setTodayReports] = useState([]);

  const fetchDashboardOverviewData = async () => {
    try {
      const res = await fetchUserDashboardOverview();
      setDashboardOverview(res?.data?.data);
    } catch (error) {
      console.log("error:", error);
      setDashboardOverview([]);
    }
  };

  const fetchLastGeneratedReportData = async () => {
    try {
      const res = await fetchUserLastGeneratedReport();
      setLastGeneratedReport(res?.data?.data);
    } catch (error) {
      console.log("error:", error);
      setLastGeneratedReport(null);
    }
  };

  const fetchMonthlyReportsData = async (month) => {
    try {
      const res = await fetchUserMonthlyReports(month);
      setMonthlyReports(res?.data?.data);
    } catch (error) {
      console.log("error:", error);
      setMonthlyReports([]);
    }
  };

  const fetchRecentReportsData = async () => {
    try {
      const res = await fetchUserRecentReports();
      setRecentReports(res?.data?.data);
    } catch (error) {
      console.log("error:", error);
      setRecentReports([]);
    }
  };

  const fetchTodayReportsData = async () => {
    try {
      const res = await fetchUserTodayReports();
      setTodayReports(res?.data?.data);
    } catch (error) {
      console.log("error:", error);
      setTodayReports([]);
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);

    try {
      await Promise.all([
        fetchDashboardOverviewData(),
        fetchLastGeneratedReportData(),
        fetchMonthlyReportsData(month),
        fetchRecentReportsData(),
        fetchTodayReportsData(),
      ]);
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [month]);

  return {
    loading,
    dashboardOverview,
    lastGeneratedReport,
    monthlyReports,
    recentReports,
    todayReports,
    fetchDashboardData,
  };
};

export default useUserDashboard;