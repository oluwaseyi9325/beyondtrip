import Table from "@/components/table";
// import { useTutorColumns } from "./data";
import { useState } from "react";
import TutorToClass from "@/layout/general/modals/tutor-to-class";
import { usePartnerColumns } from "./data";
import TableSearchInput from "../table-search-input";
import { useTableSearch } from "@/hooks/use-table-search";
// import Pagination from "@/components/pagination";

export interface TPartner {
  partnerName: string;
  partnerCode: string;
  startDate: string;
  endDate: string;
  status: string;
  id: string;
}

const PartnerTable = ({ data }: { data: TPartner[] }) => {
  const [tutorId, setTutorId] = useState("");
  const [open, setOpen] = useState(false);

  const columns = usePartnerColumns({
    handleClick: (id: any) => {
      setTutorId(id);
      setOpen(true);
    },
    total: data?.length,
  });


  const {
    searchTerm,
    setSearchTerm,
    filteredData:filterPartner,
    clearSearch,
  } = useTableSearch({
    data: data,
    searchFields: ["partnerName", "partnerCode"],
  })

  return (
    <>
      <TutorToClass
        tutorId={tutorId}
        open={open}
        handleClose={() => {
          setTutorId("");
          setOpen(false);
        }}
      />

      <div className="p-3">
      <TableSearchInput
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearSearch={clearSearch}
        placeholder="Search partner name/id..."
        className="w-96" // Custom width for this table
      />
     </div>
      <Table<TPartner> columns={columns} data={filterPartner} />
      
      {/* <Pagination /> */}
    </>
  );
};

export default PartnerTable;
