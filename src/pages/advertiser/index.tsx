// import Button from '@/components/button';
import Container from '@/layout/advertiser/container';
import { EarningsGraph, QuickActions } from '@/layout/driver/dashboard';
import EarningTable from '@/layout/driver/tables/earnings';
import { FaWallet } from 'react-icons/fa';
import UpcomingPayout from '@/layout/driver/earning/upcoming-payout';
import BankDetails from '@/layout/driver/earning/bank-details';
import AvailableBalance from '@/layout/driver/earning/available-balance';
import Stats from '@/ui/stats';
import CampaignTable from '@/layout/advertiser/tables/campaigns';
import { earningData } from '@/data/earningData';
import { campaignData } from '@/data/campaign';

function Earnings() {
  // Mock data - replace with your actual data
  const totalEarnings = 165000.00;
  const availableBalance = 55000.00;
  const upcomingPayout = 55000.00;
  const payoutDate = "Dec. 22";
  const bankName = "First Bank";
  const accountNumber = "0029394827";

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



        {/* Earnings Table */}
        <EarningsGraph h="h-90" />
        <EarningsGraph h="h-90" />
        <QuickActions />
        <div className="bg-white border border-gray-200  overflow-hidden">
          <CampaignTable data={campaignData} />
       
        </div>
      </section>
    </Container>
  );
}

export default Earnings;