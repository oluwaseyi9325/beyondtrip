import Table from "@/components/table";
import { useRegisteredColumns } from "./data";
import TableSkeleton from "@/components/skeleton";
import { useState } from "react";
import { useTableSearch } from "@/hooks/use-table-search";
import TableSearchInput from "../table-search-input";
import { useGetWebinars } from "@/services/webinars.service";
import Button from "@/components/button";
import { GoPlus } from "react-icons/go";
import CreateWebinar from "@/layout/general/modals/webinar/create-webinar";
import Pagination from "@/components/pagination";
export interface TRegistered {
  identityId: string | null;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  name: string;
  startDate: string;
  endDate: string;
  endTime: string;
  description: string;
  hostNames: string[];
  guestNames: string[];
  id: string;
  startTime: string;
}

const WebinarsTable = () => {
  const [viewStudentOpen, setViewStudentOpen] = useState(false);
  const [page, setPage] = useState(1);


  const { data: webinarData, isLoading } = useGetWebinars(
    {
      Page: page,
    PageSize: 10,
    }
  )

  const rawData = webinarData?.data || [];
  console.log("Webinar Data raw:", rawData);
  const totalPages = webinarData?.data?.totalPages || 0;

  // ✅ Step 2: Apply select filters


  // ✅ Step 3: Apply search on filtered data
  const {
    searchTerm,
    setSearchTerm,
    filteredData: filteredStudents,
    clearSearch,
    totalResults,
  } = useTableSearch({
    data: rawData,
    searchFields: ["name",],
  });

  // ✅ Columns definition
  const columns = useRegisteredColumns({
    handleClickView: () => {
      setViewStudentOpen(true);
    },
    handleAddToClass: (id: string) => console.log("Add to class:", id),
    total: totalResults,
  });

  return (
    <>
      <CreateWebinar
        // data={selectedStudent}
        classId=""
        open={viewStudentOpen}
        handleClose={() => {
          setViewStudentOpen(false);
        }}
      />

      <section className="container">
        <div className="pt-6 pb-4 px-4 flex justify-between flex-wrap gap-4">
          <p className="header">WEBINARS</p>

          <Button
              size="md"
              className="max-w-[160px] text-white text-sm font-[600]"
              hasIcon
              icon={<GoPlus size={20} />}
              handleClick={() => setViewStudentOpen(true)}
            >
              Create Webinar
            </Button>
        </div>
        <div className="flex justify-between items-center px-4 mb-3">
        <TableSearchInput
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClearSearch={clearSearch}
            placeholder="Search by name,email,phonenumber..."
            className="w-96"
          />
      
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

export default WebinarsTable;
