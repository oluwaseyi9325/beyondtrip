import { Controller, FieldError } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Stack from "../stack";
import Text from "../typography";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  control: any;
  error?: FieldError;
  className?: string;
  dateFormat?: string;
}

const DateInput = ({
  name,
  label,
  placeholder = "Select a date",
  control,
  error,
  className,
  dateFormat = "dd/MM/yyyy",
}: Props) => {
  return (
    <Stack spacing={4}>
      <Text type="span" weight="500">
        {label}
      </Text>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            id={name}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat={dateFormat}
            className={`w-full h-12 bg-white border border-[#444444] rounded-[6px] text-sm text-black placeholder:text-[#444444] outline-none px-4 ${className ?? ''}`}
            placeholderText={placeholder}
          />
        )}
      />

      {error && (
        <Text type="span" color="red">
          {error.message}
        </Text>
      )}
    </Stack>
  );
};

export default DateInput;
