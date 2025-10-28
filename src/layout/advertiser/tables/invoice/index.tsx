import Table from "@/components/table";
import { useInvoiceColumns } from "./data";
import { useState } from "react";
// import driverToClass from "@/layout/general/modals/driver-to-class";

import { useTableSearch } from "@/hooks/use-table-search";
import TransactionDetails from "@/layout/general/modals/earnings/view-earning";
// import TransactionDetails from "@/layout/gmeneral/modals/earnings/view-earning";
// import Pagination from "@/components/pagination";

export interface TAmbassador {
  id: string;
  campaign: string;
  date: string;
  amount: string;
  description: string;
  isPay: boolean;
  status: "Paid" | "Pending" | "Unpaid" | "Not Paid"| "Active";
}
const InvoiceTable = ({ data }: { data: TAmbassador[] }) => {
  // const [driverId, setdriverId] = useState("");
  // const [open, setOpen] = useState(false);

  const [viewdriverOpen, setViewdriverOpen] = useState(false);
  const [driver, setdriver] = useState<TAmbassador | null>(null);

  const columns = useInvoiceColumns({
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

export default InvoiceTable;
