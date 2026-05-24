import { prisma } from "../config/db.js";
import { earlyReturnRespone, errorResponse, successResponse } from "../utilities/response-handler.js";

const createReportTemplate = async (req, res) => {
  try {
    const { reportName, fields } = req.body;

    if (!reportName) {
      return earlyReturnRespone(res, "Report Name is required.", 400);
    }

    if (!fields || !fields.length) {
      return earlyReturnRespone(res, "Fields are required.", 400);
    }

    const reportTemplate = await prisma.reportTemplate.create({
      data: {
        reportName,
        fields,
      },
    });

    return successResponse(
      res,
      reportTemplate,
      "Medical Report Template created successfully.",
      201
    );

  } catch (error) {
    return errorResponse(res, error);
  }
};

const updateReportTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const { reportName, fields } = req.body;

        const existing = await prisma.reportTemplate.findUnique({ where: { id } });

        if (!existing) {
            return earlyReturnRespone(res, "Medical Report Template not found.", 404);
        }

        const updated = await prisma.reportTemplate.update({
            where: { id },
            data: {
                reportName,
                fields,
            },
        });

        return successResponse(res, updated, "Medical Report Template updated successfully.", 200);
    } catch (error) {
        return errorResponse(res, error);
    }
};

const getAllReportTemplates = async (req, res) => {
    try {
        const reportTemplates = await prisma.reportTemplate.findMany({})
        return successResponse(res, reportTemplates, "Medical Report Templates fetched successfully.", 200);
    }
    catch (error) {
        return errorResponse(res, error);
    }
}

const getReportTemplateById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return earlyReturnRespone(
                res,
                "id is required.",
                400
            );
        }

        const reportTemplate = await prisma.reportTemplate.findUnique({
            where: { id },      
        });

        if (!reportTemplate) {
            return earlyReturnRespone(
                res,
                "Medical Report Template not found.",
                404
            );
        }

        return successResponse(
            res,
            reportTemplate,
            "Medical Report Template fetched successfully.",
            200
        );
    } catch (error) {
        return errorResponse(res, error);
    }
};

export {
  createReportTemplate,
  getAllReportTemplates,
  updateReportTemplate,
  getReportTemplateById
}