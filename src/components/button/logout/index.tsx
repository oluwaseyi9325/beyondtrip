import { logoutUser } from "@/store/useAuthStore";
import Button from "..";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  return (
    <Button
      className="w-full !bg-[#212272] text-[#FF0000] h-14 rounded-lg flex items-center justify-center gap-2"
      handleClick={logoutUser}
    >
      <p className="font-[700]">Log out</p>
      <MdLogout size={20} />
    </Button>
  );
};

export default LogoutButton;
