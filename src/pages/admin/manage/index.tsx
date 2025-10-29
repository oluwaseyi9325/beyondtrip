import Button from "@/components/button";
import Pagination from "@/components/pagination";
import TableSkeleton from "@/components/skeleton";
import Container from "@/layout/admin/container";
import Empty from "@/layout/admin/tables/admin/empty";
import TutorTable from "@/layout/admin/tables/tutor";
import AddAdmin from "@/layout/general/modals/admin/add-admin";
import { useGetAdmins } from "@/services/admin.service";
import { useState } from "react";
import { GoPlus } from "react-icons/go";

const AdminManagement = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data: admins, isLoading, refetch } = useGetAdmins({
    PageSize: 10,
    Page: page,
    Role: "Admin",
  });
  console.log(admins?.data, "getting admins");
  const totalPages = admins?.data?.totalPages || 0;
  return (
    <>
      <AddAdmin
        open={open}
        handleClose={() => setOpen(false)}
        refetch={refetch}
      />

      <Container active="Admin Management">
        <section className="container py-6 h-full overflow-y-auto scrollbar-none">
          <div className="w-full flex items-center justify-between p-4 p">
            <p className="header">ADMINS</p>

            <Button
              size="md"
              className="max-w-[160px] text-white text-sm font-[600]"
              hasIcon
              icon={<GoPlus size={20} />}
              handleClick={() => setOpen(true)}
            >
              Invite Admin
            </Button>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : admins?.data?.totalCount < 1 ? (
            <Empty handleClick={() => setOpen(true)} />
          ) : (
            <>
              <TutorTable data={admins?.data?.items} />
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

export default AdminManagement;
