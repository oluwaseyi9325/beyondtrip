import Table from "@/components/table";
import { useClassColumns } from "./data";
import { useState } from "react";
import { useTableSearch } from "@/hooks/use-table-search";
import { SelectFilterDropdown } from "@/layout/admin/tables/select-filter-dropdown";
import TableSearchInput from "@/layout/admin/tables/table-search-input";
import { SelectFilter, useSelectFilters } from "@/layout/admin/tables/SelectFilter";
import ViewClass from "@/layout/general/modals/classes/view-class";

export interface TClass {
  cohortName: string;
  courseCohortId: string;
  courseName: string;
  tutorId: string;
  tutorName: string;
}

const ClassTable = ({ data }: { data: TClass[] }) => {
  const [viewClassOpen, setViewClassOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<TClass | null>(null);

  const columns = useClassColumns({
    handleClick: (id) => {
      // Find the class by courseCohortId
      const classToView = data.find(cls => cls.courseCohortId === id);
      if (classToView) {
        setSelectedClass(classToView);
        // setViewClassOpen(true);
      }
    },
    total: data?.length,
  });

  // ✅ Step 1: Define select filters
  const selectFilters: SelectFilter[] = [
    {
      key: "cohort",
      label: "Cohort",
      getValue: (item: TClass) => item.cohortName,
    },
    {
      key: "course",
      label: "Course",
      getValue: (item: TClass) => item.courseName,
    },
  ];

  // ✅ Step 2: Filter using selects
  const {
    filteredData: filteredBySelects,
    selectedFilters,
    filterOptions,
    updateFilter,
  } = useSelectFilters({
    data: data || [],
    filters: selectFilters,
  });

  // ✅ Step 3: Search within selected-filtered data
  const {
    searchTerm,
    setSearchTerm,
    filteredData: finalFilteredData,
    clearSearch,
  } = useTableSearch({
    data: filteredBySelects,
    searchFields: ["tutorName"],
  });

  return (
    <>
      <ViewClass
        data={selectedClass}
        open={viewClassOpen}
        handleClose={() => {
          setViewClassOpen(false);
          setSelectedClass(null);
        }}
      />
      
      <div className="p-3 flex justify-between items-center flex-wrap gap-4">
        <TableSearchInput
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={clearSearch}
          placeholder="Search by tutor name..."
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

      <Table<TClass> columns={columns} data={finalFilteredData} />
    </>
  );
};

export default ClassTable;