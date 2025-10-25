import Table from "@/components/table";
import { useRegisteredColumns } from "./data";
import { useGetStudents } from "@/services/student.service";
import TableSkeleton from "@/components/skeleton";
import ViewStudent from "@/layout/general/modals/student/view-student";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import TableSearchInput from "../table-search-input";
import CustomSelect from "@/components/input/CustomSelect";
import Pagination from "@/components/pagination";
import { useGetCohorts } from "@/services/cohort.service";
import { useGetCourses } from "@/services/course.service";
import Empty from "./empty";

export interface TRegistered {
  accountStatus: string;
  classes: any;
  cohorts: any;
  emailAddress: string;
  firstName: string;
  id: string;
  identityId: string | null;
  lastName: string;
  middleName: string;
  phoneNumber: string;
}

const RegisteredTable = () => {
  const [viewStudentOpen, setViewStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TRegistered | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const { data: cohorts } = useGetCohorts({
    PageSize: 30,
  });

  const { data: courses } = useGetCourses();
  // Debounced filters
  const [debouncedSearch] = useDebounce(search, 500);
  const [debouncedStatus] = useDebounce(selectedStatus, 300);
  const [debouncedCohort] = useDebounce(selectedCohort, 300);
  const [debouncedCourse] = useDebounce(selectedCourse, 300);

  // Reset page when filters change
  const resetPage = () => {
    if (page !== 1) setPage(1);
  };

  // Fetch students directly from server with filters
  const { data: students, isLoading } = useGetStudents({
    Page: page,
    PageSize: pageSize,
    SearchKey: debouncedSearch || undefined,
    Status: debouncedStatus || undefined,
    Cohort: debouncedCohort || undefined,
    Course: debouncedCourse || undefined,
  });

  const totalPages = students?.data?.totalPages || 0;
  const totalItems = students?.data?.totalCount || 0;
  const rawData = students?.data?.items || [];

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  // Filter handlers
  const handleSearchChange = (value: string) => {
    setSearch(value);
    resetPage();
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    resetPage();
  };

  const handleCohortChange = (value: string) => {
    setSelectedCohort(value);
    resetPage();
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    resetPage();
  };

  // Columns definition
  const columns = useRegisteredColumns({
    handleClickView: (row) => {
      setSelectedStudent(row);
      setViewStudentOpen(true);
    },
    handleAddToClass: (id: string) => console.log("Add to class:", id),
    total: rawData?.length || 0,
  });

  // Extract filter options dynamically (could also come from API)
  const uniqueStatuses = Array.from(new Set(rawData.map((s: TRegistered) => s.accountStatus).filter(Boolean)));
 

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
        <div className="pt-6 pb-4 px-4 flex justify-between flex-wrap gap-4">
          <p className="header">RECENTLY JOINED</p>
        </div>

        <div className="flex justify-between items-center px-3 flex-wrap gap-2">
          {/* Search */}
          <TableSearchInput
            searchTerm={search}
            onSearchChange={handleSearchChange}
            onClearSearch={() => setSearch("")}
            placeholder="Search by name, email, phone..."
            className="w-90"
          />

          {/* Filters */}
          <div className="pb-4 flex flex-wrap gap-2">
            <CustomSelect
              value={selectedStatus}
              handleChange={handleStatusChange}
              data={uniqueStatuses}
              placeholder="Filter by Status"
              className="w-[150px]"
              includeAll
              allLabel="All Statuses"
              // valueKey="id"
            />

            <CustomSelect
              value={selectedCohort}
              handleChange={handleCohortChange}
              // data={uniqueCohorts}
              data={cohorts?.items || []}
              placeholder="Filter by Cohort"
              labelKey={(cohort: any) => cohort.note || cohort.name || `Cohort ${cohort.id}`} // Custom label function
              className="w-[180px]"
              
              allLabel="All Cohorts"
              valueKey="id"
              includeAll={true}
            />

            <CustomSelect
              value={selectedCourse}
              handleChange={handleCourseChange}
              // data={uniqueCourses}
              data={courses?.items || []}
              placeholder="Filter by Course"
              labelKey="courseName" 
              className="w-[200px]"
              valueKey="id"
              includeAll={true}
              allLabel="All Courses"
            />
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton rows={6} />
        ) : !rawData || rawData.length < 1 ? (
          <Empty />
        ) : (
          <>
            <Table<TRegistered> columns={columns} data={rawData} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={pageSize}
              onPageChange={setPage}
              onItemsPerPageChange={handlePageSizeChange}
            />
          </>
        )}
      </section>
    </>
  );
};

export default RegisteredTable;
