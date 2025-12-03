import Tabs from "@/components/tab"
import Container from "@/layout/driver/container"
import BasicDetailsContent from "@/layout/general/profile-details";
import BankDetailsContent from "@/layout/driver/profile/bank-details-content";
import Ratings from "@/layout/driver/profile/ratings";

const Security = () => {
  const getqueryParam = (param: string): string | null => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }
    return null;
  };

  const tabsData: any = [
    {
      title: "Basic Details",
      content: <BasicDetailsContent />
    },
    {
      title: "Bank/Payment Details",
      content: <BankDetailsContent />
    },
    {
      title: "View your ratings",
      content: <Ratings />
    }
  ];

  return (
    <>
      <Container title="Profile" active="Profile">
        {/* <section className=" py-6 h-full overflow-y-hidden"> */}
        <div className="py-6">
          <Tabs tabs={tabsData} defaultTab={getqueryParam("tab") === "ratings" ? 2 : 0} />
        </div>
        {/* </section> */}
      </Container>
    </>
  );}

export default Security