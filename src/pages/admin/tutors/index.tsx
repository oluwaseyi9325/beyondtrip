import Button from "@/components/button";
import Pagination from "@/components/pagination";
import TableSkeleton from "@/components/skeleton";
import Container from "@/layout/admin/container";
import TutorTable from "@/layout/admin/tables/tutor";
import Empty from "@/layout/admin/tables/tutor/empty";
import AddTutor from "@/layout/general/modals/tutor/add-tutor";
import { useGetTutors } from "@/services/tutor.service";
import { useState } from "react";
import { GoPlus } from "react-icons/go";

const Tutor = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: tutors,
    isLoading,
    refetch,
  } = useGetTutors({
    PageSize: 30,
    Page: page,
  });
  const totalPages = tutors?.data?.totalPages || 0;
  return (
    <>
      <AddTutor
        open={open}
        handleClose={() => setOpen(false)}
        refetch={refetch}
      />

      <Container active="Instructors">
        <section className="container py-6 h-full overflow-y-auto scrollbar-none">
          <div className="w-full flex items-center justify-between p-4 p">
            <p className="header">INSTRUCTORS</p>

            <Button
              size="md"
              className="max-w-[160px] text-white text-sm font-[600]"
              hasIcon
              icon={<GoPlus size={20} />}
              handleClick={() => setOpen(true)}
            >
              Invite Instructor
            </Button>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : !tutors || tutors?.length < 1 || tutors?.data?.totalCount < 1 ? (
            <Empty handleClick={() => setOpen(true)} />
          ) : (
                <>
                  <TutorTable data={tutors?.data?.items} />
                  <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
                </>
          )}
        </section>
      </Container>
    </>
  );
};

export default Tutor;
