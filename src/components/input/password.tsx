import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Stack from "../stack";
import Text from "../typography";
import clsx from "clsx";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface Props {
  label: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  icon?: React.ReactNode;
}

const Password = ({ label, icon, placeholder, register, error }: Props) => {
  const [view, setView] = useState(false);

  return (
    <Stack spacing={4}>
      <Text type="span" weight="500">
        {label}
      </Text>

      <div className="w-full h-14 bg-white relative">
        {icon && <div className="absolute top-[18px] left-4">{icon}</div>}

        <input
          type={view ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          className={clsx(
            "w-full h-full bg-transparent border border-grey-200 rounded-md outline-none pr-11 text-sm text-black placeholder:text-grey-300",
            icon ? "pl-11" : "pl-4"
          )}
        />

        <div
          role="button"
          className="absolute top-[18px] right-4 cursor-pointer text-[#121363]"
          onClick={() => setView(!view)}
        >
          {view ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
        </div>
      </div>

      {error && (
        <Text type="span" color="red">
          {error.message}
        </Text>
      )}
    </Stack>
  );
};

export default Password;
