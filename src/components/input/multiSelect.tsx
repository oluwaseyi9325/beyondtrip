import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import Text from "../typography";
import { Controller } from "react-hook-form";
import { PiCaretDown } from "react-icons/pi";

export type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  label: string;
  name: string;
  options: Option[];
  placeholder: string;
  control: any;
  error?: string;
}

const MultiSelect = ({
  label,
  name,
  options = [],
  placeholder = "Select options",
  control,
  error,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selectedValues = Array.isArray(field.value) ? field.value : [];
        const selectedOptions = options.filter(opt => 
          selectedValues.includes(opt.value)
        );

        const handleOptionToggle = (optionValue: string) => {
          const currentValues = Array.isArray(field.value) ? field.value : [];
          const newValues = currentValues.includes(optionValue)
            ? currentValues.filter(val => val !== optionValue)
            : [...currentValues, optionValue];
          
          field.onChange(newValues);
        };

        const displayText = selectedOptions.length > 0 
          ? `${selectedOptions.length} selected`
          : placeholder;

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
                  <span className={selectedOptions.length > 0 ? "text-black-100" : "text-[#667185]"}>
                    {displayText}
                  </span>
                  <PiCaretDown size={16} className="text-[#667185]" />
                </button>

                {isOpen && (
                  <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                      <li
                        key={option.value}
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-white flex items-center gap-2 ${
                          selectedValues.includes(option.value)
                            ? "bg-blue-50 font-medium"
                            : ""
                        }`}
                        onClick={() => handleOptionToggle(option.value)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedValues.includes(option.value)}
                          onChange={() => {}} // Handled by onClick
                          className="w-4 h-4"
                        />
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Show selected items */}
              {selectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedOptions.map((option) => (
                    <span
                      key={option.value}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-white text-xs rounded-full"
                    >
                      {option.label}
                      <button
                        type="button"
                        onClick={() => handleOptionToggle(option.value)}
                        className="text-white hover:text-gray-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

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

export default MultiSelect;