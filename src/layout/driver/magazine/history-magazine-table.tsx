"use client";

import React from "react";
import Table from "@/components/table";
import { TableColumn } from "react-data-table-component";
import { PiCaretDown } from "react-icons/pi";
import Pagination from "@/components/pagination";
import SelectSearch from "@/components/input/selectSearch";
import DateSort from "@/components/input/dateSort";

type EditionStatus = "Picked" | "Not Picked" | "Returned";

type Edition = {
  id: string;
  date: string;
  location: string;
  title: string;
  status: EditionStatus;
};

const EDITIONS_MOCK: Edition[] = [
  {
    id: "1",
    date: "2025-08-05",
    location: "Lagos, Nigeria",
    title: "March Edition (Issue Vol. 08)",
    status: "Picked",
  },
  {
    id: "2",
    date: "2025-08-05",
    location: "Lagos, Nigeria",
    title: "March Edition (Issue Vol. 08)",
    status: "Not Picked",
  },
  {
    id: "3",
    date: "2025-08-05",
    location: "Lagos, Nigeria",
    title: "March Edition (Issue Vol. 08)",
    status: "Returned",
  },
  {
    id: "4",
    date: "2025-08-05",
    location: "Lagos, Nigeria",
    title: "March Edition (Issue Vol. 08)",
    status: "Picked",
  },
  {
    id: "5",
    date: "2025-08-05",
    location: "Lagos, Nigeria",
    title: "March Edition (Issue Vol. 08)",
    status: "Not Picked",
  },
  {
    id: "6",
    date: "2025-08-05",
    location: "Lagos, Nigeria",
    title: "March Edition (Issue Vol. 08)",
    status: "Returned",
  },
  {
    id: "7",
    date: "2025-08-05",
    location: "Lagos, Nigeria",
    title: "March Edition (Issue Vol. 08)",
    status: "Picked",
  },
  {
    id: "8",
    date: "2025-08-05",
    location: "Lagos, Nigeria",
    title: "March Edition (Issue Vol. 08)",
    status: "Picked",
  },
  {
    id: "9",
    date: "2025-08-05",
    location: "Lagos, Nigeria",
    title: "March Edition (Issue Vol. 08)",
    status: "Picked",
  },
];

const StatusPill = ({ status }: { status: EditionStatus }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "Picked":
        return {
          container: "border border-[#008000] text-[#008000] ",
        };
      case "Not Picked":
        return {
          container: "border border-[#008000] text-[#008000] ",
        };
      case "Returned":
        return {
          container: "border border-[#F29339] text-[#F29339] ",
        };
      default:
        return {
          container: "border border-[#008000] text-[#008000]",
        };
    }
  };

  const styles = getStatusStyle();

  return (
    <span
      className={`items-center justify-center w-[110px] text-center gap-2 rounded-full py-2 px-2 text-sm  ${styles.container}`}
    >
      {status}
    </span>
  );
};

function HistoryMagazineTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const columns: TableColumn<Edition>[] = [
    {
      name: "Date",
      selector: (row) => row.date,
      grow: 1,
      minWidth: "120px",
    },
    {
      name: "Location",
      selector: (row) => row.location,
      minWidth: "150px",
    },
    {
      name: "Title/Description",
      selector: (row) => row.title,
      minWidth: "200px",
    },
    {
      name: "Status",
      cell: (row) => <StatusPill status={row.status} />,
      center: true,
      minWidth: "160px",
    },
  ];

  const totalPages = Math.ceil(EDITIONS_MOCK.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = EDITIONS_MOCK.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-between flex-wrap gap-4 py-5">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          History Of Magazines
        </h2>
        <div className="flex flex-col sm:flex-row items-start gap-3 w-full sm:w-auto">
          <SelectSearch
            options={[
              { value: "picked", label: "Picked" },
              { value: "not-picked", label: "Not Picked" },
              { value: "returned", label: "Returned" },
            ]}
            placeholder="Status"
          />
          <DateSort
            onDateChange={(dates) => console.log("Dates changed:", dates)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table<Edition> columns={columns} data={pageData} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={EDITIONS_MOCK.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default HistoryMagazineTable;
