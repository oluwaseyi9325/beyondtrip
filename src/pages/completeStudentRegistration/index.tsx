import Container from "@/components/container";
import { ResponsiveImage } from "@/components/image";
import StudentRegistration from "@/ui/auth/student-registration";

const CompleteStudentRegistration = () => {
  return (
    <Container className="h-screen grid md:grid-cols-[1fr_540px] gap-6">
      <StudentRegistration />
      <ResponsiveImage src="png/login.png" alt="Welcome" size="w-full h-full hidden md:flex" />
    </Container>
  );
};

export default CompleteStudentRegistration;
