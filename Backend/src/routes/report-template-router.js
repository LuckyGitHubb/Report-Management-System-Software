import { Router } from "express";
import { createReportTemplate, getAllReportTemplates, getReportTemplateById, updateReportTemplate } from "../controllers/report-template-controllers.js";

const reportTemplateRouter = Router();

reportTemplateRouter.post("/template", createReportTemplate);

reportTemplateRouter.get("/template/all", getAllReportTemplates);

reportTemplateRouter.get("/template/:id", getReportTemplateById);

reportTemplateRouter.put("/template/:id", updateReportTemplate);

export default reportTemplateRouter