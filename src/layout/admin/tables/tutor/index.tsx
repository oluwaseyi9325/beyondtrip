
import Table from "@/components/table";
import { useDriverColumns } from "./data";
// import { useState } from "react";
import TableSearchInput from "../table-search-input";
import { useTableSearch } from "@/hooks/use-table-search";
import { SelectFilter, useSelectFilters } from "../SelectFilter";
import { SelectFilterDropdown } from "../select-filter-dropdown";

export interface Tdriver {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  date: string;
  accountStatus: string;
}

const DriverTable = ({ data }: { data: Tdriver[] }) => {
  // const [driverId, setdriverId] = useState("");
  // const [open, setOpen] = useState(false);
  // const [viewdriverOpen, setViewdriverOpen] = useState(false);
  // const [driver, setdriver] = useState<Tdriver | null>(null);

  const columns = useDriverColumns({
    handleClick: () => {
      // setdriverId(id);
      // setOpen(true);
    },
    handleClickView: () => {
      // setdriver(row);
      // setViewdriverOpen(true);
    },
    total: data?.length,
  });

  // Step 1: Define select filters (only for accountStatus)
  const selectFilters: SelectFilter[] = [
    {
      key: "status",
      label: "Status",
      getValue: (item: Tdriver) => item.accountStatus,
    },
  ];

  // Step 2: Apply select filters
  const {
    filteredData: dataFilteredBySelects,
    selectedFilters,
    filterOptions,
    updateFilter,
  } = useSelectFilters({
    data: data || [],
    filters: selectFilters,
  });

  // Step 3: Apply search on top of select-filtered data
  const {
    searchTerm,
    setSearchTerm,
    filteredData: filterdriver,
    clearSearch,
  } = useTableSearch({
    data: dataFilteredBySelects,
    searchFields: ["emailAddress", "lastName", "firstName"],
  });

  return (
    <>
    

      <div className="p-3 flex justify-between items-center flex-wrap gap-4">
        <TableSearchInput
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={clearSearch}
          placeholder="Email, firstname, lastname..."
          className="w-96"
        />

        <div className="flex flex-wrap gap-4">
          {selectFilters.map((filter) => (
            <SelectFilterDropdown
              key={filter.key}
              label={filter.label}
              value={selectedFilters[filter.key]}
              options={filterOptions[filter.key] || []}
              onValueChange={(value: any) => updateFilter(filter.key, value)}
            />
          ))}
        </div>
      </div>

      <Table<Tdriver> columns={columns} data={filterdriver} />
    </>
  );
};

export default DriverTable;
