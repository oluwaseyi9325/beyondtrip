"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { FiCalendar } from "react-icons/fi"; // using React Icons

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  onDateChange?: (dates: { startDate?: Date; endDate?: Date }) => void;
}

const DateSort = ({ onDateChange }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartChange = (date: Date | null) => {
    setStartDate(date);
    onDateChange?.({ startDate: date || undefined, endDate: endDate || undefined });
  };

  const handleEndChange = (date: Date | null) => {
    setEndDate(date);
    onDateChange?.({ startDate: startDate || undefined, endDate: date || undefined });
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onDateChange?.({ startDate: undefined, endDate: undefined });
  };

  return (
    <div className="flex w-full items-center flex-wrap gap-3 ">
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Sort date:
      </span>

      {/* Start Date */}
      <div className="relative">
        <DatePicker
          selected={startDate}
          onChange={handleStartChange}
          placeholderText="DD/MM/YYYY"
          dateFormat="dd/MM/yyyy"
          className="w-[140px] border border-gray-300 rounded-md px-5 py-3 text-sm outline-none focus:border-gray-500"
        />
        <FiCalendar className="absolute right-2 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      {/* End Date */}
      <div className="relative">
        <DatePicker
          selected={endDate}
          onChange={handleEndChange}
          placeholderText="DD/MM/YYYY"
          dateFormat="dd/MM/yyyy"
          className="w-[140px] border border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:border-gray-500"
        />
        <FiCalendar className="absolute right-2 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      {/* Clear Button */}
      <button
        onClick={handleClear}
        className="text-blue-600 whitespace-nowrap hover:underline text-sm"
      >
        Clear filters
      </button>
    </div>
  );
};

export default DateSort;
