import Container from "@/components/container";
import { ResponsiveImage } from "@/components/image";
import advertiserRegistration from "@/ui/auth/advertiser-registration";

const CompleteadvertiserRegistration = () => {
  return (
    <Container className="h-screen grid md:grid-cols-[1fr_540px] gap-6">
      <advertiserRegistration />
      <ResponsiveImage src="png/login.png" alt="Welcome" size="w-full h-full hidden md:flex" />
    </Container>
  );
};

export default CompleteadvertiserRegistration;
