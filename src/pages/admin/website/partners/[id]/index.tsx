// "use client"

import Container from "@/layout/admin/container";

import PartnerStudentTable from "@/layout/admin/tables/partner/view-partner";
import CreatePartner from "@/layout/general/modals/partnership";
import { useGetPartners, useGetPartnersById,  } from "@/services/partnership.service";
import { useRouter } from "next/router";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";



const ViewPartners = () => {
 
    const router: any = useRouter();
    const { id } = router.query;
    console.log("ID: ", id);
    const [open, setOpen] = useState(false);
    const { refetch } = useGetPartners();
    const { data: partnerData } = useGetPartnersById(id as string);

    return (
        <>
            <CreatePartner
                handleClose={() => setOpen(false)}
                open={open}
                refetch={refetch}
            />
            <Container active="Partnership">
                <section className="container py-6 h-full overflow-y-auto scrollbar-none">
                    <div className="w-full flex items-center justify-between p-4 p">
                        <div className="flex items-center gap-10">
                            <IoArrowBack size={25} className="cursor-pointer" onClick={() => history.back()} />
                            <p className="header">PARTNERSHIP/ <span className="text-black">{partnerData?.data?.partnerName}</span></p>
                        </div>
                    </div>
                    {/* <PartnerStudentTable refetchStudent={refetchStudent} data={studentData?.data?.items} /> */}
                    <PartnerStudentTable />
                    {/* <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    /> */}
                </section>
            </Container>
        </>
    );
};

export default ViewPartners;
