"use client";

import React from "react";
import Table from "@/components/table";
import { TableColumn } from "react-data-table-component";
import Pagination from "@/components/pagination";

type HistoryStatus = "Paid";

type HistoryRequest = {
  id: string;
  driverName: string;
  dateSubmitted: string; // Format: "YYYY-MM-DD HH:MMam/pm"
  amount: string; // Format: "₦50,000.00"
  dateApproved: string; // Format: "YYYY-MM-DD HH:MMam/pm"
  status: HistoryStatus;
  reviewedBy: string;
};

const HISTORY_REQUESTS_MOCK: HistoryRequest[] = Array.from({ length: 20 }).map((_, i) => ({
  id: String(i + 1),
  driverName: "JOHN DOE M.",
  dateSubmitted: "2025-08-05 16:25pm",
  amount: "₦50,000.00",
  dateApproved: "2025-08-05 16:25pm",
  status: "Paid",
  reviewedBy: i % 2 === 0 ? "Admin 1" : "Super Admin",
}));

const StatusPill = ({ status }: { status: HistoryStatus }) => {
  return (
    <span className="inline-flex items-center justify-center rounded-full py-1 text-sm bg-white border-green-500 text-green-600 border w-28">
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

function HistoryRequestTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const columns: TableColumn<HistoryRequest>[] = [
    {
      name: "Driver Name",
      selector: (row) => row.driverName,
    },
    {
      name: "Date Submitted",
      selector: (row) => row.dateSubmitted,
      minWidth: "180px",
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Date Approved",
      selector: (row) => row.dateApproved,
      minWidth: "180px",
    },
    {
      name: "Status",
      cell: (row) => <StatusPill status={row.status} />,
      center: true,
    },
    {
      name: "Reviewed by",
      selector: (row) => row.reviewedBy,
    },
    {
      name: "Action",
      cell: () => <ActionCell />,
    },
  ];

  const totalPages = Math.ceil(HISTORY_REQUESTS_MOCK.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = HISTORY_REQUESTS_MOCK.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="  ">
          <Table<HistoryRequest> columns={columns} data={pageData} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={HISTORY_REQUESTS_MOCK.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default HistoryRequestTable;

