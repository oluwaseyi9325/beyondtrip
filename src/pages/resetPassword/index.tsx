import Container from "@/components/container";
import { ResponsiveImage } from "@/components/image";
import Reset from "@/ui/auth/reset";
// import Reset from "@/ui/auth/forgot";

const ResetPassword = () => {
  return (
    <Container className="h-screen grid md:grid-cols-[1fr_540px] gap-6">
      <Reset />
      <ResponsiveImage src="png/reset.png" alt="Welcome" size="w-full h-full hidden md:flex" />
    </Container>
  );
};

export default ResetPassword;
