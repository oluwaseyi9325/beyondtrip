import { TableColumn } from "react-data-table-component";

import { AiOutlineMore } from "react-icons/ai";
import clsx from "clsx";
import Dropdown from "@/components/dropdown";
import { Tadvertiser } from "..";
import Image from "next/image";

export const advertiserColumns = (
  onViewCourse: (course: Tadvertiser) => void,
  onUploadMaterials: (course: Tadvertiser) => void
): TableColumn<Tadvertiser>[] => [
    {
      name: "S/N",
      width: "5%",
      cell: (_, index: number) => index + 1,
    },
    {
      name: "advertiser Name",
      width: "15%",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Image
            src="/assets/png/advertiser.png"
            width={35}
            height={35}
            alt="advertiser"
          />
          <span>{row.advertiser_name}</span>
        </div>
      ),
    },
    {
      name: "Program",
      width: "15%",
      selector: (row) => row.program,
    },
    {
      name: "Gender",
      width: "10%",
      selector: (row) => row.gender,
    },
    {
      name: "Cohort",
      width: "10%",
      selector: (row) => row.cohort,
    },
    {
      name: "Payment Status",
      width: "15%",
      selector: (row) => row.payment_status,
    },
    {
      name: "Joined Date",
      width: "15%",
      selector: (row) => row.joined_date,
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

export const advertiserData: Tadvertiser[] = [
  {
    advertiser_name: "John Doe",
    program: "Software Engineering",
    gender: "Male",
    cohort: "Cohort 1",
    payment_status: "Paid",
    joined_date: "May 12th, 2023",
    status: "Active",
  },
];
