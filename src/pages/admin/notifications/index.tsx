import Tabs from "@/components/tab"
import Container from "@/layout/admin/container"
import BasicDetailsContent from "@/layout/general/profile-details";
import BankDetailsContent from "@/layout/driver/profile/bank-details-content";
import Ratings from "@/layout/driver/profile/ratings";

const Security = () => {
  const tabsData: any = [
    {
      title: "Drivers",
      content: <BasicDetailsContent />
    },
    {
      title: "Advertisers",
      content: <BankDetailsContent />
    },
    {
      title: "Payment",
      content: <Ratings />
      },
    {
      title: "System",
      content: <Ratings />
      },
   
  ];

  return (
    <>
      <Container active="Nofifications">
        {/* <section className=" py-6 h-full overflow-y-hidden"> */}
        <div className="py-6">
          <Tabs tabs={tabsData} defaultTab={0} />
        </div>
        {/* </section> */}
      </Container>


    </>
  )
}

export default Security