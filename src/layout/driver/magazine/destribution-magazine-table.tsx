"use client";

import React from "react";
import Table from "@/components/table";
import { TableColumn } from "react-data-table-component";
import { PiCaretDown } from "react-icons/pi";
import Pagination from "@/components/pagination";

type Distribution = {
  id: string;
  hubName: string;
  edition: string;
  releasedDate: string; // ISO (YYYY-MM-DD)
  quantity: number;
};

const DISTRIBUTIONS_MOCK: Distribution[] = Array.from({ length: 20 }).map((_, i) => ({
  id: String(i + 1),
  hubName: "Ikeja–Lagos",
  edition: "March Edition (Vol. 08)",
  releasedDate: "2025-08-05",
  quantity: 25,
}));

const ActionCell = () => {
  return (
    <button className="flex whitespace-nowrap items-center justify-center gap-2 max-w-[15rem] px-4 py-1 rounded-full border border-[#2C73EA] text-[#2C73EA] bg-white text-sm">
      View <PiCaretDown size={16} />
    </button>
  );
};

function DestributionMagazineTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const columns: TableColumn<Distribution>[] = [
    {
      name: "Hub/Location Name",
      selector: (row) => row.hubName,
      grow: 2,
    },
    {
      name: "Edition",
      selector: (row) => row.edition,
      grow: 2,
    },
    {
      name: "Released Date",
      selector: (row) => row.releasedDate,
      minWidth: "140px",
    },
    {
      name: "Quantity",
      selector: (row) => String(row.quantity),
      center: true,
      minWidth: "110px",
      grow: 0,
    },
    {
      name: "Action",
      cell: () => <ActionCell />,
      right: true,
      grow: 0,
      minWidth: "120px",
      allowOverflow: true,
    },
  ];

  const totalPages = Math.ceil(DISTRIBUTIONS_MOCK.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = DISTRIBUTIONS_MOCK.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-[820px]">
          <Table<Distribution> columns={columns} data={pageData} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={DISTRIBUTIONS_MOCK.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default DestributionMagazineTable;


