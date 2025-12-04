// import { MdEmail, MdClose } from "react-icons/md";
// import { useState } from "react";
// // import Container from "@/layout/driver/container";

// interface Notification {
//   id: number;
//   message: string;
//   date: string;
//   time: string;
//   icon: React.ReactNode;
// }

// const NotificationItem = ({ notification, onDismiss }: { notification: Notification; onDismiss: (id: number) => void }) => {
//   return (
//     <div className="bg-white border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
//       <div className="flex items-start gap-4">
//         {/* Icon */}
//         <div className="h-10 w-10 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white flex-shrink-0">
//           {notification.icon}
//         </div>

//         {/* Content */}
//         <div className="flex-1">
//           <p className="text-sm text-gray-900 mb-2">{notification.message}</p>
//           <div className="flex items-center gap-2 text-xs text-gray-500">
//             <span>{notification.date}</span>
//             <span>{notification.time}</span>
//           </div>
//         </div>

//         {/* Close Button */}
//         <button
//           onClick={() => onDismiss(notification.id)}
//           className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
//         >
//           <MdClose size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function NotificationList({ data }: any) {
//   console.log(data,"notifucations")
//   const [notifications, setNotifications] = useState<Notification[]>([
//     {
//       id: 1,
//       message: "Your payout request of ₦25,000 has been received. It's being processed.",
//       date: "March 1, 2025",
//       time: "10:05am",
//       icon: <MdEmail size={20} />,
//     },
   
//   ]);

//   const handleDismiss = (id: number) => {
//     setNotifications(notifications.filter((notif) => notif.id !== id));
//   };


//   return (
//     < >
     
//         {/* Notifications List */}
//         <div className="bg-white rounded-lg p-7 borderoverflow-hidden">
//           {notifications.length > 0 ? (
//             notifications.map((notification) => (
//               <NotificationItem
//                 key={notification.id}
//                 notification={notification}
//                 onDismiss={handleDismiss}
//               />
//             ))
//           ) : (
//             <div className="p-12 text-center">
//               <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
//                 <MdEmail size={32} className="text-gray-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
//               <p className="text-sm text-gray-500">You are all caught up! Check back later for updates.</p>
//             </div>
//           )}
//         </div>

      
   
//     </>
//   );
// }

import { MdEmail, MdClose, MdCampaign, MdAttachMoney, MdInfo } from "react-icons/md";
import { useState, useEffect } from "react";
import InboxIcon from "~/assets/icons/inbox";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

const NotificationItem = ({
  notification,
  onDismiss,
}: {
  notification: Notification;
  onDismiss: (id: string) => void;
}) => {
  // Get icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
      case "earnings":
        return <MdAttachMoney size={24} className="text-green-600" />;
      case "general":
        return <InboxIcon />;
      default:
        return <MdInfo size={24} className="text-gray-600" />;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500";
      case "medium":
        return "border-l-4 border-yellow-500";
      case "low":
        return "border-l-4 border-green-500";
      default:
        return "border-l-4 border-gray-300";
    }
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${getPriorityColor(
        notification.priority
      )} ${!notification.isRead ? "bg-blue-50" : ""}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="shrink-0 mt-1">{getIcon(notification.type)}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">
            {notification.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{formatDate(notification.createdAt)}</span>
            <span>•</span>
            <span>{formatTime(notification.createdAt)}</span>
          </div>
          {notification.actionUrl && (
            <a
              href={notification.actionUrl}
              className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View Details →
            </a>
          )}
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
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (data?.notifications) {
      setNotifications(data.notifications);
    }
  }, [data]);

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Notifications List */}
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onDismiss={handleDismiss}
          />
        ))
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="mb-4">
            <MdEmail size={64} className="mx-auto text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No notifications
          </h3>
          <p className="text-gray-600">
            You are all caught up! Check back later for updates.
          </p>
        </div>
      )}
    </div>
  );
}