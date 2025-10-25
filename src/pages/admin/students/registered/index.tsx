import Button from "@/components/button";
import Container from "@/layout/admin/container";
import RegisteredTable from "@/layout/admin/tables/registered";
import { StudentStatistics } from "@/lib/content/admin/stats";
import Stats from "@/ui/stats";
import { GoDownload } from "react-icons/go";

const Registered = () => {
  return (
    <Container active="Registered Students">
      <section className="container px-4 py-8 h-full overflow-y-auto scrollbar-none">
        <div className="flex flex-col gap-3">
          <div className="w-full flex items-center justify-between">
            <p className="header">METRICS</p>

            <Button
              hasIcon
              icon={<GoDownload size={20} />}
              size="md"
              className="max-w-25 text-white"
            >
              Export
            </Button>
          </div>

          <Stats data={StudentStatistics} />
        </div>
        <RegisteredTable />
      </section>

     
    </Container>
  );
};

export default Registered;
