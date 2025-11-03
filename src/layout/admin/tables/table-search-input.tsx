"use client"

import { HiMagnifyingGlass } from "react-icons/hi2"

interface TableSearchInputProps {
  searchTerm?: string
  onSearchChange: (value: string) => void
  onClearSearch?: () => void
  placeholder?: string
  className?: string
}

const TableSearchInput = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  placeholder = "Search...",
  className = "w-full",
}: TableSearchInputProps) => {
  return (
    <div className={` ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="text-base w-full bg-white text-[#444444] placeholder:text-[#444444] px-4 py-[12px] focus:outline-none border border-[#444444] rounded-[8px]  "
      />

    </div>
  )
}

export default TableSearchInput
