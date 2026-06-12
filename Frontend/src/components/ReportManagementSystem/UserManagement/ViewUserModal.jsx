import React from "react";
import GlobalModal from "../../Common/GlobalModal";

function ViewUserModal({ isOpen, onClose, user }) {
  if (!user) return null;

  return (
    <GlobalModal
      isOpen={isOpen}
      onClose={onClose}
      heading="User Details"
    >
      <div className="space-y-4">
        <div>
          <label className="font-semibold text-gray-600">Code</label>
          <p className="mt-1">{user.code}</p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">Name</label>
          <p className="mt-1">{user.name}</p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">Email</label>
          <p className="mt-1">{user.email}</p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">Role</label>
          <p className="mt-1">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                user.role === "ADMIN"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {user.role}
            </span>
          </p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">Created At</label>
          <p className="mt-1">
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">Updated At</label>
          <p className="mt-1">
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </GlobalModal>
  );
}

export default ViewUserModal;