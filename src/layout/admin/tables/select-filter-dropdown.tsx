"use client"

import { FaChevronDown } from "react-icons/fa" // Using react-icons for the dropdown icon

interface SelectFilterDropdownProps {
  label: string
  value: string // The currently selected option value (e.g., "Fruits", "Vegetables", or "" for "All")
  options: string[] // All available options, including "" for "All"
  onValueChange: (value: string) => void
}

export function SelectFilterDropdown({ label, value, options, onValueChange }: SelectFilterDropdownProps) {
  const allOptionExists = options.includes("")
  const displayOptions = allOptionExists ? options : [ ...options] 

  return (
    <div className="relative inline-block">
      <select
        
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="block w-full px-3 py-2 pr-8 text-gray-500 bg-white border border-[#131364] rounded-md  appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px] cursor-pointer"
      >
        {displayOptions.map((option) => (
          <option key={option === "" ? "all" : option} value={option}>
            {option === "" ? `${label}: All` : `${label}: ${option}`}
            {/* {`${label}: ${option}`} */}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#131364]">
        <FaChevronDown className="h-4 w-4 text-[#131364]" />
      </div>
    </div>
  )
}
