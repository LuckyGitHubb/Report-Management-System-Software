// components/layout/Header.jsx

import { Menu, Bell, User } from "lucide-react";

function Header({ setIsOpen }) {
  return (
    <header className="h-16 bg-white border-b shadow-sm px-6 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-700">
          Dashboard
        </h2>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} />

          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
            <User size={18} />
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium">Lucky</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;