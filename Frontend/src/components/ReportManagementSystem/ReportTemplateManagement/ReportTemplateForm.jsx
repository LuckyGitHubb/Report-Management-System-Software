import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { createReportTemplate } from "../../../services/api/reportTemplateApi";
import { useLocation } from "react-router-dom";

function ReportTemplateForm() {
    const [reportName, setReportName] = useState("");
    const [loading, setLoading] = useState(false);
    const { state } = useLocation();
    const [fields, setFields] = useState([
        {
            reportLabel: "",
            reportType: "text",
        },
    ]);

    useEffect(() => {
        if (state?.mode === "view") {
            setReportName(state?.item?.reportName)
            setFields(state?.item?.fields)
        }
        else {
            setReportName("")
            setFields([{
                reportLabel: "",
                reportType: "text",
            }])
        }
    }, [state])

    console.log('state: ', state)
    const handleAddField = () => {
        setFields([
            ...fields,
            {
                reportLabel: "",
                reportType: "text",
            },
        ]);
    };

    const handleRemoveField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const handleChange = (index, key, value) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value;
        setFields(updatedFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const payload = {
                reportName,
                // sectionTitle,
                fields,
            };
            await createReportTemplate(payload);
            //  toast.success("Report Template created successfully");
            //  setForm(INITIAL);
            //  navigate('/report/templates/all')
        } catch (e) {
            const msg = e?.response?.data?.message || "Failed to create report template";
            //  setSubmitError(msg);
            //  toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        // <div className="min-h-screen bg-gray-100 p-6">
        //   <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">

        <>

            {/* Header */}
            <div className="border-b px-8 py-5">
                <h1 className="text-3xl font-bold text-gray-800">
                    Create Report Template
                </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-8">

                {/* Report Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Report Name
                        </label>

                        <input
                            disabled={state?.mode === "view"}
                            type="text"
                            placeholder="Enter report name"
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Dynamic Fields */}
                <div>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-bold text-gray-800">
                            Report Fields
                        </h2>

                        {state?.mode !== "view" && (
                            <button
                                type="button"
                                onClick={handleAddField}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition"
                            >
                                <Plus size={18} />
                                Add Field
                            </button>
                        )}
                    </div>

                    <div className="space-y-5">
                        {fields.map((field, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-gray-50 border border-gray-200 p-5 rounded-2xl"
                            >

                                {/* Report Label */}
                                <div className={`${state?.mode === "view" ? "col-span-6" : "md:col-span-5"}`}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Report Label
                                    </label>

                                    <input
                                        disabled={state?.mode === "view"}
                                        type="text"
                                        placeholder="Enter label"
                                        value={field.reportLabel}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "reportLabel",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Report Type */}
                                <div className={`${state?.mode === "view" ? "col-span-6" : "md:col-span-5"}`}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Report Type
                                    </label>

                                    <select
                                        disabled={state?.mode === "view"}
                                        value={field.reportType}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "reportType",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="text">Text</option>
                                        <option value="number">Number</option>
                                        <option value="textarea">Textarea</option>
                                        <option value="date">Date</option>
                                    </select>
                                </div>

                                {/* Delete Button */}
                                {state?.mode !== "view" && (
                                    <div className="md:col-span-2 flex items-end">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveField(index)}
                                            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition"
                                        >
                                            <Trash2 size={18} />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                {state?.mode !== "view" && (
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
                        >
                            Save Report Template
                        </button>
                    </div>
                )}
            </form>
        </>
        // </div>
    );
}

export default ReportTemplateForm;