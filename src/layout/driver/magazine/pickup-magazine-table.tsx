"use client";

import React from "react";
import Table from "@/components/table";
import { TableColumn } from "react-data-table-component";
import { PiCaretDown } from "react-icons/pi";
import Pagination from "@/components/pagination";

type PickupStatus = "Active" | "Inactive";

type PickupLocation = {
  id: string;
  hubName: string;
  address: string;
  status: PickupStatus;
};

const PICKUPS_MOCK: PickupLocation[] = Array.from({ length: 20 }).map((_, i) => ({
  id: String(i + 1),
  hubName: "Ikeja–Lagos",
  address: "12, Allen Avenue, Ikeja, Lagos",
  status: i % 3 === 0 ? "Inactive" : "Active",
}));

const StatusPill = ({ status }: { status: PickupStatus }) => {
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

function PickupMagazineTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const columns: TableColumn<PickupLocation>[] = [
    {
      name: "Hub/Location Name",
      selector: (row) => row.hubName,
      grow: 2,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      grow: 3,
    },
    {
      name: "Status",
      cell: (row) => <StatusPill status={row.status} />,
      center: true,
      grow: 0,
      minWidth: "120px",
    },
    {
      name: "Action",
      cell: () => <ActionCell />,
      right: true,
      grow: 0,
      minWidth: "140px",
      allowOverflow: true,
    },
  ];

  const totalPages = Math.ceil(PICKUPS_MOCK.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = PICKUPS_MOCK.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-[720px]">
          <Table<PickupLocation> columns={columns} data={pageData} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={PICKUPS_MOCK.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default PickupMagazineTable;



