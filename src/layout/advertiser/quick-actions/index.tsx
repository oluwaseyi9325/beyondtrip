import { FaChartBar, FaFileDownload } from "react-icons/fa";
import CreateCampaignIcon from "~/assets/icons/createCampaign";
import InvoiceIcon from "~/assets/icons/invoice";
import DownloadReceiptIcon from "~/assets/icons/download";
import { useRouter } from "next/navigation";


export const QuickActions = () => {

    const router = useRouter();

  const actions = [
    {
      icon: <CreateCampaignIcon />,
      label: "Create New Campaign",
      color: "text-blue-600",
      onClick: () => router.push("/advertiser/campaigns"),
    },
    {
      icon: <InvoiceIcon />,
      label: "Manage Invoice",
      color: "text-blue-600",
      onClick: () => router.push("/driver/invoices"),
    },
    {
      icon: <DownloadReceiptIcon />,
      label: "Download Report",
      color: "text-blue-600",
      onClick: () => console.log("Navigating to Download Report"),
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex items-center cursor-pointer justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <span className={action.color}>{action.icon}</span>
            <span className="text-sm font-medium text-blue-600">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
