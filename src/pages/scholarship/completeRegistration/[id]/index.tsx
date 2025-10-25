import Container from "@/components/container";
import { ResponsiveImage } from "@/components/image";
import ScholarshipRegistration from "@/ui/auth/scholarship-registration";
import { useRouter } from "next/router";

const CompleteRegistration = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Container className="h-screen grid md:grid-cols-[1fr_540px] gap-6">
      {/* <Registration /> */}
      <ScholarshipRegistration id={id} />
      <ResponsiveImage
        src="png/login.png"
        alt="Welcome"
        size="w-full h-full hidden md:flex"
      />
    </Container>
  );
};

export default CompleteRegistration;
