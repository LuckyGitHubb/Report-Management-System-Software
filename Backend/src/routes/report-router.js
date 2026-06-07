import { Router } from "express";
import { createReport, getAllReports, getReportById, updateReport } from "../controllers/report-controllers.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const reportRouter = Router();

reportRouter.post("/", authMiddleware, createReport);

reportRouter.get("/all", authMiddleware, getAllReports);

reportRouter.get("/:id", authMiddleware, getReportById);

reportRouter.put("/:id", authMiddleware, updateReport);


export default reportRouter; 