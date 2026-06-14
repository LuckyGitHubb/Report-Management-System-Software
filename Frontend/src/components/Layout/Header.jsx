// components/layout/Header.jsx

import { Menu, Bell, User } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../services/api/authApi";
import ProfileModal from "./ProfileModal";

function Header({ setIsOpen }) {
  const { setUser,user } = useContext(AuthContext)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openProfile,setOpenProfile] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      const response = await authLogout();
      toast.success(response?.data?.message || `${user?.name} logout successfully`)
      setUser(null)
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (error) {
      toast.error('something went wrong')
      console.log('error: ', error)
    }
    finally {
      setLoading(false)
    }
  }
  console.log('user hai mera: ',user)
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
        <div className="relative">
  <div
    onClick={() => setShowDropdown(!showDropdown)}
    className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer"
  >
    <User size={18} />
  </div>

  {showDropdown && (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => setShowDropdown(false)}
      />

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
        <div className="px-4 py-3 border-b">
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-gray-500">
            {user?.role?.toLowerCase()}
          </p>
        </div>

        <button
          onClick={() => {
            setOpenProfile(true);
            setShowDropdown(false);
          }}
          className="w-full text-left px-4 py-3 hover:bg-gray-100"
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </>
  )}
</div>
      </div>

      <ProfileModal
    isOpen={openProfile}
    onClose={() => setOpenProfile(false)}
    user={user}
  />

    </header>
  );
}

export default Header;