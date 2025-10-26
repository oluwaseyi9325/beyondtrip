// import Button from '@/components/button';
import Container from '@/layout/driver/container';
import { EarningsGraph } from '@/layout/driver/dashboard';
import EarningTable from '@/layout/driver/tables/earnings';
import { FaWallet } from 'react-icons/fa';
// import { MdArrowForward } from 'react-icons/md';
import { earningData } from './history';
import UpcomingPayout from '@/layout/driver/earning/upcoming-payout';
import BankDetails from '@/layout/driver/earning/bank-details';
import AvailableBalance from '@/layout/driver/earning/available-balance';

function Earnings() {
  // Mock data - replace with your actual data
  const totalEarnings = 165000.00;
  const availableBalance = 55000.00;
  const upcomingPayout = 55000.00;
  const payoutDate = "Dec. 22";
  const bankName = "First Bank";
  const accountNumber = "0029394827";

  return (
    <Container active="Earnings">
      <section className="w-full px-4 py-6 flex flex-col gap-6">
        {/* Top Row: Total Earnings and Available Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Total Earnings Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm col-span-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaWallet size={20} className="text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Total Earnings</h2>
              </div>
              <h3 className="text-4xl font-bold text-gray-900">
                ₦{totalEarnings.toLocaleString()}
              </h3>
            </div>
          </div>

          {/* Available Balance Card */}
          <AvailableBalance availableBalance={availableBalance} />
         
        </div>

        {/* Bottom Row: Upcoming Payout and Bank Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Payout Card */}
          <UpcomingPayout upcomingPayout={upcomingPayout} payoutDate={payoutDate} />
          {/* Bank Details Card */}
          <BankDetails bankName={bankName } accountNumber={accountNumber} />
        
        </div>

        {/* Earnings Table */}
        <EarningsGraph h="h-90" />
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <EarningTable data={earningData} />
        </div>
      </section>
    </Container>
  );
}

export default Earnings;