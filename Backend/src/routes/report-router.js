import { Router } from "express";
import { createReport, getAllReports, getReportById, updateReport } from "../controllers/report-controllers.js";

const reportRouter = Router();

reportRouter.post("/", createReport);

reportRouter.get("/all", getAllReports);

reportRouter.get("/:id", getReportById);

reportRouter.put("/:id", updateReport);


export default reportRouter; 