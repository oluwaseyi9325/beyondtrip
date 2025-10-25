import Container from "@/components/container";
import { ResponsiveImage } from "@/components/image";
import Registration from "@/ui/auth/registration";

const CompleteRegistration = () => {
  return (
    <Container className="h-screen grid md:grid-cols-[1fr_540px] gap-6">
      <Registration />
      <ResponsiveImage
        src="png/login.png"
        alt="Welcome"
        size="w-full h-full hidden md:flex"
      />
    </Container>
  );
};

export default CompleteRegistration;
