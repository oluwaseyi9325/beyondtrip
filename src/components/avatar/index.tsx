import { IoChevronDown } from "react-icons/io5";
import { StaticImage } from "../image";

const Avatar = () => {
  return (
    <div className="h-8 flex items-center gap-2 cursor-pointer">
      <StaticImage src="svg/avatar.svg" alt="Avatar" width={36} height={36} />

      <IoChevronDown size={24} />
    </div>
  );
};

export default Avatar;
