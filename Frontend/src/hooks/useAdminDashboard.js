import { useEffect, useState } from "react"
import { fetchDashboardOverview, fetchMonthlyReports, fetchRecentReports, fetchTopReportTemplates } from "../services/api/dashboardApi"

const useDashboard = (month)=>{
const[loading,setLoading] = useState(false)
const [dashboardOverview,setDashboardOverview] = useState([])
const [topReportTemplates,setTopReportTemplates] = useState([])
const [monthlyReports,setMonthlyReports] = useState([])
const [recentReports,setRecentReports] = useState([])

const fetchDashboardOverviewData = async()=>{
    try {
        const res = await fetchDashboardOverview()
        setDashboardOverview(res?.data?.data)
    } catch (error) {
        console.log('error: ',error)
        setDashboardOverview([])
    }
}
const fetchTopReportTemplatesData = async()=>{
    try {
        const res = await fetchTopReportTemplates()
        setTopReportTemplates(res?.data?.data)
    } catch (error) {
        console.log('error: ',error)
        setTopReportTemplates([])
    }
}
const fetchMonthlyReportsdata = async(month)=>{
    try {
        const res = await fetchMonthlyReports(month)
        setMonthlyReports(res?.data?.data)
    } catch (error) {
        console.log('error: ',error)
        setMonthlyReports([])
    }
}
const fetchRecentReportsData = async()=>{
    try {
        const res = await fetchRecentReports()
        setRecentReports(res?.data?.data)
    } catch (error) {
        console.log('error: ',error)
        setRecentReports([])
    }
}   

const fetchDashboardData = async()=>{
    setLoading(true)
    try {
        const res = await Promise.all([
        fetchDashboardOverviewData(),
        fetchTopReportTemplatesData(),
        fetchMonthlyReportsdata(month),
        fetchRecentReportsData(),
        ])
    }
    finally{
        setLoading(false)
    }
}

useEffect(()=>{
    fetchDashboardData()
},[month])

return(
    { loading,
        dashboardOverview,
        topReportTemplates,
        monthlyReports,
        recentReports,
        fetchDashboardData }
    )
}

export default useDashboard;