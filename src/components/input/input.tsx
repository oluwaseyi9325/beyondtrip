import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Stack from "../stack";
import Text from "../typography";
import clsx from "clsx";

interface Props {
  label: string;
  type?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Input = ({
  label,
  icon,
  type = "text",
  placeholder = "Input",
  register,
  error,
  disabled = false
}: Props) => {
  return (
    <Stack spacing={4}>
      <Text type="span" weight="500">
        {label}
      </Text>

      <div className="w-full h-14 bg-white relative">
        {icon && <div className="absolute top-[18px] left-4">{icon}</div>}

        <input
          disabled={ disabled }
          type={type}
          placeholder={placeholder}
          {...register}
          className={clsx(
            "w-full h-full bg-transparent border border-grey-200 rounded-md outline-none pr-4 text-sm text-black placeholder:text-grey-300",
            icon ? "pl-11" : "pl-4"
          )}
        />
      </div>

      {error && (
        <Text type="span" color="red">
          {error.message}
        </Text>
      )}
    </Stack>
  );
};

export default Input;
