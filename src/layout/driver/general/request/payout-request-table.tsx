"use client";

import React from "react";
import Table from "@/components/table";
import { TableColumn } from "react-data-table-component";
import { PiCaretDown } from "react-icons/pi";
import Pagination from "@/components/pagination";

type RequestStatus = "Pending" | "Approved" | "Rejected";

type PayoutRequest = {
  id: string;
  driverName: string;
  bankName: string;
  accountNo: string;
  amount: string; // Format: "₦50,000.00"
  dateSubmitted: string; // Format: "YYYY-MM-DD HH:MMam/pm"
  status: RequestStatus;
};

const PAYOUT_REQUESTS_MOCK: PayoutRequest[] = Array.from({ length: 20 }).map((_, i) => {
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
    driverName: "Ikeja-Lagos",
    bankName: "ACCESS BANK PLC",
    accountNo: "0093234523",
    amount: "₦50,000.00",
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

function PayoutRequestTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const columns: TableColumn<PayoutRequest>[] = [
    {
      name: "Driver Name",
      selector: (row) => row.driverName,
    },
    {
      name: "Bank Name",
      selector: (row) => row.bankName,
    },
    {
      name: "Account No",
      selector: (row) => row.accountNo,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      minWidth: "140px",
    },
    {
      name: "Date Submitted",
      selector: (row) => row.dateSubmitted,
      minWidth: "170px",

    },
    {
      name: "Status",
      cell: (row) => <StatusPill status={row.status} />,
      center: true,
      
    },
    {
      name: "Action",
      cell: () => <ActionCell />,
    },
  ];

  const totalPages = Math.ceil(PAYOUT_REQUESTS_MOCK.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = PAYOUT_REQUESTS_MOCK.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="">
          <Table<PayoutRequest> columns={columns} data={pageData} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={PAYOUT_REQUESTS_MOCK.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default PayoutRequestTable;

