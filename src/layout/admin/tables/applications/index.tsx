import { useState } from "react";
import Table from "@/components/table";
import { useApplicationsColumns } from "./data";
import { useGetCohorts } from "@/services/cohort.service";
import { useAdmitadvertiser, useGetApplications } from "@/services/advertiser.service";
import toast from "react-hot-toast";
import { useTableSearch } from "@/hooks/use-table-search";
import { SelectFilter, useSelectFilters } from "../SelectFilter";
import ViewRegistration from "@/layout/general/modals/registrations/view-registration";
import { useDebounce } from "use-debounce";
import Search from "@/components/input/search";
import CustomSelect from "@/components/input/CustomSelect";
import Pagination from "@/components/pagination";
import TableSkeleton from "@/components/skeleton";
import Empty from "./empty";
import { useGetCourses } from "@/services/course.service";

export interface TCourse {
  id: string;
  courseName: string;
}

export interface TApplications {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  country: string;
  addedDate: string;
  state: string;
  city: string;
  isSAP: boolean;
  gender: "Male" | "Female" | string;
  employementStatus: "Fulltime" | "Parttime" | "Unemployed" | string;
  sapProgram: string | null;
  paymentStatus: "Paid" | "Not Paid" | string;
  sapOption: string | null;
  course: TCourse;
  ambassador: string | null;
  cohortId: string;
  hasExperience: boolean;
  isWillingToPayApplicationFee: boolean;
  isWillingToPayTuitionFee: boolean;
  goalOfJoining: string;
  howDidYouHearAboutUs: string;
  paymentUrl: string | null;
  applicationFeePayment: string | null;
  promoData: string | null;
}

const ApplicationsTable = () => {
  // State for ViewRegistration modal
  const [viewadvertiserOpen, setViewadvertiserOpen] = useState(false);
  const [selectedadvertiser, setSelectedadvertiser] = useState<TApplications | null>(null);

  const { data: cohorts } = useGetCohorts({
    PageSize: 30,
  });

  const latestCohort = cohorts?.items?.reduce((max: any, curr: any) => {
    const maxNum = parseInt(max.note.replace(/\D/g, ""), 10);
    const currNum = parseInt(curr.note.replace(/\D/g, ""), 10);
    return currNum > maxNum ? curr : max;
  });

  const admit = useAdmitadvertiser();

  // Function to handle viewing advertiser details
  const handleClickView = (advertiser: TApplications) => {
    setSelectedadvertiser(advertiser);
    setViewadvertiserOpen(true);
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(""); // Course filter state
  const [selectedCohort, setSelectedCohort] = useState(""); // Cohort filter state
  const [selectedPayment, setSelectedPayment] = useState(""); // Payment filter state

  // Debounce filters
  const [debouncedSearch] = useDebounce(search, 500);
  const [debouncedCourse] = useDebounce(selectedCourse, 300);
  const [debouncedCohort] = useDebounce(selectedCohort, 300);
  const [debouncedPayment] = useDebounce(selectedPayment, 300);

  // Reset page when filters change
  const resetPage = () => {
    if (page !== 1) {
      setPage(1);
    }
  };

  const {
    data: applications,
    isLoading,
    refetch,
  } = useGetApplications({
    SearchKey: debouncedSearch,
    CourseId: debouncedCourse || undefined,
    CohortId: debouncedCohort || undefined,
    PaymentStatus: debouncedPayment || undefined,
    Page: page,
    PageSize: pageSize,
  });

  const { data: courses, isLoading: coursesLoading } = useGetCourses();

  const totalPages = applications?.data?.totalPages || 0;
  const totalItems = applications?.data?.totalCount || 0;

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    resetPage();
  };

  const handleCourseChange = (courseValue: string) => {
    setSelectedCourse(courseValue);
    resetPage();
  };

  const handleCohortChange = (cohortValue: string) => {
    setSelectedCohort(cohortValue);
    resetPage();
  };



  const columns = useApplicationsColumns({
    onAdmit: (id) => {
      admit.mutate(
        { cohortId: latestCohort?.id, advertiserId: id },
        {
          onSuccess: () => {
            toast.success("advertiser admitted successfully!");
            if (refetch) refetch();
          },
        }
      );
    },
    totalItems: applications?.data?.items?.length,
    loading: admit?.isPending,
    handleClickView,
  });

  const selectFilters: SelectFilter[] = [
    {
      key: "payment",
      label: "Payment",
      getValue: (item: TApplications) => item.paymentStatus,
    },
  ];

  const {
    filteredData: dataFilteredBySelects,
  } = useSelectFilters({
    data: applications?.data?.items || [],
    filters: selectFilters,
  });

  const {
    filteredData: filterApplication,
  } = useTableSearch({
    data: dataFilteredBySelects,
    searchFields: ["emailAddress", "lastName", "firstName"],
  });

  // Show loading states
  const showLoading = isLoading || coursesLoading;

  return (
    <>
      <ViewRegistration
        data={selectedadvertiser}
        open={viewadvertiserOpen}
        handleClose={() => {
          setViewadvertiserOpen(false);
          setSelectedadvertiser(null);
        }}
        refetch={refetch}
      />

      <div className="p-3 flex justify-between gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Search
            search={search}
            handleChange={handleSearchChange}
          />


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


          <CustomSelect
            value={selectedCohort}
            handleChange={handleCohortChange}
            data={cohorts?.items || []}
            placeholder="Filter by Cohort"
            className="w-[150px]"
            labelKey={(cohort: any) => cohort.note || cohort.name || `Cohort ${cohort.id}`} // Custom label function
            valueKey="id"
            includeAll={true}
            allLabel="All Cohorts"
          />

          <CustomSelect
            value={selectedPayment}
            handleChange={setSelectedPayment}
            data={["Paid", "Not Paid"]}
            placeholder="Payment Status"
            className="w-[150px]"
            includeAll={true}
            allLabel="All Payments"
          />
        </div>


      </div>

      <>
        {showLoading ? (
          <TableSkeleton />
        ) : !applications?.data ||
          applications?.data?.length < 1 ||
          applications?.data?.totalCount < 1 ? (
          <Empty />
        ) : (
          <>
            <Table<TApplications> columns={columns} data={filterApplication} />
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
    </>
  );
};

export default ApplicationsTable;