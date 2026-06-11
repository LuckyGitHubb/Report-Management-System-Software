import { Router } from "express";
import { getDashboardOverview,
    getTopFiveReportTemplate,
    getReportsByMonth,
    getRecentReports,
    getTodayReports,
    getMyDashboardOverview,
    getMyLastGeneratedReport,
    getMyRecentReports,
    getMyReportStats,
    getMyReportsByMonth, } from "../controllers/dashboard-controllers.js";

const dashboardRouter = Router();

dashboardRouter.get("/overview", getDashboardOverview);

dashboardRouter.get("/top-five-stats", getTopFiveReportTemplate);

dashboardRouter.get("/report-by-month", getReportsByMonth);

dashboardRouter.get("/recent-report", getRecentReports);

dashboardRouter.get("/today-report", getTodayReports);

dashboardRouter.get("/user/overview", getMyDashboardOverview);

dashboardRouter.get("/user/last-generated-report", getMyLastGeneratedReport);

dashboardRouter.get("/user/report-by-month", getMyReportsByMonth);

dashboardRouter.get("/user/recent-report", getMyRecentReports);

dashboardRouter.get("/user/report-stats", getMyReportStats);


export default dashboardRouter; 