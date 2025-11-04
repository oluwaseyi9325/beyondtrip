"use client";

import Table from "@/components/table";
import { useMagazineColumns, MAGAZINE_MOCK } from "./data";
import { useState } from "react";
import { useTableSearch } from "@/hooks/use-table-search";
import TransactionDetails from "@/layout/general/modals/earnings/view-earning";
import SelectSearch from "@/components/input/selectSearch";
import { IoChevronForward } from "react-icons/io5";
import DateInput from "@/components/input/date";
import { useForm } from "react-hook-form";
import Pagination from "@/components/pagination";


export interface TMagazineRow {
  date: string; // e.g., "02 June, 2025"
  edition: string; // e.g., "March Edition"
  status: "Picked" | "Returned" | "Not Picked";
  location: string; // e.g., "Ikeja-Lagos"
}

interface Props {
  data?: TMagazineRow[];
  compactHeader?: boolean; // ✅ renamed from isCutData for clarity
}

type FilterForm = {
  date: Date | null;
};

const MagazineTable = ({ data = MAGAZINE_MOCK, compactHeader = false }: Props) => {
  const [viewdriverOpen, setViewdriverOpen] = useState(false);
  const [driver, setdriver] = useState<TMagazineRow | null>(null);

  const { control, reset, setValue } = useForm<FilterForm>({
    defaultValues: { date: null },
  });
  const [status, setStatus] = useState<string | undefined>(undefined);

  const columns = useMagazineColumns({
    handleClickView: (row) => {
      setdriver(row);
      setViewdriverOpen(true);
    },
    total: data?.length,
    handleClick: () => {},
  });

  const { filteredData } = useTableSearch({
    data: data,
    searchFields: ["date", "edition", "status", "location"],
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  // Ensure current page is within bounds when filters change
  const pageSafe = currentPage > totalPages ? totalPages : currentPage;
  const startIndex = (pageSafe - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pagedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <TransactionDetails
        data={driver}
        open={viewdriverOpen}
        handleClose={() => setViewdriverOpen(false)}
      />

      {/* Header Section */}
      {compactHeader ? (
        <div className="flex items-center justify-between py-4">
          <h2 className="text-lg mb-2 sm:mb-0  sm:text-sm font-semibold text-gray-900">
            Magazine Pickup History          
            </h2>
          <button className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline">
            View All <IoChevronForward className="text-blue-600 text-base" />
          </button>
        </div>
      ) : (
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-x-3 py-5">
          <h2 className="text-lg mb-2 sm:mb-0  sm:text-sm font-semibold text-gray-900">
          Magazine Pickup History          
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:flex-1 items-center">
         
            <SelectSearch
              className="w-full"
              value={status}
              handleChange={(v) => setStatus(v)}
              options={[
                { value: "paid", label: "Paid" },
                { value: "pending", label: "Pending" },
                { value: "failed", label: "Failed" },
              ]}
              placeholder="Status"
            />
            <DateInput
              name="date"
              placeholder="DD/MM/YYYY"
              control={control}
              dateFormat="dd/MM/yyyy"
              className="w-full"
            />
            <button
              type="button"
              onClick={() => { setStatus(undefined); reset(); setValue('date', null); }}
              className="text-black text-start lg:text-center whitespace-nowrap hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto  ">
        <Table<TMagazineRow> columns={columns} data={pagedData} />
      </div>
      {/* pagination */}
      <Pagination
        currentPage={pageSafe}
        totalPages={totalPages}
        onPageChange={(p) => setCurrentPage(p)}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(n) => { setItemsPerPage(n); setCurrentPage(1); }}
        className="px-0 py-2 "
      />

        
    </>
  );
};

export default MagazineTable;
