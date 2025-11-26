import Avatar from "@/components/avatar";
import Search from "@/components/input/search";
import { GoBellFill } from "react-icons/go";
import Dropdown from "@/components/dropdown";
import { IoMenu } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
interface Props {
  search?: string;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleSidebar?: () => void;
}

const Topbar = ({ search, handleSearch, onToggleSidebar }: Props) => {
  return (
    // <div className="w-full h-16 px-4 rounded-2xl flex items-center justify-between bg-white mb-4">
    //   <Search search={search} handleChange={handleSearch} />

    //   <div className="flex items-center gap-6">
    //     <div className="w-10 h-10 rounded-full border border-[#F1F1F1] flex items-center justify-center">
    //       <GoBellFill size={20} color="#5E5E5E" />
    //     </div>

    //     <Avatar />
    //   </div>
    // </div>

    <div className="w-full px-4 py-2 rounded-2xl bg-white mb-4 flex items-center justify-between gap-2 overflow-hidden">
    {/* Left side: hamburger + search (search hidden on mobile) */}
    <div className="flex items-center gap-2">
      {/* Hamburger (mobile only) */}
      <button className="md:hidden text-gray-700" onClick={onToggleSidebar}>
        <IoMenu size={24} />
      </button>

      {/* Search input (hidden on mobile) */}
      <div className="hidden md:block">
        <Search search={search} handleChange={handleSearch} />
      </div>
    </div>

    {/* Right side: bell and profile */}
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full border border-[#F1F1F1] flex items-center justify-center">
        <GoBellFill size={20} color="#5E5E5E" />
      </div>
      <Dropdown position="-left-26">
        <Avatar />
        <div className="w-[185px] bg-[#FAFAFA] border-[#EEEEEE] rounded-md shadow-sm py-1">
          <div
            className="flex items-center gap-3 px-4 py-2 cursor-pointer"
            // onClick={logoutUser}
          >
            <MdLogout size={20} />
            <p className="font-medium text-sm text-[#5E5E5E]">Logout</p>
          </div>
        </div>
      </Dropdown>
    </div>
  </div>
  );
};

export default Topbar;
