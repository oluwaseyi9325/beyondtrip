import Container from "@/layout/driver/container";
import NotificationList from "@/layout/general/notification-item";
import { useDriverNotifications } from "@/services/notification.service";



export default function NotificationScreen() {
  const {data}=useDriverNotifications()
  return (
<<<<<<< HEAD
    <Container title="Notifications" active="Notifications" >
      <NotificationList data={data} />
=======
    <Container title="Notifications" active="Notifications">
      <NotificationList />
>>>>>>> e282115651066a45c71bf6952c90b496400cf9ea
    </Container>
  );
}