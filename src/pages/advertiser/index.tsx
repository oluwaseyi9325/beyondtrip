// import Button from '@/components/button';
import Container from '@/layout/advertiser/container';
import EarningTable from '@/layout/driver/tables/earnings';
import { FaWallet } from 'react-icons/fa';
import UpcomingPayout from '@/layout/driver/earning/upcoming-payout';
import BankDetails from '@/layout/driver/earning/bank-details';
import AvailableBalance from '@/layout/driver/earning/available-balance';
import Stats from '@/ui/stats';
import CampaignTable from '@/layout/advertiser/tables/campaigns';
import { earningData } from '@/data/earningData';
import { campaignData } from '@/data/campaign';
import { CustomGraph } from '@/layout/general/graph/CustomGraph';
import { QuickActions } from '@/layout/advertiser/quick-actions';

function Earnings() {


  const Statistics: any = [
    {
     icon: null,
      title: "Active Campaigns",
      figure: "500",
    },
    {
     icon: null,
      title: "Impressions",
      figure: "500",
    },
  
  ];

  return (
    <Container>
      <section className="w-full px-4 py-6 flex flex-col gap-6">
        <div className="flex items-start justify-between ">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="lg:text-3xl text-xl font-bold text-gray-900">
                Hello, Samuel Emmaeus
              </h1>
              
            </div>
            <p className="text-base text-gray-600">
              Here’s how your campaigns are performing
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Stats grid={2} data={Statistics} />
        </div>
      
        <CustomGraph h="h-90" title='Ad Spend' />
         <CustomGraph h="h-90" title='Campaign Performance'/>
        <QuickActions />
        <div className=" overflow-hidden">
          <CampaignTable compactHeader data={campaignData} />
        </div>
      </section>
    </Container>
  );
}

export default Earnings;