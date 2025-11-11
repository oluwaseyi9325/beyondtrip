"use client";

import Table from "@/components/table";
import { useEarningColumns } from "./data";
import { useState } from "react";
import { useTableSearch } from "@/hooks/use-table-search";
import TransactionDetails from "@/layout/general/modals/earnings/view-earning";
import DateSort from "@/components/input/dateSort";
import SelectSearch from "@/components/input/selectSearch";
import { IoChevronForward } from "react-icons/io5";

export interface TAmbassador {
  date: string;
  amount: string;
  description: string;
  status: "Approved" | "Pending" | "Rejected" | "Not Paid";
}

interface Props {
  data: TAmbassador[];
  compactHeader?: boolean; //  renamed from isCutData for clarity
}

const EarningTable = ({ data, compactHeader = false }: Props) => {
  const [viewdriverOpen, setViewdriverOpen] = useState(false);
  const [driver, setdriver] = useState<TAmbassador | null>(null);

  const columns = useEarningColumns({
    handleClickView: (row) => {
      setdriver(row);
      setViewdriverOpen(true);
    },
    total: data?.length,
  });

  const { filteredData } = useTableSearch({
    data: data,
    searchFields: ["firstName", "lastName", "email"],
  });

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
          <h2 className="text-lg font-semibold text-gray-900">
            Payout History
          </h2>
          <button className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline">
            View All <IoChevronForward className="text-blue-600 text-base" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between flex-wrap gap-4 py-5">
          <h2 className="text-2xl font-semibold text-gray-900">
          Payout History
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <SelectSearch
              options={[
                { value: "paid", label: "Paid" },
                { value: "pending", label: "Pending" },
                { value: "failed", label: "Failed" },
              ]}
              placeholder="Payment Status"
            />
            <DateSort
              onDateChange={(dates) => console.log("Dates changed:", dates)}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <Table<TAmbassador> columns={columns} data={filteredData} />
    </>
  );
};

export default EarningTable;
