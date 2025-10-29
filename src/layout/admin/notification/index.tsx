// notification.tsx
import { MdEmail, MdArrowForward } from "react-icons/md";

interface NotificationProps {
  notifications?: Array<{
    id: number;
    message: string;
    date: string;
    time: string;
  }>;
}

export const AdminNotificationCard = ({ notifications }: NotificationProps) => {
  const defaultNotifications = [
    {
      id: 1,
      message: "New driver registration request from John Doe is awaiting approval",
      date: "July 28, 2025",
      time: "10:03am"
    },
    {
      id: 2,
      message: "New driver registration request from John Doe is awaiting approval",
      date: "July 28, 2025",
      time: "10:03am"
    },
    {
      id: 3,
      message: "New driver registration request from John Doe is awaiting approval",
      date: "July 28, 2025",
      time: "10:03am"
    }
  ];

  const notifList = notifications || defaultNotifications;

  return (
    <div className="bg-white  border border-gray-200 rounded-2xl p-6 ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        <button className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1">
          View All
          <MdArrowForward size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {notifList.map((notif) => (
          <div key={notif.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="h-10 w-10 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white flex-shrink-0">
              <MdEmail size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-black">{notif.message}</p>
            </div>
            <div className="text-right text-xs text-gray-500">
              <p>{notif.date}</p>
              <p>{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
          </div>
    
  );
};