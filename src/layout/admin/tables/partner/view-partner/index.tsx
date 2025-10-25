import Table from "@/components/table";
import { useTutorColumns } from "./data";
import { useState } from "react";
import ViewPartnerStudent from "@/layout/general/modals/student/view-partner-student";
import { useGetPartnerStudents } from "@/services/partnership.service";
import Pagination from "@/components/pagination";
import Search from "@/components/input/search";
import CustomSelect from "@/components/input/CustomSelect";
import { useDebounce } from "use-debounce";
import TableSkeleton from "@/components/skeleton";
import Empty from "./empty";
import { useGetCourses } from "@/services/course.service";

export interface TTutor {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  date: string;
  accountStatus: string;
  courseApplyingFor?: string;
  stateOrRegion?: string;
  country?: string;
  applicationStatus?: string;
}

const PartnerStudentTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCourse, setSelectedCourse] = useState(""); // Course filter
  const [selectedStatus, setSelectedStatus] = useState(""); // Status filter
  const [viewStudentOpen, setViewStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TTutor | null>(null);
  
  const { data: courses, isLoading: coursesLoading } = useGetCourses();

  // Debounce filters - same pattern as ApplicationsTable
  const [debouncedSearch] = useDebounce(search, 500);
  const [debouncedCourse] = useDebounce(selectedCourse, 300);
  const [debouncedStatus] = useDebounce(selectedStatus, 300);

  // Reset page when filters change
  const resetPage = () => {
    if (page !== 1) setPage(1);
  };

  // Call API with filters directly - improved to match ApplicationsTable pattern
  const { data, refetch: refetchStudent, isLoading } = useGetPartnerStudents({
    Page: page,
    PageSize: pageSize,
    SearchKey: debouncedSearch || undefined, 
    CourseApplyingFor: debouncedCourse || undefined,
    ApplicationStatus: debouncedStatus || undefined,
  });

  const totalItems = data?.data?.totalCount || 0;
  const totalPages = data?.data?.totalPages || 0;

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    resetPage();
  };

  // Improved filter handlers - same pattern as ApplicationsTable
  const handleCourseChange = (courseValue: string) => {
    setSelectedCourse(courseValue);
    resetPage();
  };

  const handleStatusChange = (statusValue: string) => {
    setSelectedStatus(statusValue);
    resetPage();
  };

  const handleAddToClass = (studentId: string) => {
    const student = data?.data?.items.find((s: any) => s.id === studentId);
    if (student) {
      setSelectedStudent(student);
    }
  };

  const columns = useTutorColumns({
    handleClickView: (row) => {
      setSelectedStudent(row);
      setViewStudentOpen(true);
    },
    handleAddToClass,
    total: data?.data?.items?.length || 0,
  });

  // Create status options for the filter - you can customize this list
  const statusOptions = [
    "Pending",
    "Approved", 
    "Rejected",
    "In Review",
    "Completed"
    // Add more statuses as needed based on your application's requirements
  ];

  // Show loading states - same pattern as ApplicationsTable
  const showLoading = isLoading || coursesLoading;

  return (
    <>
      <ViewPartnerStudent
        data={selectedStudent}
        open={viewStudentOpen}
        refetchStudent={refetchStudent}
        handleClose={() => {
          setViewStudentOpen(false);
          setSelectedStudent(null);
        }}
      />

      <div className="p-3 flex justify-between gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Search search={search} handleChange={handleSearchChange} />

          {/* Course filter - same pattern as ApplicationsTable */}
          <CustomSelect
            value={selectedCourse}
            handleChange={handleCourseChange}
            data={courses?.items || []}
            placeholder="Filter by Course"
            className="w-[200px]"
            disabled={coursesLoading}
            labelKey="courseName"  // Show courseName as label
            valueKey="id"         // Use id as value
            includeAll={true}
            allLabel="All Courses"
          />

          {/* Status filter - using predefined options instead of dynamic ones */}
          <CustomSelect
            value={selectedStatus}
            handleChange={handleStatusChange}
            data={statusOptions}
            placeholder="Filter by Status"
            className="w-[150px]"
            includeAll={true}
            allLabel="All Statuses"
          />
        </div>
      </div>

      {/* Results display - same pattern as ApplicationsTable */}
      {showLoading ? (
        <TableSkeleton />
      ) : !data?.data?.items || data?.data?.items?.length < 1 || data?.data?.totalCount < 1 ? (
        <Empty />
      ) : (
        <>
          <Table<TTutor> columns={columns} data={data?.data?.items} />
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
    </>
  );
};

export default PartnerStudentTable;