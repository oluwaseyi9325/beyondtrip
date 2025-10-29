import Button from "@/components/button";
import Pagination from "@/components/pagination";
import TableSkeleton from "@/components/skeleton";
import Container from "@/layout/admin/container";
import AmbassadorTable from "@/layout/admin/tables/ambassador";
import Empty from "@/layout/admin/tables/ambassador/empty";
import AddAmbassador from "@/layout/general/modals/ambassador/add-ambassador";
import { useGetAmbassador } from "@/services/ambassador.service";
import { useState } from "react";
import { GoPlus } from "react-icons/go";

const Ambassador = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: ambassadors,
    isLoading,
    refetch,
  } = useGetAmbassador({
    Page: page,
    PageSize: 10,
  });
  const totalPages = ambassadors?.data?.totalPages || 0;

  return (
    <>
      <AddAmbassador
        open={open}
        handleClose={() => setOpen(false)}
        refetch={refetch}
      />

      <Container active="Ambassador">
        <section className="container py-6 h-full overflow-y-auto scrollbar-none">
          <div className="w-full flex items-center justify-between p-4 p">
            <p className="header">AMBASSADOR</p>

            <Button
              size="md"
              className="max-w-[160px] text-white text-sm font-[600]"
              hasIcon
              icon={<GoPlus size={20} />}
              handleClick={() => setOpen(true)}
            >
              Add Ambassador
            </Button>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : !ambassadors || ambassadors?.length < 1 || ambassadors?.data?.totalCount < 1 ? (
            <Empty handleClick={() => setOpen(true)} />
          ) : (
                <>
                <AmbassadorTable data={ambassadors?.data?.items} />
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

export default Ambassador;
