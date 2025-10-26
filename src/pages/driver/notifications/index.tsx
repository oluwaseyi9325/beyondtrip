import Container from "@/layout/driver/container";
import NotificationList from "@/layout/general/notification-item";



export default function NotificationScreen() {

  return (
    <Container active="Notifications" >
      <NotificationList />
    </Container>
  );
}