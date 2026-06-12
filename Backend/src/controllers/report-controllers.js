import { prisma } from "../config/db.js";
import generateUniqueCode from "../utilities/generate-unique-code.js";
import { earlyReturnRespone, errorResponse, successResponse } from "../utilities/response-handler.js";

const createReport = async (req, res) => {
  try {
    let { reportTemplateId, reportData, createdBy } = req.body;

    if (!reportTemplateId) {
      return earlyReturnRespone(res, "Template are required.", 400);
    }

    const template = await prisma.reportTemplate.findUnique({
      where: { id: reportTemplateId },
    });

    if (!template) {
      return earlyReturnRespone(res, " Report Template not found.", 404);
    }

    const code = await generateUniqueCode('report', 'RPT');
    const report = await prisma.report.create({
      data: {
        reportTemplateId,
        reportData,
        code,
        createdBy
      },
    });

    return successResponse(res, report, " Report created successfully.", 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    let { reportData } = req.body;

    const existing = await prisma.report.findUnique({
      where: { id },
    });

    if (!existing) {
      return earlyReturnRespone(res, " Report not found.", 404);
    }

    const updated = await prisma.report.update({
      where: { id },
      data: {
        reportData,
      },
    });

    return successResponse(res, updated, " Report updated successfully.", 200);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getAllReports = async (req, res) => {
  try {

    const reports = await prisma.report.findMany({
      include: {
        reportTemplate: {
          select: {
            id: true,
            reportName: true,
            fields: true
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(res, reports, " Reports fetched successfully.", 200);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return earlyReturnRespone(res, "Report ID is required.", 400);
    }

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        reportTemplate: {
          select: {
            id: true,
            reportName: true
          }
        }
      },
    });

    if (!report) {
      return earlyReturnRespone(res, " Report not found.", 404);
    }

    return successResponse(res, report, " Report fetched successfully.", 200);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export {
  createReport,
  getAllReports,
  updateReport,
  getReportById
}