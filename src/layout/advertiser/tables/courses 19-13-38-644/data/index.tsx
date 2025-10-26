import { TableColumn } from "react-data-table-component";

import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";
import { TCourses } from "..";
import Dropdown from "@/components/dropdown";


export const coursesColumns = (
  onViewCourse: (course: TCourses) => void,
  onUploadMaterials: (course: TCourses) => void
): TableColumn<TCourses>[] => [
  {
    name: "S/N",
    width: "5%",
    cell: (_, index: number) => index + 1,
  },
  {
    name: "Course Name",
    selector: (row) => row.course_name,
  },
  {
    name: "Course Code",
    width: "25%",
    selector: (row) => row.course_code,
  },
  {
    name: "Instructor",
    width: "25%",
    selector: (row) => row.instructor,
  },
  {
    name: "Date Created",
    selector: (row) => row.date_created,
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
            <span className="text-sm text-gray-700">View Details</span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => onUploadMaterials(row)}
          >
            <span className="text-sm text-gray-700">Upload Materials</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100">
            <span className="text-sm text-red-600">Deactivate Course</span>
          </div>
        </div>
      </Dropdown>
    ),
  },
];



export const courseData: TCourses[] = [
  {
    course_name: "Product Management",
    course_code: "PM101",
    instructor: "Abudu Damilola",
    date_created: "April 28, 2025",
    status: "Active",
  },
  {
    course_name: "Web Development",
    course_code: "WD202",
    instructor: "Jane Doe",
    date_created: "May 15, 2025",
    status: "Inactive",
  },
  {
    course_name: "Data Science",
    course_code: "DS303",
    instructor: "John Smith",
    date_created: "June 10, 2025",
    status: "Active",
  },
  {
    course_name: "Machine Learning",
    course_code: "ML404",
    instructor: "Alice Johnson",
    date_created: "July 22, 2025",
    status: "Active",
  },
  {
    course_name: "Cybersecurity",
    course_code: "CS505",
    instructor: "Bob Brown",
    date_created: "August 30, 2025",
    status: "Inactive",
  },
  {
    course_name: "Digital Marketing",
    course_code: "DM606",
    instructor: "Charlie Davis",
    date_created: "September 12, 2025",
    status: "Active",
  },
  {
    course_name: "Graphic Design",
    course_code: "GD707",
    instructor: "Eve White",
    date_created: "October 5, 2025",
    status: "Inactive",
  },
  {
    course_name: "Blockchain Technology",
    course_code: "BT808",
    instructor: "Frank Green",
    date_created: "November 18, 2025",
    status: "Active",
  },

];
