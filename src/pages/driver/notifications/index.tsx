import Container from "@/layout/driver/container";
import NotificationList from "@/layout/general/notification-item";
import { useDriverNotifications } from "@/services/notification.service";



export default function NotificationScreen() {
  const {data}=useDriverNotifications()
  return (

    <Container title="Notifications" active="Notifications" >
      <NotificationList data={data} />
    </Container>
  );
}