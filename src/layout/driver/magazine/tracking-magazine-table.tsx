"use client";

import React from "react";
import Table from "@/components/table";
import { TableColumn } from "react-data-table-component";
import Pagination from "@/components/pagination";

type TrackingStatus = "Picked" | "Returned" | "Not Picked";

type TrackingRow = {
  id: string;
  driverName: string;
  edition: string;
  location: string;
  releasedDate: string; // ISO
  status: TrackingStatus;
};

const TRACKING_MOCK: TrackingRow[] = Array.from({ length: 20 }).map((_, i) => ({
  id: String(i + 1),
  driverName: "JOHN DOE M.",
  edition: "March Edition (Vol. 08)",
  location: i % 3 === 2 ? "Nil" : "Ikeja–Lagos",
  releasedDate: "2025-08-05",
  status: i % 5 === 2 ? "Not Picked" : i % 4 === 1 ? "Returned" : "Picked",
}));

const StatusPill = ({ status }: { status: TrackingStatus }) => {
  const colorClasses =
    status === "Picked"
      ? "border-green-500 text-green-600"
      : status === "Returned"
      ? "border-orange-400 text-orange-500"
      : "border-red-500 text-red-500";
  return (
    <span className={`inline-flex items-center justify-center rounded-full py-1 text-sm bg-white ${colorClasses} border w-28`}>
      {status}
    </span>
  );
};

function TrackingMagazineTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const columns: TableColumn<TrackingRow>[] = [
    { name: "Driver Name", selector: (row) => row.driverName, grow: 2 },
    { name: "Edition", selector: (row) => row.edition, grow: 2 },
    { name: "Location", selector: (row) => row.location, grow: 1 },
    { name: "Released Date", selector: (row) => row.releasedDate, minWidth: "140px" },
    { name: "Status", cell: (row) => <StatusPill status={row.status} />, center: true, grow: 0, minWidth: "130px" },
  ];

  const totalPages = Math.ceil(TRACKING_MOCK.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = TRACKING_MOCK.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <Table<TrackingRow> columns={columns} data={pageData} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={TRACKING_MOCK.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default TrackingMagazineTable;


