import { Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAllReports } from "../../../services/api/reportApi";
import { useNavigate } from "react-router-dom";
import { fetchAllReportTemplates } from "../../../services/api/reportTemplateApi";
import { Loader } from "../../Common/Loader/Loader";

function ReportTemplateList() {
  const [reportTemplateData, setReportTemplateData] = useState([])
  const [loading,setLoading] = useState(false)
  const [paginatedReportTemplateData, setPaginatedReportTemplateData] = useState([])
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState("")
  const navigate = useNavigate();

  const fetchAllReportTemplateData = async () => {
    setLoading(true)
      try {
        const response = await fetchAllReportTemplates()
        const { data } = response?.data;
        setReportTemplateData(data)
        setPaginatedReportTemplateData(data)
      } catch (error) {
        console.log('error: ', error)
      }
      finally{
        setLoading(false)
      }
    }

    useEffect(() => {
        fetchAllReportTemplateData()
      }, [])

    useEffect(() => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  setPaginatedReportTemplateData(
    reportTemplateData.slice(startIndex, endIndex)
  );
}, [reportTemplateData, currentPage, pageSize]);  

const handlePageChange = (page)=>{
  setCurrentPage(page)
}

if(loading) return <Loader/>

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="border-b px-8 py-5">
        <h1 className="text-3xl font-bold text-gray-800">
          All Medical Reports
        </h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Sr No.
              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Report Name
              </th>

              <th className="text-center px-6 py-4 font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedReportTemplateData.length > 0 &&
            paginatedReportTemplateData.map((item,index)=>(
                <tr
                  key={item?.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    {item?.reportName}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">

                      {/* View */}
                      <button
                      onClick={()=> navigate('/report/template',{state: {mode: 'view', item}})}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                      >
                        <Eye size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
            ))}
              
              
          </tbody>

        </table>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2 p-10">
  {/* Page Size Selector */}
  <div>
    <select
      onChange={(e) => setPageSize(Number(e.target.value))}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="5">5 per page</option>
      <option value="10">10 per page</option>
      <option value="20">20 per page</option>
      <option value="50">50 per page</option>
    </select>
  </div>

  {/* Pagination */}
  <div className="flex items-center gap-2">
    {/* {totalPage?.length > 0 && */}
      {(Array(Math.ceil(reportTemplateData.length / pageSize)).fill(null)).map((_, i) => (
        <button
          key={i}
          onClick={()=>handlePageChange(i+1)}
          className={`w-9 h-9 flex items-center justify-center rounded-md border cursor-pointer ${
        currentPage === i + 1
          ? "bg-blue-500 text-white border-blue-500"
          : "border-gray-300 bg-white text-gray-700"
      }`}
        >
          {i + 1}
        </button>
      ))}
  </div>
</div>

      </div>
    </div>
  );
}

export default ReportTemplateList;