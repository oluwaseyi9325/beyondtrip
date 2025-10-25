import Table from "@/components/table";
import { useRegisteredColumns } from "./data";
import { useGetStudents } from "@/services/student.service";
import TableSkeleton from "@/components/skeleton";
import ViewStudent from "@/layout/general/modals/student/view-student";
import { useState } from "react";
import { useTableSearch } from "@/hooks/use-table-search";
import TableSearchInput from "../table-search-input";
import { SelectFilter, useSelectFilters } from "../SelectFilter";
import { SelectFilterDropdown } from "../select-filter-dropdown";
import Pagination from "@/components/pagination";

export interface TRegistered {
  accountStatus: string;
  classes: { courseName: string } | null;
  cohorts: { note: string } | null;
  emailAddress: string;
  firstName: string;
  id: string;
  identityId: string | null;
  lastName: string;
  middleName: string;
  phoneNumber: string;
}

const ScholarshipTable = () => {
  const [viewStudentOpen, setViewStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TRegistered | null>(null);
  const [page, setPage] = useState(1);
  const { data: students, isLoading } = useGetStudents(
    {
      Page: page,
    PageSize: 10,
    }
  );
  const totalPages = students?.data?.totalPages || 0;
  const rawData = students?.data?.items || [];

  // ✅ Step 1: Select filter definitions
  const selectFilters: SelectFilter[] = [
    {
      key: "status",
      label: "Status",
      getValue: (item: TRegistered) => item.accountStatus,
    },
    {
      key: "cohort",
      label: "Cohort",
      getValue: (item: TRegistered) => item.cohorts?.note || "None",
    },
    {
      key: "course",
      label: "Course",
      getValue: (item: TRegistered) => item.classes?.courseName || "None",
    },
  ];

  // ✅ Step 2: Apply select filters
  const {
    filteredData: filteredBySelects,
    selectedFilters,
    filterOptions,
    updateFilter,
  } = useSelectFilters({
    data: rawData,
    filters: selectFilters,
  });

  // ✅ Step 3: Apply search on filtered data
  const {
    searchTerm,
    setSearchTerm,
    filteredData: filteredStudents,
    clearSearch,
    totalResults,
  } = useTableSearch({
    data: filteredBySelects,
    searchFields: ["firstName", "lastName", "emailAddress", "phoneNumber"],
  });

  // ✅ Columns definition
  const columns = useRegisteredColumns({
    handleClickView: (row) => {
      setSelectedStudent(row);
      setViewStudentOpen(true);
    },
    handleAddToClass: (id: string) => console.log("Add to class:", id),
    total: totalResults,
  });

  return (
    <>
      <ViewStudent
        data={selectedStudent}
        open={viewStudentOpen}
        handleClose={() => {
          setViewStudentOpen(false);
          setSelectedStudent(null);
        }}
      />

      <section className="container">
        <div className="flex justify-between items-center my-4">
        <TableSearchInput
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClearSearch={clearSearch}
            placeholder="Search by name,email,phonenumber..."
            className="w-90"
          />
        <div className=" pb-4 flex flex-wrap gap-2">
          {selectFilters.map((filter) => (
            <SelectFilterDropdown
              key={filter.key}
              label={filter.label}
              value={selectedFilters[filter.key]}
              options={filterOptions[filter.key] || []}
              onValueChange={(val: any) => updateFilter(filter.key, val)}
            />
          ))}
        </div>
       </div>

        {isLoading ? (
          <TableSkeleton rows={6} />
        ) : (
            <>
              <Table<TRegistered> columns={columns} data={filteredStudents} />
              <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
            </>
        )}

      </section>
    </>
  );
};

export default ScholarshipTable;
