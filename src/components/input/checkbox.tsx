import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
}

const Checkbox = <T extends FieldValues>({
  name,
  label,
  control,
}: Props<T>) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            className="w-5 h-5 bg-[#F2F2F2] border border-[#F2F2F2] cursor-pointer"
            {...field}
          />
        )}
      />

      <label htmlFor={name} className="text-sm text-black-100 leading-none">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
