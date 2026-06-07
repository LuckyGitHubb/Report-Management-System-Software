import { Router } from "express";
import { createReportTemplate, getAllReportTemplates, getReportTemplateById, updateReportTemplate } from "../controllers/report-template-controllers.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const reportTemplateRouter = Router();

reportTemplateRouter.post("/template", authMiddleware, createReportTemplate);

reportTemplateRouter.get("/template/all", authMiddleware, getAllReportTemplates);

reportTemplateRouter.get("/template/:id", authMiddleware, getReportTemplateById);

reportTemplateRouter.put("/template/:id", authMiddleware, updateReportTemplate);

export default reportTemplateRouter