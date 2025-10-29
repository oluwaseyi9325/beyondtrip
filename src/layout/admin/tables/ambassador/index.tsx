import Table from "@/components/table";
import { useAmbassadorColumns } from "./data";
import { useState } from "react";
// import driverToClass from "@/layout/general/modals/driver-to-class";
import ViewAmbassador from "@/layout/general/modals/earnings/view-earning";
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
  // const [driverId, setdriverId] = useState("");
  // const [open, setOpen] = useState(false);

  const [viewdriverOpen, setViewdriverOpen] = useState(false);
  const [driver, setdriver] = useState<TAmbassador | null>(null);

  const columns = useAmbassadorColumns({
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
      {/* <driverToClass
        driverId={driverId}
        open={open}
        handleClose={() => {
          setdriverId("");
          setOpen(false);
        }}
      /> */}



      <ViewAmbassador
        data={driver}
        open={viewdriverOpen}
        handleClose={
          () => setViewdriverOpen(false)
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
