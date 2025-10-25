"use client"

import type { ReactNode } from "react"

interface InfoSectionProps {
  title: string
  editText?: string
  onEdit?: () => void
  children: ReactNode
  className?: string
}

export function InfoSection({ title, editText = "Edit", onEdit, children, className = "" }: InfoSectionProps) {
  return (
    <div className={`bg-[#F8F8F8] rounded-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 text-sm font-normal hover:underline">
          {editText}
        </button>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  )
}
