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
import { authMiddleware } from "../middlewares/auth-middleware.js";

const dashboardRouter = Router();

dashboardRouter.get("/overview", authMiddleware, getDashboardOverview);

dashboardRouter.get("/top-five-stats", authMiddleware, getTopFiveReportTemplate);

dashboardRouter.get("/report-by-month", authMiddleware, getReportsByMonth);

dashboardRouter.get("/recent-report", authMiddleware, getRecentReports);

dashboardRouter.get("/today-report", authMiddleware, getTodayReports);

dashboardRouter.get("/user/overview", authMiddleware, getMyDashboardOverview);

dashboardRouter.get("/user/last-generated-report", authMiddleware, getMyLastGeneratedReport);

dashboardRouter.get("/user/report-by-month", authMiddleware, getMyReportsByMonth);

dashboardRouter.get("/user/recent-report", authMiddleware, getMyRecentReports);

dashboardRouter.get("/user/report-stats", authMiddleware, getMyReportStats);


export default dashboardRouter; 