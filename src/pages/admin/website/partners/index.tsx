import Button from "@/components/button";
import Pagination from "@/components/pagination";
import Container from "@/layout/admin/container";
import PartnerTable from "@/layout/admin/tables/partner";
import CreatePartner from "@/layout/general/modals/partnership";
import { useGetPartners } from "@/services/partnership.service";
import { useState } from "react";
// import Empty from "@/layout/admin/tables/tutor/empty";
import { GoPlus } from "react-icons/go";

const Partners = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data, refetch } = useGetPartners(
    {
      Page: page,
    PageSize: 10,
    }
  );
  const totalPages = data?.data?.totalPages || 0;
  console.log("Partners Data: ", data?.data);
  return (
    <>
      <CreatePartner
        handleClose={() => setOpen(false)}
        open={open}
      // classId={id as string}
      refetch={refetch}
      />
      <Container active="Partnership">
        <section className="container py-6 h-full overflow-y-auto scrollbar-none">
          <div className="w-full flex items-center justify-between p-4 p">
            <p className="header">PARTNERS</p>

            <Button
              size="md"
              className="max-w-[170px] text-white text-sm font-[600]"
              hasIcon
              icon={<GoPlus size={20} />}
              handleClick={() => setOpen(true)}
            >
              Create Partner
            </Button>
          </div>

          {/* <Empty /> */}

          {/* <TutorTable data={[]} /> */}
         
          <PartnerTable data={data?.data?.items} />
          <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
     
        </section>
      </Container>
    </>
  );
};

export default Partners;
