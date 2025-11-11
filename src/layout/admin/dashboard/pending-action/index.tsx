
import { MdEmail } from "react-icons/md";

// interface ActionsProps {
//   notifications?: Array<{
//     id: number;
//     title: string;
//     message: string;
//   }>;
// }

export const PendingAction = ({ pendingActions }: any) => {
  const defaultActions = [
    {
      id: 1,
      title: "Payout Alert",
      message: "₦25,000 payout sent to your bank account.",
    },
    {
      id: 2,
      title: "Campaign Approval",
      message: "ABC Digital Campaign waiting for approval",
    },
    {
      id: 3,
      title: "Payout Alert",
      message: "₦25,000 payout sent to your bank account.",
    }
  ];

  const actionList = pendingActions || defaultActions;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Pending Actions</h2>
      </div>

      <div className="space-y-4">
        {actionList?.map((action:any) => (
          <div key={action.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="h-10 w-10 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white flex-shrink-0">
              <MdEmail size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.message}</p>
            </div>
          </div>
        ))}
      </div>
          </div>
    
  );
};