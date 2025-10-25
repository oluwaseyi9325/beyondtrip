import { Controller, FieldError } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Stack from "../stack";
import Text from "../typography";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  control: any;
  error?: FieldError;
}

const DateInput = ({
  name,
  label,
  placeholder = "Select a date",
  control,
  error,
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
            dateFormat="dd-MM-yyyy"
            className="w-full h-14 bg-white border border-grey-200 rounded-md text-sm text-black placeholder:text-grey-300 outline-none pl-4"
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
