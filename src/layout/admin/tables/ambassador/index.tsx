import Table from "@/components/table";
import { useAmbassadorColumns } from "./data";
import { useState } from "react";
import TutorToClass from "@/layout/general/modals/tutor-to-class";
import ViewAmbassador from "@/layout/general/modals/ambassador/view-ambassador";
import { useTableSearch } from "@/hooks/use-table-search";
import TableSearchInput from "../table-search-input";
// import Pagination from "@/components/pagination";

export interface TAmbassador {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  promoCode: string;
  referralLink: string;
}

const AmbassadorTable = ({ data }: { data: TAmbassador[] }) => {
  const [tutorId, setTutorId] = useState("");
  const [open, setOpen] = useState(false);

  const [viewTutorOpen, setViewTutorOpen] = useState(false);
  const [tutor, setTutor] = useState<TAmbassador | null>(null);

  const columns = useAmbassadorColumns({
    handleClick: (id) => {
      setTutorId(id);
      setOpen(true);
    },
    handleClickView: (row) => {
      setTutor(row);
      setViewTutorOpen(true);
    },
    total: data?.length,
  });

  const {
    searchTerm,
    setSearchTerm,
    filteredData: filterAmbassador,
    clearSearch,
  } = useTableSearch({
    data: data,
    searchFields: ["firstName", "lastName", "email"],
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



      <ViewAmbassador
        data={tutor}
        open={viewTutorOpen}
        handleClose={
          () => setViewTutorOpen(false)
        }

      />

      <div className="p-3">
        <TableSearchInput
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={clearSearch}
          placeholder="Search ambassador name/id..."
          className="w-96" // Custom width for this table
        />
      </div>

      <Table<TAmbassador> columns={columns} data={filterAmbassador} />
      {/* <Pagination /> */}
    </>
  );
};

export default AmbassadorTable;
