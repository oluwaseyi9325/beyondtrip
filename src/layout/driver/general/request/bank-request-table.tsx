"use client";

import React from "react";
import Table from "@/components/table";
import { TableColumn } from "react-data-table-component";
import Pagination from "@/components/pagination";

type RequestStatus = "Pending" | "Approved" | "Rejected";

type BankRequest = {
  id: string;
  driverName: string;
  dateSubmitted: string; // Format: "YYYY-MM-DD HH:MMam/pm"
  status: RequestStatus;
};

const BANK_REQUESTS_MOCK: BankRequest[] = Array.from({ length: 20 }).map((_, i) => {
  let status: RequestStatus;
  if (i % 5 === 0) {
    status = "Rejected";
  } else if (i % 3 === 0) {
    status = "Approved";
  } else {
    status = "Pending";
  }
  
  return {
    id: String(i + 1),
    driverName: "JOHN DOE M.",
    dateSubmitted: "2025-08-05 16:25pm",
    status,
  };
});

const StatusPill = ({ status }: { status: RequestStatus }) => {
  const colorClasses =
    status === "Pending"
      ? "border-orange-400 text-orange-500"
      : status === "Approved"
      ? "border-green-500 text-green-600"
      : "border-red-500 text-red-500";
  return (
    <span className={`inline-flex items-center justify-center rounded-full py-1 text-sm bg-white ${colorClasses} border w-28`}>
      {status}
    </span>
  );
};

const ActionCell = () => {
  return (
    <button className="flex whitespace-nowrap items-center justify-center gap-2 max-w-[15rem] px-4 py-1 rounded-full border border-[#2C73EA] text-[#2C73EA] bg-white text-sm">
      View 
    </button>
  );
};

function BankRequestTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const columns: TableColumn<BankRequest>[] = [
    {
      name: "Driver Name",
      selector: (row) => row.driverName,
      grow: 2,
    },
    {
      name: "Date Submitted",
      selector: (row) => row.dateSubmitted,
      minWidth: "180px",
    },
    {
      name: "Status",
      cell: (row) => <StatusPill status={row.status} />,
      center: true,
      grow: 0,
      minWidth: "130px",
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

  const totalPages = Math.ceil(BANK_REQUESTS_MOCK.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = BANK_REQUESTS_MOCK.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <Table<BankRequest> columns={columns} data={pageData} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={BANK_REQUESTS_MOCK.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default BankRequestTable;

