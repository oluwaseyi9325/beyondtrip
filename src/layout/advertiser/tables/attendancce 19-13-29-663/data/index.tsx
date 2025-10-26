import { TableColumn } from "react-data-table-component";

import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";
import Dropdown from "@/components/dropdown";
import { TAttendance } from "..";


export const attendanceColumns = (
  onViewCourse: (course: TAttendance) => void,
  onUploadMaterials: (course: TAttendance) => void
): TableColumn<TAttendance>[] => [
  {
    name: "S/N",
    width: "5%",
    // cell: (_, index: number) => index + 1,
    cell: ()=> <input type="checkbox"/>,

  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Date",
    width: "25%",
    selector: (row) => row.date
  },
  {
    name: "Time",
    width: "25%",
    selector: (row) => row.time,
  },
  {
    name: "Average Score(%)",
    selector: (row) => row.averageScore,
  },
  {
    name: "Status",
    cell: (row) => (
      <div
        className={clsx(
          "border text-sm font-[500] rounded-md px-3 py-[2px]",
          row.status === "Active" &&
            "bg-[#CBFFE5] border-[#CBFFE5] text-[#018844]",
          row.status === "Inactive" &&
            "bg-[#CDCDCD] border-[#CDCDCD] text-white"
        )}
      >
        {row.status}
      </div>
    ),
  },
  {
    name: "",
    width: "7%",
    cell: (row) => (
      <Dropdown className="w-[80px]" position="-left-26">
        <div className="cursor-pointer">
          <AiOutlineMore size={24} />
        </div>

        <div className="w-[185px] bg-[#FAFAFA] border-[#EEEEEE] rounded-md shadow-xl py-1">
          <div
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => onViewCourse(row)}
          >
            <span className="text-sm text-gray-700">Award Score</span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => onUploadMaterials(row)}
          >
            <span className="text-sm text-gray-700">View Attendance</span>
          </div>
          
        </div>
      </Dropdown>
    ),
  },
];



export const attendanceData: TAttendance[] = [
   
  {
    name: "Seyi Adedokun",
    date: "May 14, 2026",
    time: "34:35",
    averageScore: "67%",
    status:"Active"
  },
  {
    name: "Seyi Adedokun",
    date: "May 14, 2026",
    time: "34:35",
    averageScore: "67%",
    status:"Active"
  },
  {
    name: "Seyi Adedokun",
    date: "May 14, 2026",
    time: "34:35",
    averageScore: "67%",
    status:"Active"
  },
  {
    name: "Seyi Adedokun",
    date: "May 14, 2026",
    time: "34:35",
    averageScore: "67%",
    status:"Active"
  }
  
  
];
