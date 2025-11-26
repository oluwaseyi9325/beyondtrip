// import Button from '@/components/button';
import Container from '@/layout/advertiser/container';
import Tabs from '@/components/tab';
import CampaignTable from '@/layout/advertiser/tables/campaigns';
import { campaignData } from '@/data/campaign';
import PolicyCard from '@/layout/advertiser/campaign/policy-card';
import CreateCampaign from '@/layout/advertiser/campaign/create-campaign';
import UploadCreative from '@/layout/advertiser/campaign/upload-creative';
import PendSaveCampaigns from '@/layout/advertiser/campaign/pend-save-campaign';

function Earnings() {


    const tabsData: any = [
        {
            title: "Manage Campaigns",
            content: (
                <div className=' mt-4'>
                    <PolicyCard/>
                    <CampaignTable data={campaignData} />
                </div>
            )
        },
        {
            title: "Create New Campaign",
            content: <CreateCampaign/>
        },
        {
            title: "Upload Creative",
            content: <UploadCreative/>
        },
        {
            title: "Pending/Saved Campaign",
           content: <PendSaveCampaigns/>
        }
    ];
    return (
      <Container title="Campaigns" active="Campaigns">
        <div>
          <Tabs tabs={tabsData} defaultTab={0} />
        </div>
      </Container>
    );
}

export default Earnings;