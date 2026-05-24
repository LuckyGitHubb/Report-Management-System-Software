// Layout.jsx

import { useState } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header setIsOpen={setIsOpen} />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;  