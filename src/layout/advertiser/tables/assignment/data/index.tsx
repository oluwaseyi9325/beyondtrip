import { TableColumn } from "react-data-table-component";

import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";
import Dropdown from "@/components/dropdown";
import { TAssignment } from "..";



export const assignmentColumns = (
  onViewAssignment: (assignment: TAssignment) => void,
  onUploadAssignment: (assignment: TAssignment) => void
): TableColumn<TAssignment>[] => [
    {
      name: "S/N",
      width: "5%",
      cell: (_, index: number) => index + 1,
      // cell: ()=> <input type="checkbox"/>,

    },
    {
      name: "Assignment Detail",
      selector: (row) => row.assignment_detail,
      width: "25%",
    },
    {
      name: "Course",
      width: "25%",
      selector: (row) => row.course
    },
    {
      name: "Allocated Mark",
      selector: (row) => row.allocated_mark,
    },
    {
      name: "Due Date",
      selector: (row) => row.due_date,
    },
    {
      name: "Action",
      cell: () => (
        <div
          className={clsx(
            "border text-sm text-white font-[500] rounded-md bg-[#121363] px-3 py-[2px]",
          )}
        >
          Submit
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
              onClick={() => onViewAssignment(row)}
            >
              <span className="text-sm text-gray-700">View Assignemnt</span>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => onUploadAssignment(row)}
            >
              <span className="text-sm text-[#FF0000]">Submit Assignment</span>
            </div>

          </div>
        </Dropdown>
      ),
    },
  ];



export const assignmentData: TAssignment[] = [

  {
    assignment_detail: "Look for any website, analyze thoroughly to see what to be improved on it.",
    course: "Web Development",
    allocated_mark: "30",
    due_date: "July 13, 2023",
    status: "Active"
  },
  {
    assignment_detail: "Look for any website, analyze thoroughly to see what to be improved on it.",
    course: "Web Development",
    allocated_mark: "30",
    due_date: "July 13, 2023",
    status: "Active"
  },
  {
    assignment_detail: "Look for any website, analyze thoroughly to see what to be improved on it.",
    course: "Web Development",
    allocated_mark: "30",
    due_date: "July 13, 2023",
    status: "Active"
  },

];
