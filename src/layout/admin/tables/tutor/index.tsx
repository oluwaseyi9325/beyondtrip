
import Table from "@/components/table";
import { useTutorColumns } from "./data";
import { useState } from "react";
import TutorToClass from "@/layout/general/modals/tutor-to-class";
import ViewTutor from "@/layout/general/modals/tutor/view-tuor";
import TableSearchInput from "../table-search-input";
import { useTableSearch } from "@/hooks/use-table-search";
import { SelectFilter, useSelectFilters } from "../SelectFilter";
import { SelectFilterDropdown } from "../select-filter-dropdown";

export interface TTutor {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  date: string;
  accountStatus: string;
}

const TutorTable = ({ data }: { data: TTutor[] }) => {
  const [tutorId, setTutorId] = useState("");
  const [open, setOpen] = useState(false);
  const [viewTutorOpen, setViewTutorOpen] = useState(false);
  const [tutor, setTutor] = useState<TTutor | null>(null);

  const columns = useTutorColumns({
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

  // Step 1: Define select filters (only for accountStatus)
  const selectFilters: SelectFilter[] = [
    {
      key: "status",
      label: "Status",
      getValue: (item: TTutor) => item.accountStatus,
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
    filteredData: filterTutor,
    clearSearch,
  } = useTableSearch({
    data: dataFilteredBySelects,
    searchFields: ["emailAddress", "lastName", "firstName"],
  });

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

      <ViewTutor
        data={tutor}
        open={viewTutorOpen}
        handleClose={() => setViewTutorOpen(false)}
      />

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

      <Table<TTutor> columns={columns} data={filterTutor} />
    </>
  );
};

export default TutorTable;
