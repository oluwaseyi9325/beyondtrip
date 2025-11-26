import { MdEmail, MdClose } from "react-icons/md";
import { useState } from "react";
// import Container from "@/layout/driver/container";

interface Notification {
  id: number;
  message: string;
  date: string;
  time: string;
  icon: React.ReactNode;
}

const NotificationItem = ({ notification, onDismiss }: { notification: Notification; onDismiss: (id: number) => void }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="h-10 w-10 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white flex-shrink-0">
          {notification.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-sm text-gray-900 mb-2">{notification.message}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{notification.date}</span>
            <span>{notification.time}</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => onDismiss(notification.id)}
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
        >
          <MdClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default function NotificationList({ data }: any) {
  console.log(data,"notifucations")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Your payout request of ₦25,000 has been received. It's being processed.",
      date: "March 1, 2025",
      time: "10:05am",
      icon: <MdEmail size={20} />,
    },
   
  ]);

  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

//   const handleClearAll = () => {
//     setNotifications([]);
//   };

  return (
    < >
     
        {/* Notifications List */}
        <div className="bg-white rounded-lg p-7 borderoverflow-hidden">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onDismiss={handleDismiss}
              />
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <MdEmail size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-sm text-gray-500">You are all caught up! Check back later for updates.</p>
            </div>
          )}
        </div>

      
   
    </>
  );
}