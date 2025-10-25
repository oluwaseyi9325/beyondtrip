// "use client"

import Container from "@/layout/admin/container";
import CreatePartner from "@/layout/general/modals/partnership";
import { useGetPartners } from "@/services/partnership.service";
import { useRouter } from "next/router";
import { useState } from "react";
import { useGetWebinarById, useGetWebinarsRegistrationsById } from "@/services/webinars.service";
import WebinarsRegistraionTable from "@/layout/admin/tables/webinar/view-webinar";
// import Empty from "@/layout/admin/tables/tutor/empty";


const ViewWebinars = () => {
    const router: any = useRouter();
    const { id } = router.query;
    const [open, setOpen] = useState(false);
    const { refetch } = useGetPartners();
    const { data: registrationData } = useGetWebinarsRegistrationsById(id as string);
    const { data: webinarData } = useGetWebinarById(id)

    return (
        <>
            <CreatePartner
                handleClose={() => setOpen(false)}
                open={open}
                refetch={refetch}
            />
            <Container active="Webinars">
                <section className="container py-6 h-full overflow-y-hidden">
                    <WebinarsRegistraionTable data={registrationData} webinarName={webinarData?.data?.name} />
                </section>
            </Container>
        </>
    );
};

export default ViewWebinars;
