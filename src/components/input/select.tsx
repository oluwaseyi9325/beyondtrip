import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import Text from "../typography";
import { Controller } from "react-hook-form";
import { PiCaretDown } from "react-icons/pi";

export type Option = {
  label: string;
  value: string;
};

interface CustomSelectProps {
  label: string;
  name: string;
  options: Option[];
  placeholder: string;
  control: any;
  error?: string;
}

const Select = ({
  label,
  name,
  options = [],
  placeholder = "Select an option",
  control,
  error,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selectedOption = options?.find(
          (opt) => opt.value === field.value
        );

        return (
          <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <div className="w-full flex flex-col gap-1.5">
              <Text type="span" weight="500">
                {label}
              </Text>

              <div className="relative w-full">
                <button
                  type="button"
                  className="w-full h-14 cursor-pointer rounded-md px-4 border border-grey-200 outline-none focus:border-blue-100 text-sm text-black-100 flex items-center justify-between"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  {selectedOption?.label || (
                    <span className="text-[#667185]">{placeholder}</span>
                  )}
                  <PiCaretDown size={16} className="text-[#667185]" />
                </button>

                {isOpen && (
                  <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                      <li
                        key={option.value}
                        className={`px-4 py-2 cursor-pointer hover:bg-[#336AEA] hover:text-white ${
                          option.value === field.value
                            ? "bg-blue-50 font-medium"
                            : ""
                        }`}
                        onClick={() => {
                          field.onChange(option.value);
                          setIsOpen(false);
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {error && (
                <Text type="span" color="red">
                  {error}
                </Text>
              )}
            </div>
          </ClickAwayListener>
        );
      }}
    />
  );
};

export default Select;
