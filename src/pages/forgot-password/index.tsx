import Container from "@/components/container";
import { ResponsiveImage } from "@/components/image";
import Forgot from "@/ui/auth/forgot";

const ForgotPassword = () => {
  return (
    <Container className="h-screen grid md:grid-cols-[1fr_540px] gap-6">
      <Forgot />
      <ResponsiveImage src="png/reset.png" alt="Welcome" size="w-full h-full hidden md:flex" />
    </Container>
  );
};

export default ForgotPassword;
