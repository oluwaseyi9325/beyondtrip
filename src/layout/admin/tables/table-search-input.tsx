"use client"

import { HiMagnifyingGlass } from "react-icons/hi2"

interface TableSearchInputProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onClearSearch: () => void
  placeholder?: string
  className?: string
}

const TableSearchInput = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  placeholder = "Search...",
  className = "w-80",
}: TableSearchInputProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <HiMagnifyingGlass className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 border border-[#131364] rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#131364] focus:border-[#131364]"
      />
      {searchTerm && (
        <button
          onClick={onClearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default TableSearchInput
