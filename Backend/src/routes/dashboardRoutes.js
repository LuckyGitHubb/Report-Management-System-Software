import { Router } from "express";
import { getDashboardOverview,
    getTopFiveReportTemplate,
    getReportsByMonth,
    getRecentReports } from "../controllers/dashboard-controllers.js";

const dashboardRouter = Router();

dashboardRouter.get("/overview", getDashboardOverview);

dashboardRouter.get("/top-five-stats", getTopFiveReportTemplate);

dashboardRouter.get("/report-by-month", getReportsByMonth);

dashboardRouter.get("/recent-report", getRecentReports);


export default dashboardRouter; 