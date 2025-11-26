import Container from "@/layout/driver/container";
import NotificationList from "@/layout/general/notification-item";



export default function NotificationScreen() {

  return (
    <Container title="Notifications" active="Notifications">
      <NotificationList />
    </Container>
  );
}