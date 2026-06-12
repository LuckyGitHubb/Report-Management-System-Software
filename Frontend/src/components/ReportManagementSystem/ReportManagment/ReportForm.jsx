import React, { useContext, useEffect, useState } from 'react'
import { fetchAllReportTemplates } from '../../../services/api/reportTemplateApi'
import { useLocation, useNavigate } from 'react-router-dom'
import ReportPDF from './ReportPDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { toast } from 'react-toastify'
import { createReport, updateReport } from '../../../services/api/reportApi'
import { AuthContext } from '../../../context/AuthProvider'

const INITIAL = {
  reportTemplateId: "",
  reportData: []
}

function ReportForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(INITIAL)
  const [reportTemplateData, setReportTemplateData] = useState([])
  const [templateFields, setTemplateFields] = useState([])
  const [reportData, setReportData] = useState([])
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  console.log('user: ',user)

  console.log('user: ', user)

  const fetchAllReportTemplateData = async () => {
    try {
      const response = await fetchAllReportTemplates()
      const { data } = response?.data;
      setReportTemplateData(data)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    fetchAllReportTemplateData()
  }, [])

  useEffect(() => {
    if (form?.reportTemplateId != "") {
      setReportData(reportTemplateData.find((e) => e?.id === form?.reportTemplateId))
    }
  }, [form?.reportTemplateId])

  useEffect(() => {

    if (state?.mode === "edit" || state?.mode === "view" && state?.item) {

      setForm({
        reportTemplateId: state?.item?.reportTemplate?.id || "",
        reportData: state?.item?.reportData || []
      })

      setTemplateFields(state?.item?.reportTemplate?.fields || [])

    } else {

      setForm(INITIAL)
      setTemplateFields([])
      setReportData([])

    }

  }, [state])

  const handleChange = (index, label, value) => {
    const updatedReportData = [...form.reportData]

    updatedReportData[index] = { label, value }
    setForm({
      ...form,
      reportData: updatedReportData 
    })
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form, createdBy: user.id };
      const response = await state?.mode === "edit" ?
        updateReport(payload, state?.item?.id) : createReport(payload);
        toast.success(response?.data?.message || 'report created successfully')
      setTimeout(() => {
        navigate('/reports')
      }, 1000)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'something went wrong')
      console.log('error: ', error)
    }
    finally {
      setLoading(false)
    }
  }

  const reports = reportData?.fields || form?.reportData

  return (
    <div>
      {state?.mode === "view" ? (
        <div className="flex items-center justify-between border-b px-8 py-5 bg-white">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Create Report
            </h1>
          </div>

          <div>
            <PDFDownloadLink
              document={<ReportPDF item={state?.item} />}
              fileName="report.pdf"
            >
              {({ loading }) => (
                <button
                  className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white px-5 py-2 rounded-lg font-medium shadow-sm"
                >
                  {loading ? "Generating PDF..." : "Download PDF"}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      ) : (
        <div className="border-b px-8 py-5">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Report
          </h1>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-8">

        {/* Report Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Report Name
            </label>

            <select
              disabled={state?.mode === "edit" || state?.mode === "view"}
              value={form.reportTemplateId}
              onChange={(e) => setForm({ ...form, reportTemplateId: e?.target?.value })}
              className={`w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${state?.mode === "edit" && "bg-gray-300"}`}
            >
              <option disabled value="">Select Report </option>
              {reportTemplateData.map((item, i) => (
                <option key={item?.id} value={item?.id}>
                  {item?.reportName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          {reports?.length > 0 &&
            reports.map((report, index) => {
              switch (report?.reportType || templateFields[index]?.reportType) {
                case 'textarea':
                  return (
                    <div key={index} className="">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {report?.reportLabel || report?.label}
                      </label>

                      <textarea
                        // type={report?.type}
                        placeholder={`Enter ${report?.reportLabel || report?.label}`}
                        disabled={state?.mode === "view"}
                        rows={5}
                        cols={10}
                        value={form?.reportData[index]?.value}
                        onChange={(e) =>
                          handleChange(
                            index,
                            report?.reportLabel || report?.label,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )
                default:
                  return (
                    <div key={index} className="">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {report?.reportLabel || report?.label}
                      </label>

                      <input
                        disabled={state?.mode === "view"}
                        type={report?.reportType || templateFields[index]?.reportType}
                        placeholder={`Enter ${report?.reportLabel || report?.label}`}
                        value={form?.reportData[index]?.value}
                        onChange={(e) =>
                          handleChange(
                            index,
                            report?.reportLabel || report?.label,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )
              }
            }
            )}
        </div>

        {/* Submit Button */}
        {state?.mode !== "view" && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-semibold shadow-md transition text-white
                ${loading
                  ? "bg-blue-400 cursor-not-allowed opacity-60 blur-[1px]"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Saving Report..." : "Save Report"}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default ReportForm