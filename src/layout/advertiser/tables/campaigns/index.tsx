import Table from "@/components/table";
import { useCampaignColumns } from "./data";
import { useState } from "react";
// import driverToClass from "@/layout/general/modals/driver-to-class";

import { useTableSearch } from "@/hooks/use-table-search";
import TransactionDetails from "@/layout/general/modals/earnings/view-earning";
// import TransactionDetails from "@/layout/general/modnpals/earnings/view-earning";
// import Pagination from "@/components/pagination";

export interface TAmbassador {
  name: string
  date: string;
  duration: string;
  amount: string;
  status: "Active" | "Pending" | "Completed" | "Planned";
}
const CampaignTable = ({ data }: { data: TAmbassador[] }) => {
  // const [driverId, setdriverId] = useState("");
  // const [open, setOpen] = useState(false);

  const [viewdriverOpen, setViewdriverOpen] = useState(false);
  const [driver, setdriver] = useState<TAmbassador | null>(null);

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
        handleClose={
          () => setViewdriverOpen(false)
        }

      />


      <Table<TAmbassador> columns={columns} data={filterAmbassador} />
      {/* <Pagination /> */}
    </>
  );
};

export default CampaignTable;
