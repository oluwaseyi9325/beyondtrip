"use client";

import React from "react";
import Table from "@/components/table";
import { TableColumn } from "react-data-table-component";
import { PiCaretDown } from "react-icons/pi";
import Pagination from "@/components/pagination";

type EditionStatus = "Active" | "Archived";

type Edition = {
  id: string;
  name: string;
  releasedDate: string; // ISO (YYYY-MM-DD)
  status: EditionStatus;
};

const EDITIONS_MOCK: Edition[] = [
  {
    id: "1",
    name: "March Edition (Issue Vol. 08)",
    releasedDate: "2025-08-05",
    status: "Active",
  },
  {
    id: "2",
    name: "March Edition (Issue Vol. 08)",
    releasedDate: "2025-08-05",
    status: "Archived",
  },
  {
    id: "3",
    name: "March Edition (Issue Vol. 08)",
    releasedDate: "2025-08-05",
    status: "Archived",
  },
  {
    id: "4",
    name: "March Edition (Issue Vol. 08)",
    releasedDate: "2025-08-05",
    status: "Archived",
  },
  {
    id: "5",
    name: "March Edition (Issue Vol. 08)",
    releasedDate: "2025-08-05",
    status: "Archived",
  },
  {
    id: "6",
    name: "March Edition (Issue Vol. 08)",
    releasedDate: "2025-08-05",
    status: "Archived",
  },
  {
    id: "7",
    name: "March Edition (Issue Vol. 08)",
    releasedDate: "2025-08-05",
    status: "Archived",
  },
  {
    id: "8",
    name: "March Edition (Issue Vol. 08)",
    releasedDate: "2025-08-05",
    status: "Archived",
  },
  {
    id: "9",
    name: "March Edition (Issue Vol. 08)",
    releasedDate: "2025-08-05",
    status: "Archived",
  },
];

const StatusPill = ({ status }: { status: EditionStatus }) => {
  const isActive = status === "Active";
  return (
    <span
      className={
        (isActive
          ? "border-green-500 text-green-600"
          : "border-red-500 text-red-500") +
        " inline-flex items-center justify-center rounded-full py-1 text-sm bg-white border w-28"
      }
    >
      {status}
    </span>
  );
};

const ActionCell = () => {
  return (
    <button className="flex whitespace-nowrap items-center justify-center gap-2 max-w-[15rem] px-4 py-1 rounded-full border border-[#2C73EA] text-[#2C73EA] bg-white text-sm">
      View <PiCaretDown size={16} />
    </button>
  );
};

function EditionMagazineTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const columns: TableColumn<Edition>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      grow: 2,
    },
    {
      name: "Released Date",
      selector: (row) => row.releasedDate,
    },
    {
      name: "Status",
      cell: (row) => <StatusPill status={row.status} />,
      center: true,
    },
    {
      name: "Action",
      cell: () => <ActionCell />,
      right: true,
    },
  ];

  const totalPages = Math.ceil(EDITIONS_MOCK.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = EDITIONS_MOCK.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <Table<Edition> columns={columns} data={pageData} />
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

export default EditionMagazineTable;

