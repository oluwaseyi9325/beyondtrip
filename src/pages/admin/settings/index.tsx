import Tabs from "@/components/tab"
import Container from "@/layout/admin/container"
import BasicDetailsContent from "@/layout/general/profile-details";
import BankDetailsContent from "@/layout/driver/profile/bank-details-content";
import Ratings from "@/layout/driver/profile/ratings";
import AccountDetailsTab from "@/layout/admin/account";
import SystemPreferencesTab from "@/layout/admin/preferences";
import RolesPermissionsTab from "@/layout/admin/permission";
import SystemConfigurationTab from "@/layout/admin/configuration";

const Security = () => {
  const tabsData: any = [
    {
      title: "Account",
      // content: <BasicDetailsContent />
      content: <AccountDetailsTab />

    },
    {
      title: "System Preferences",
      content: <SystemPreferencesTab />
    },
    {
      title: "Payments",
      content: <Ratings />
      },
    {
      title: "Roles & Permissions",
      content: <RolesPermissionsTab />
      },
    {
      title: "System Configurations",
      content: <SystemConfigurationTab />
    }
  ];

  return (
    <>
      <Container title="Settings" active="Settings">
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