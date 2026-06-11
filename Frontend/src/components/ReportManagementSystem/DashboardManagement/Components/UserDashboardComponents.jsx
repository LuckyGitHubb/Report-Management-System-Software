import { UsersRound } from 'lucide-react';
import {
    Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';

export const ChartHeader = ({ title, subtitle }) => {
    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
                {title}
            </h2>

            {subtitle && (
                <p className="text-sm text-gray-500 mt-1">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export const StatCard = ({ title, value }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <UsersRound className="text-blue-600" size={22} />
            </div>

            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h2 className="text-2xl font-bold text-gray-900">
                    {value}
                </h2>
            </div>
        </div>
    </div>
)

export const TopFiveReportPieChart = ({ data }) => {
    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#AF19FF",
    ];
    const chartData = data.length > 0 ? data?.map((item, i) => ({
        name: item?.reportName,
        value: item?.usageCount
    })) : []
    return (
        <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value, name) => [value, name]}
                    />
                    {/* <Legend /> */}
                </PieChart>
            </ResponsiveContainer>
        </div >
    )
}


export const ReportsByMonthChart = ({ data }) => {
    const chartData =
        data?.length > 0
            ? data.map((item) => ({
                name: item.reportName,
                count: item.reportCount,
            }))
            : [];

    return (
        <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="name"
                        angle={-20}
                        textAnchor="end"
                        height={70}
                    />

                    <YAxis />

                    <Tooltip
                        formatter={(value) => [`${value}`, "Reports"]}
                    />

                    <Bar
                        dataKey="count"
                        fill="#0088FE"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};