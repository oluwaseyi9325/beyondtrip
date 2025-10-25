import Button from "@/components/button";
import { GoPlus } from "react-icons/go";

const Announcement = () => {
  return (
    <section className="container w-full min-h-[440px] p-4 flex flex-col">
      <div className="">
        <p className="header">ANNOUNCEMENT</p>
      </div>

      <div className="flex h-full items-center justify-center">
        <div className="space-y-8">
          <p className="font-[500] text-[#7E7E7EEF]">
            There’s nothing here yet 😌
          </p>

          <Button
            size="md"
            className="text-white text-sm font-[600]"
            hasIcon
            icon={<GoPlus size={20} />}
          >
            Create Announcement
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Announcement;
