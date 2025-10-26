import { FaWallet, FaNewspaper, FaUserEdit } from "react-icons/fa";

export const QuickActions = () => {
  const actions = [
    { icon: <FaWallet size={20} />, label: "Withdraw Earnings", color: "text-blue-600" },
    { icon: <FaNewspaper size={20} />, label: "Activate Magazine", color: "text-blue-600" },
    { icon: <FaUserEdit size={20} />, label: "Update Profile", color: "text-blue-600" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 ">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <span className={action.color}>{action.icon}</span>
            <span className="text-sm font-medium text-blue-600">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
