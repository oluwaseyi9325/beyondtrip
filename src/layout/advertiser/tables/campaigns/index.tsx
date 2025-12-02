import Table from "@/components/table";
import { useCampaignColumns } from "./data";
import { useState, useMemo } from "react";
// import driverToClass from "@/layout/general/modals/driver-to-class";

import { useTableSearch } from "@/hooks/use-table-search";
import TransactionDetails from "@/layout/general/modals/earnings/view-earning";
import DateSort from "@/components/input/dateSort";
import SelectSearch from "@/components/input/selectSearch";
import { IoChevronForward } from "react-icons/io5";
// import TransactionDetails from "@/layout/general/modnpals/earnings/view-earning";
import Pagination from "@/components/pagination";


export interface TAmbassador {
  name: string
  date: string;
  duration: string;
  amount: string;
  status: "Active" | "Pending" | "Completed" | "Planned";
  
}
const CampaignTable = ({ data, compactHeader = false }: { data: TAmbassador[], compactHeader?:boolean }) => {
  // const [driverId, setdriverId] = useState("");
  // const [open, setOpen] = useState(false);

  const [viewdriverOpen, setViewdriverOpen] = useState(false);
  const [driver, setdriver] = useState<TAmbassador | null>(null);

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage=10
  const totalItems = 250;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  



  const columns = useCampaignColumns({
    handleClick: () => {
      // setdriverId(id);
      // setOpen(true);
    },
    handleClickView: (row) => {
      setdriver(row);
      setViewdriverOpen(true);
    },
    total: data?.length,
  });

  const {
    // searchTerm,
    // setSearchTerm,
    filteredData: filterAmbassador,
    // clearSearch,
  } = useTableSearch({
    data: data,
    searchFields: ["firstName", "lastName", "email"],
  })

  // const pagedData = useMemo(() => {
  //   const start = (currentPage - 1) * itemsPerPage;
  //   return filterAmbassador.slice(start, start + itemsPerPage);
  // }, [currentPage, itemsPerPage]);

  
  return (
    <>
      {/* <driverToClass
        driverId={driverId}
        open={open}
        handleClose={() => {
          setdriverId("");
          setOpen(false);
        }}
      /> */}

      <TransactionDetails
        data={driver}
        open={viewdriverOpen}
        handleClose={() => setViewdriverOpen(false)}
      />

      {compactHeader ? (
        <div className="flex items-center justify-between py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Active Campaigns
          </h2>
          <button className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline">
            View All <IoChevronForward className="text-blue-600 text-base" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex w-full items-center justify-between flex-wrap gap-4 py-5">
            <h2 className="text-2xl font-semibold text-gray-900">
              Manage Campaigns
            </h2>
            <div className="flex flex-col sm:flex-row items-start gap-3">
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
        </>
      )}

      <Table<TAmbassador> columns={columns} data={filterAmbassador} />
      {/* <Pagination /> */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </>
  );
};

export default CampaignTable;
