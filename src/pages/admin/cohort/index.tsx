import Button from "@/components/button";
import Pagination from "@/components/pagination";
import TableSkeleton from "@/components/skeleton";
import Container from "@/layout/admin/container";
import CohortTable from "@/layout/admin/tables/cohorts";
import Empty from "@/layout/admin/tables/cohorts/empty";
import AddCohort from "@/layout/general/modals/cohort/add-cohort";
import { useGetCohorts } from "@/services/cohort.service";
import { useState } from "react";
import { GoPlus } from "react-icons/go";

const Cohort = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null); // Changed to editData
  const [page, setPage] = useState(1);
  const {
    data: cohorts,
    isLoading,
    refetch,
  } = useGetCohorts({
    PageSize: 30,
    Page: page,
  });

  const totalPages = cohorts?.totalPages || 0;
  const handleEdit = (cohort: any) => {
    setEditData(cohort); // Changed to setEditData
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(null); // Changed to setEditData
  };

  return (
    <>
      <AddCohort
        open={open}
        handleClose={handleClose}
        refetch={refetch}
        editData={editData} // Changed to editData
      />

      <Container active="Cohort">
        <section className="container py-6 h-full overflow-y-auto scrollbar-none">
          <div className="w-full flex items-center justify-between p-4 p">
            <p className="header">COHORTS</p>

            <Button
              size="md"
              className="max-w-[160px] text-white text-sm font-[600]"
              hasIcon
              icon={<GoPlus size={20} />}
              handleClick={() => setOpen(true)}
            >
              Create Cohort
            </Button>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : !cohorts || cohorts?.length < 1 || cohorts?.totalCount < 1 ? (
            <Empty handleClick={() => setOpen(true)} />
          ) : (
                <>
                  <CohortTable data={cohorts?.items} onEdit={handleEdit} />
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

export default Cohort;