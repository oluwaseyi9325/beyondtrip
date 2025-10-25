import Button from "@/components/button";
import { GoPlus } from "react-icons/go";

const Empty = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className="flex h-full items-center justify-center overflow-y-auto scrollbar-none">
      <div className="space-y-8">
        <p className="font-[500] text-[#7E7E7EEF]">
          There’s nothing here yet 😌
        </p>

        <Button
          size="md"
          className="max-w-[160px] text-white text-sm font-[600] mx-auto"
          hasIcon
          icon={<GoPlus size={20} />}
          handleClick={handleClick}
        >
          Create Cohort
        </Button>
      </div>
    </div>
  );
};

export default Empty;
