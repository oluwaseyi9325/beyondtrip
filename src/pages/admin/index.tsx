import Container from "@/layout/admin/container";
import Text from "@/components/typography";

const Dashboard = () => {
  return (
    <>
      <Container>
        <section className="w-full px-4 py-6 flex flex-col gap-8 ">
            <div className="flex flex-col gap-2">
              <Text className="text-xl  " weight="800" color="black">
                Hello, Emmanuel Vicksons
              </Text>

              <Text className="text-sm  " weight="500" color="grey">
                Here’s an overview of today’s activities and key updates{" "}
              </Text>
            </div>

            <div>

              Hello
            </div>
        </section>
      </Container>
    </>
  );
};

export default Dashboard;
