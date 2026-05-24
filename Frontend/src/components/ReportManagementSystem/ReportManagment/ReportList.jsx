import { Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAllReports } from "../../../services/api/reportApi";
import { useNavigate } from "react-router-dom";

function ReportList() {
  const [reportData, setReportData] = useState([])
  const navigate = useNavigate();

  const fetchAllReportData = async () => {
      try {
        const response = await fetchAllReports()
        const { data } = response?.data;
        setReportData(data)
      } catch (error) {
        console.log('error: ', error)
      }
    }

    useEffect(() => {
        fetchAllReportData()
      }, [])

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
            {reportData.length > 0 &&
            reportData.map((item,index)=>(
                <tr
                  key={item?.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    {item?.reportTemplate?.reportName}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">

                      {/* View */}
                      <button
                      onClick={()=> navigate('/report',{state: {mode: 'view', item}})}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Update */}
                      <button
                      onClick={()=> navigate('/report',{state: {mode: 'edit', item}})}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition"
                      >
                        <Pencil size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
            ))}
              
              
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ReportList;