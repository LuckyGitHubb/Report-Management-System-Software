import React, { useState } from 'react'
import { Loader } from '../../../Common/Loader/Loader'
import { ChartHeader, ReportsByMonthChart, StatCard, TopFiveReportPieChart } from '../Components/UserDashboardComponents'
import { monthTypes } from '../../../../constants/monthTypes'
import useUserDashboard from '../../../../hooks/useUserDashboard'

function UserDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(5)
  const { loading,
    dashboardOverview,
    lastGeneratedReport,
    monthlyReports,
    recentReports,
    todayReports,
    fetchDashboardData, } = useUserDashboard(selectedMonth)
  if (loading) return <Loader />
  
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <StatCard
    title="Total Reports"
    value={todayReports?.totalReports || 0}
  />

  <StatCard
    title="Monthly Reports"
    value={todayReports?.monthlyReports || 0}
  />

  <StatCard
    title="Weekly Reports"
    value={todayReports?.weeklyReports || 0}
  />

  <StatCard
    title="My Reports Count"
    value={dashboardOverview || 0}
  />
</div>

      <div className="grid gap-10 my-12">
        
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
  <ChartHeader
    title="Last Generated Report"
    subtitle="Most recently created report"
  />

  <div className="mt-4">
    <h3 className="text-lg font-semibold">
      {lastGeneratedReport?.reportTemplate?.reportName || "No Report"}
    </h3>

    <p className="text-gray-500 text-sm">
      Report Code: {lastGeneratedReport?.code}
    </p>

    <p className="text-gray-500 text-sm">
      Created:
      {lastGeneratedReport?.createdAt &&
        new Date(
          lastGeneratedReport.createdAt
        ).toLocaleString()}
    </p>
  </div>
</div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
  <ChartHeader
    title="Reports Generated This Month"
    subtitle="Selected month report count"
  />

  <div className="flex justify-end mb-4">
    <select
      value={selectedMonth}
      onChange={(e) =>
        setSelectedMonth(Number(e.target.value))
      }
      className="border rounded-lg px-3 py-2"
    >
      {monthTypes.map((month) => (
        <option
          key={month.value}
          value={month.value}
        >
          {month.label}
        </option>
      ))}
    </select>
  </div>

  <div className="text-center py-10">
    <h1 className="text-6xl font-bold text-blue-600">
      {monthlyReports?.reportCount || 0}
    </h1>

    <p className="text-gray-500 mt-2">
      Reports Generated
    </p>
  </div>
</div>

<div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
  <ChartHeader
    title="Recent Reports"
    subtitle="Last 10 generated reports"
  />

  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left p-3">Code</th>
          <th className="text-left p-3">Created</th>
        </tr>
      </thead>

      <tbody>
        {recentReports?.map((report) => (
          <tr
            key={report.id}
            className="border-b"
          >
            <td className="p-3">{report.code}</td>

            <td className="p-3">
              {new Date(
                report.createdAt
              ).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      </div>
    </div>
  )
}

export default UserDashboard