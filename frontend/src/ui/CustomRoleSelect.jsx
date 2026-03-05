import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const roles = [
  { id: "USER", label: "USER" },
  { id: "VENDOR", label: "VENDOR" },
  { id: "ADMIN", label: "ADMIN" },
];

function CustomRoleSelect({ role, setRole }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedRole) => {
    setRole(selectedRole);
    setOpen(false);
  };

  return (
    <div className="w-64 relative">
      <label className="block mb-1 font-semibold">Role</label>

      {/* Dropdown button */}
      <div
        className="border border-gray-300 rounded px-3 py-2 flex justify-between items-center cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        <span>{role || "Select a role"}</span>
        <IoMdArrowDropdown className="text-gray-500" />
      </div>

      {/* Dropdown list */}
      {open && (
        <div className="absolute w-full mt-1 border rounded bg-white shadow-lg z-10">
          {roles.map((r) => (
            <div
              key={r.id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(r.label)}
            >
              {r.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomRoleSelect;