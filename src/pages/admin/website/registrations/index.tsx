import Button from "@/components/button";
import { exportApplications } from "@/helpers/exports/export-applications";
// import Search from "@/components/input/search";
// import Pagination from "@/components/pagination";
// import TableSkeleton from "@/components/skeleton";
// import { exportApplications } from "@/helpers/exports/export-applications";
import Container from "@/layout/admin/container";
import ApplicationsTable from "@/layout/admin/tables/applications";
import { useGetApplications } from "@/services/student.service";
import toast from "react-hot-toast";
// import Empty from "@/layout/admin/tables/applications/empty";
// import { useGetApplications } from "@/services/student.service";
// import { useState } from "react";
// import toast from "react-hot-toast";
import { GoDownload } from "react-icons/go";
// import { useDebounce } from "use-debounce";

const Registrations = () => {
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10); // Add pageSize state
  // const [search, setSearch] = useState("");
  // const [debouncedSearch] = useDebounce(search, 500);
  // const {
  //   data: applications,
  //   isLoading,
  //   refetch,
  // } = useGetApplications({
  //   SearchKey: debouncedSearch,
  //   Page: page,
  //   PageSize: pageSize, // Use dynamic pageSize
  // });

  const {
    data: applications,
    // isLoading,
    // refetch,
  } = useGetApplications();

  // const totalPages = applications?.data?.totalPages || 0;
  // const totalItems = applications?.data?.totalCount || 0; // Get total count
  const applicationsData = applications?.data?.items || [];

  const handleExport = () => {
    exportApplications(applicationsData);
    toast.success("Applications exported successfully!");
  };

  // const handlePageSizeChange = (newPageSize: number) => {
  //   setPageSize(newPageSize);
  //   setPage(1); // Reset to first page when page size changes
  // };

  return (
    <Container active="Registrations">
      <section className="container py-6 h-full overflow-y-auto scrollbar-non mb-10 pb-10">
        <div className="w-full flex items-center justify-between p-4 p">
          <p className="header">Registrations</p>
          {/* <Search
            search={search}
            handleChange={(e) => setSearch(e.target.value)}
          /> */}
          <Button
            hasIcon
            icon={<GoDownload size={20} />}
            size="md"
            className="max-w-25 text-white"
            handleClick={handleExport}
            disabled={!applicationsData.length}
          >
            Export
          </Button>
        </div>
        <ApplicationsTable
              
            />
     
      
      </section>
    </Container>
  );
};

export default Registrations;