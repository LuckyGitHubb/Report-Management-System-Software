import { prisma } from "../config/db.js"
import { errorResponse, successResponse } from "../utilities/response-handler.js"

const getDashboardOverview = async (req, res) => {
    try {
        const [reportTemplates, reports, users] = await Promise.all([
            prisma.reportTemplate.count(),
            prisma.report.count(),
            prisma.user.count(),
        ])
        const dashboardData = {
            reportTemplatesCount: reportTemplates,
            reportsCount: reports,
            usersCount: users,
        }
        return successResponse(
            res,
            dashboardData,
            "dashboard overview data fetched successfully"
        )
    } catch (error) {
        return errorResponse(res, error);
    }
}

const getTopFiveReportTemplate = async (req, res) => {
    try {
        const topTemplates = await prisma.report.groupBy({
            by: ["reportTemplateId"],
            _count: {
                reportTemplateId: true,
            },
            orderBy: {
                _count: {
                    reportTemplateId: "desc",
                },
            },
            take: 5,
        });

        const result = await Promise.all(
            topTemplates.map(async (item) => {
                const template = await prisma.reportTemplate.findUnique({
                    where: {
                        id: item.reportTemplateId,
                    },
                    select: {
                        id: true,
                        reportName: true,
                        createdAt: true,
                    },
                });

                return {
                    ...template,
                    usageCount: item._count.reportTemplateId,
                };
            })
        );

        return successResponse(
            res,
            result,
            "Top report templates fetched successfully"
        );
    } catch (error) {
        return errorResponse(res, error);
    }
};

const getReportsByMonth = async (req, res) => {
    try {
        const month = Number(req.query.month); // 1-12

        const currentYear = new Date().getFullYear();

        const startDate = new Date(currentYear, month - 1, 1);
        const endDate = new Date(currentYear, month, 1);

        const reportCounts = await prisma.report.groupBy({
            by: ["reportTemplateId"],
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            _count: {
                id: true,
            },
        });

        const templates = await prisma.reportTemplate.findMany({
            where: {
                id: {
                    in: reportCounts.map((r) => r.reportTemplateId),
                },
            },
            select: {
                id: true,
                reportName: true,
            },
        });

        const result = templates.map((template) => {
            const countData = reportCounts.find(
                (r) => r.reportTemplateId === template.id
            );

            return {
                templateId: template.id,
                reportName: template.reportName,
                reportCount: countData?._count?.id || 0,
            };
        });

        return successResponse(res, result, "Report template and Reports fecthed successfully by month");
    } catch (error) {
        return errorResponse(res, error);
    }
};

const getRecentReports = async (req, res) => {
    try {
        const recentReports = await prisma.report.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });
        return successResponse(res, recentReports, "Recent Reports fecthed successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

const getTodayReports = async (req, res) => {
    try {
        const today = new Date();

        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
        );

        const reportsCount = await prisma.report.count({
            where: {
                createdAt: {
                    gte: startOfDay,
                    lt: endOfDay,
                },
            },
        });

        return successResponse(
            res,
            { reportsCount },
            "Today's reports fetched successfully"
        );
    } catch (error) {
        return errorResponse(res, error);
    }
};

// User Dashboard APIs
const getMyDashboardOverview = async (req,res) => {
    try {
        const userId = req.user.id;
        const reportsCount = await prisma.report.count({
            where: { createdBy: userId }
        })
        return successResponse(res, reportsCount, "Report Counts fecthed successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

const getMyRecentReports = async (req, res) => {
    try {
        const userId = req.user.id;

        const reports = await prisma.report.findMany({
            where: {
                createdBy: userId
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 10
        });

        return successResponse(
            res,
            reports,
            "Recent reports fetched successfully"
        );
    } catch (error) {
        return errorResponse(res, error);
    }
};


const getMyReportsByMonth = async (req, res) => {
    try {
        const userId = req.user.id;
        const month = Number(req.query.month);

        const currentYear = new Date().getFullYear();

        const startDate = new Date(currentYear, month - 1, 1);
        const endDate = new Date(currentYear, month, 1);

        const reportCount = await prisma.report.count({
            where: {
                createdBy: userId,
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        return successResponse(
            res,
            { reportCount },
            "Monthly reports fetched successfully"
        );
    } catch (error) {
        return errorResponse(res, error);
    }
};

const getMyReportStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const now = new Date();

        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );

        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());

        const [totalReports, monthlyReports, weeklyReports] =
            await Promise.all([
                prisma.report.count({
                    where: {
                        createdBy: userId,
                    },
                }),
                prisma.report.count({
                    where: {
                        createdBy: userId,
                        createdAt: {
                            gte: startOfMonth,
                        },
                    },
                }),
                prisma.report.count({
                    where: {
                        createdBy: userId,
                        createdAt: {
                            gte: startOfWeek,
                        },
                    },
                }),
            ]);

        return successResponse(
            res,
            {
                totalReports,
                monthlyReports,
                weeklyReports,
            },
            "Report statistics fetched successfully"
        );
    } catch (error) {
        return errorResponse(res, error);
    }
};

const getMyLastGeneratedReport = async (req, res) => {
    try {
        const userId = req.user.id;

        const report = await prisma.report.findFirst({
            where: {
                createdBy: userId,
            },
            include: {
                reportTemplate: {
                    select: {
                        reportName: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return successResponse(
            res,
            report,
            "Last generated report fetched successfully"
        );
    } catch (error) {
        return errorResponse(res, error);
    }
};

export {
    getDashboardOverview,
    getTopFiveReportTemplate,
    getReportsByMonth,
    getRecentReports,
    getTodayReports,
    getMyDashboardOverview,
    getMyLastGeneratedReport,
    getMyRecentReports,
    getMyReportStats,   
    getMyReportsByMonth,
}