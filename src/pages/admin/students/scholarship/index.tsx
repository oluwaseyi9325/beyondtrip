import Button from "@/components/button";
import Pagination from "@/components/pagination";
import Container from "@/layout/admin/container";
import ScholarshipTable from "@/layout/admin/tables/scholarship";
import { useGetScholarshipStudents } from "@/services/scholarship.service";
import { useState } from "react";
import { GoDownload } from "react-icons/go";

const Schorlaship = () => {
  const [page, setPage] = useState(1);
  const { data: studentData } = useGetScholarshipStudents(
    {
      Page: page,
      PageSize: 10,
    }
  )

  const totalPages = studentData?.data?.totalPages || 0;
  return (
    <Container active="Scholarship Students">
      <section className="container px-4 py-8 h-full overflow-y-auto scrollbar-none">
        <div className="flex flex-col gap-3">
          <div className="w-full flex items-center justify-between">
            <p className="header">SCHOLARSHIP</p>

            <Button
              hasIcon
              icon={<GoDownload size={20} />}
              size="md"
              className="max-w-25 text-white"
            >
              Export
            </Button>
          </div>
        </div>
        <ScholarshipTable />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>


    </Container>
  );
};

export default Schorlaship;
