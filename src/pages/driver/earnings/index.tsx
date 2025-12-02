// import Button from '@/components/button';
import Container from '@/layout/driver/container';
import { EarningsGraph } from '@/layout/driver/dashboard';
import EarningTable from '@/layout/driver/tables/earnings';
import { FaWallet } from 'react-icons/fa';
import UpcomingPayout from '@/layout/driver/earning/upcoming-payout';
import BankDetails from '@/layout/driver/earning/bank-details';
import AvailableBalance from '@/layout/driver/earning/available-balance';
// import { earningData } from '@/data/earningData';
import { useDriverEarnings } from '@/services/earning.service';
import useAuthStore from '@/store/useAuthStore';
import { getInitials } from '@/utils/getInitials';

function Earnings() {
  const {profile}=useAuthStore()
  const { data } = useDriverEarnings()
  const earningData= data?.earnings?.recent
  console.log(data?.earnings,"earningsdsss")
  // Mock data - replace with your actual data
  const totalEarnings = data?.earnings?.total || 0;
  const availableBalance = 55000.00;
  const upcomingPayout = 55000.00;
  const payoutDate = "Dec. 22";
  const bankName = profile?.bankDetails?.bankName
  const accountNumber = profile?.bankDetails?.accountNumber
  const accountName= getInitials(profile?.firstName, profile?.lastName)

  return (
    <Container title='Earnings' active="Earnings">
      <section className=" space-y-4">
        {/* Top Row: Total Earnings and Available Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
          {/* Total Earnings Card */}
          <div className="bg-white border mb-6 lg:mb-0 border-gray-200 rounded-2xl p-6 shadow-sm col-span-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12  rounded-full bg-blue-100 flex items-center justify-center">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
          {/* Upcoming Payout Card */}
          <UpcomingPayout upcomingPayout={upcomingPayout} payoutDate={payoutDate} />
          {/* Bank Details Card */}
          <BankDetails accountName={accountName} bankName={bankName } accountNumber={accountNumber} />
        
        </div>

        {/* Earnings Table */}
        <EarningsGraph h="h-90" />
        <div className="overflow-hidden ">
          <EarningTable compactHeader data={earningData} />
        </div>
      </section>
    </Container>
  );
}

export default Earnings;