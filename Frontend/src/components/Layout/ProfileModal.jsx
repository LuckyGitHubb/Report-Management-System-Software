import React from "react";
import { Mail, User, Shield, Hash } from "lucide-react";
import GlobalModal from "../Common/GlobalModal";

function ProfileModal({ isOpen, onClose, user }) {
  if (!user) return null;

  return (
    <GlobalModal
      isOpen={isOpen}
      onClose={onClose}
      heading="Profile Details"
    >
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <h3 className="mt-4 text-2xl font-bold text-gray-800">
          {user?.name}
        </h3>

        <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          {user?.role}
        </span>

        {/* User Details */}
        <div className="w-full mt-8 space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <Mail className="text-blue-500" size={20} />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <Hash className="text-purple-500" size={20} />
            <div>
              <p className="text-xs text-gray-500">Code</p>
              <p className="font-medium text-gray-800">
                {user?.code}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <Shield className="text-green-500" size={20} />
            <div>
              <p className="text-xs text-gray-500">Role</p>
              <p className="font-medium text-gray-800">
                {user?.role}
              </p>
            </div>
          </div>

          {/* <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <User className="text-orange-500" size={20} />
            <div>
              <p className="text-xs text-gray-500">User ID</p>
              <p className="font-medium text-gray-800 break-all text-sm">
                {user?.id}
              </p>
            </div>
          </div> */}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Close
        </button>
      </div>
    </GlobalModal>
  );
}

export default ProfileModal;