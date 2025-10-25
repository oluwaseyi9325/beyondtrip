"use client"

import { useState, useMemo } from "react"

// interface UseTableSearchProps<T> {
//   data: T[] | undefined
//   searchFields: (keyof T | ((item: T) => string))[]
// }

export function useTableSearch({ data, searchFields }: any) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = useMemo(() => {
    if (!data) return []

    if (!searchTerm.trim()) {
      return data
    }

    const searchLower = searchTerm.toLowerCase()

    return data.filter((item:any) => {
      return searchFields.some((field:any) => {
        let value: string

        if (typeof field === "function") {
          value = field(item)
        } else {
          value = String(item[field] || "")
        }

        return value.toLowerCase().includes(searchLower)
      })
    })
  }, [data, searchTerm, searchFields])

  const clearSearch = () => {
    setSearchTerm("")
  }

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    clearSearch,
    hasResults: filteredData.length > 0,
    totalResults: filteredData.length,
  }
}
