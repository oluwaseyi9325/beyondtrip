import Tabs from "@/components/tab"
import Container from "@/layout/advertiser/container"
import BasicDetailsContent from "@/layout/general/profile-details";
// import BankDetailsContent from "@/layout/driver/profile/bank-details-content";
import Ratings from "@/layout/driver/profile/ratings";
import NotificationList from "@/layout/general/notification-item";
import Pricing from "@/layout/advertiser/modal/plan";

const Security = () => {
  const tabsData: any = [
    {
      title: "Basic Details",
      content: <BasicDetailsContent />
    },
    {
      title: "Notifications",
      content: <NotificationList />
    },
    {
      title: "Pricing Tiers/Payment Options",
      content: <Pricing/>
    }
  ];

  return (
    <>
      <Container active="Profile">
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