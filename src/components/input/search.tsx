import clsx from "clsx";
import { IoSearch } from "react-icons/io5";

interface Props {
  search?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ search, handleChange }: Props) => {
  return (
    <div
      className={clsx(
        "w-[375px] h-10 flex items-center rounded-[6px] relative",
        "border border-[#131364]"
      )}
    >
      <IoSearch size={20} className="absolute left-2 text-[#CBCBCB]" />

      <input
        className={clsx(
          "w-full h-full pl-8 pr-4 outline-none border-none",
          "placeholder:text-[#CDCDCD] text-black text-sm"
        )}
        placeholder="Search"
        value={search}
        onChange={handleChange}
        type="search"
      />
    </div>
  );
};

export default Search;
