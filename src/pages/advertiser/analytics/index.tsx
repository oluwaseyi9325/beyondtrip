// import Button from '@/components/button';
import Container from '@/layout/advertiser/container';
import { EarningsGraph } from '@/layout/driver/dashboard';
import EarningTable from '@/layout/driver/tables/earnings';
import { FaWallet } from 'react-icons/fa';
// import { MdArrowForward } from 'react-icons/md';
// import { earningData } from './history';
import UpcomingPayout from '@/layout/driver/earning/upcoming-payout';
import BankDetails from '@/layout/driver/earning/bank-details';
import AvailableBalance from '@/layout/driver/earning/available-balance';
import { earningData } from '@/data/earningData';

function Earnings() {
  // Mock data - replace with your actual data
  const totalEarnings = 165000.00;
  const availableBalance = 55000.00;
  const upcomingPayout = 55000.00;
  const payoutDate = "Dec. 22";
  const bankName = "First Bank";
  const accountNumber = "0029394827";

  return (
    <Container active="Analytics">
      <section className="w-full px-4 py-6 flex flex-col gap-6"> 
        <div className="overflow-hidden">
          <EarningTable data={earningData} />
        </div>
      </section>
    </Container>
  );
}

export default Earnings;