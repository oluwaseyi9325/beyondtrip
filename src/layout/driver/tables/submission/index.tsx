"use client";

import { useState } from "react";
import Table from "@/components/table";
import Pagination from "@/components/pagination";
import TableSkeleton from "@/components/skeleton";

import { useGetAssignmentSubmissions } from "@/services/assignment.service";
// import { useDebounce } from "use-debounce";
import Empty from "./empty";
import { useSubmissionColumns } from "./data";
import ViewSubmission from "@/layout/general/modals/submissions/ViewSubmission";

export interface TSubmissions {
  id: string;
  assignmentId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  submittedDate: string | null;
  submissionComment: string | null;
  answer: string | null; // could be a text answer or file link
  attachmentLinks: string[]; // array of uploaded file URLs
  awardedMark: number | null; // if driver grades
  isGraded: boolean;
}






const SubmissionsTable = ({ assignmentId }: { assignmentId: string }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const [search, setSearch] = useState("");
  // const [debouncedSearch] = useDebounce(search, 500);

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<TSubmissions | null>(null);

  const { data, isLoading, refetch } = useGetAssignmentSubmissions(assignmentId);
  const submissions = data?.data || [];

  const handleClickView = (submission: TSubmissions) => {
    setSelectedSubmission(submission);
    setViewOpen(true);
  };

  const columns = useSubmissionColumns({ handleClickView });

  const totalPages = 1; // adjust if backend supports paging
  const totalItems = submissions.length;

  return (
    <>
      <ViewSubmission
        data={selectedSubmission}
        open={viewOpen}
        handleClose={() => {
          setViewOpen(false);
          setSelectedSubmission(null);
        }}
        refetch={refetch}
      />

      {/* <div className="p-3 flex justify-between gap-2 items-center">
        <Search search={search} handleChange={(e) => setSearch(e.target.value)} />
      </div> */}

      {isLoading ? (
        <TableSkeleton />
      ) : submissions.length < 1 ? (
        <Empty />
      ) : (
        <>
          <Table<TSubmissions> columns={columns} data={submissions} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={pageSize}
            onPageChange={setPage}
            onItemsPerPageChange={setPageSize}
          />
        </>
      )}
    </>
  );
};

export default SubmissionsTable;
