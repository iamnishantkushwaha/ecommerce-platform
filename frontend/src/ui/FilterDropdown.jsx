import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";



export default function FilterDropdown({ onChange ,options}) {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState(options[0].label);

  const handleSelect = (item) => {
    setSelected(item.label);
    setOpen(false);

    // send value to parent (for API / sorting)
    onChange && onChange(item.value);
  };

  return (
    <div className="relative w-56">
      
      {/* Selected box */}
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center px-4 py-2 border rounded-lg bg-white cursor-pointer"
      >
        <span>{selected}</span>
        <FiChevronDown className={`${open ? "rotate-180" : ""} transition`} />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-md z-10">
          {options.map((item) => (
            <div
              key={item.label}
              onClick={() => handleSelect(item)}
              className={`px-4 py-2 cursor-pointer hover:bg-indigo-200 ${
                selected === item.label ? "bg-indigo-600 text-white" : ""
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}