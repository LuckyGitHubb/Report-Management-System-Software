// components/layout/Sidebar.jsx

import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
} from "lucide-react";

import { Link } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/",
  },
  {
    name: "Create Report",
    icon: <FileText size={20} />,
    path: "/report",
  },
  {
    name: "Reports",
    icon: <FileText size={20} />,
    path: "/reports",
  },
  {
    name: "Create Report Template",
    icon: <FileText size={20} />,
    path: "/report/template",
  },
  {
    name: "Report Templates",
    icon: <FileText size={20} />,
    path: "/report/templates",
  },
];

function Sidebar({ isOpen }) {
  return (
    <aside
  className={`bg-white border-r shadow-sm transition-all duration-300 ${
    isOpen ? "w-64" : "w-20"
  } min-h-screen`}
> 
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b">
        {isOpen ? (
          <h1 className="text-2xl font-bold text-blue-600">
            RMS
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-blue-600">
            R
          </h1>
        )}
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
          >
            {item.icon}

            {isOpen && (
              <span className="text-sm font-medium">
                {item.name}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;