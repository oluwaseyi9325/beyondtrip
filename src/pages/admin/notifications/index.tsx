import Tabs from "@/components/tab"
import Text from "@/components/typography";
import Container from "@/layout/admin/container"
import AdvertiserNotifications from "@/layout/admin/notification/advertiser";
import DriverNotifications from "@/layout/admin/notification/drivers";
import PaymentNotifications from "@/layout/admin/notification/payment";
import SystemNotifications from "@/layout/admin/notification/system";


const Security = () => {
  const tabsData: any = [
    {
      title: "Drivers",
      content: <DriverNotifications />
    },
    {
      title: "Advertisers",
      content: <AdvertiserNotifications />
    },
    {
      title: "Payment",
      content: <PaymentNotifications />
    },
    {
      title: "System",
      content: <SystemNotifications />
    },

  ];

  return (
    <>

       {/* <Container title="Settings" active="Settings"> */}
      <Container title="Notifications" active="Notifications">

        {/* <section className=" py-6 h-full overflow-y-hidden"> */}
        <div className="py-6">
          <Text className="text-2xl mb-6" weight="700" color="black">
            Notifications Management
          </Text>

          <Tabs tabs={tabsData} defaultTab={0} />
        </div>
        {/* </section> */}
      </Container>


    </>
  )
}

export default Security