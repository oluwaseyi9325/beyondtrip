import clsx from "clsx";
import { IoChevronDown } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  value?: string;
  handleChange?: (value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const SelectSearch = ({ 
  value, 
  handleChange, 
  options = [], 
  placeholder = "Select an option",
  className,
  disabled = false
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    if (handleChange) {
      handleChange(optionValue);
    }
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div 
      ref={selectRef}
      className={clsx(
        "h-10 relative",
        className
      )}
    >
      {/* Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clsx(
          "w-full h-full flex items-center justify-between px-4 rounded-[6px]",
          "border border-[#131364] bg-white",
          "text-sm text-left outline-none transition-colors duration-200",
          disabled 
            ? "opacity-50 cursor-not-allowed bg-gray-50" 
            : "cursor-pointer hover:border-[#1a1a7a]",
          selectedOption ? "text-black" : "text-[#CDCDCD]"
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IoChevronDown 
          size={16} 
          className={clsx(
            "text-[#CBCBCB] transition-transform duration-200 flex-shrink-0 ml-2",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && !disabled && (
        <div className={clsx(
          "absolute top-full left-0 w-full mt-1 z-50",
          "bg-white border border-[#131364] rounded-[6px]",
          "shadow-lg max-h-60 overflow-y-auto"
        )}>
          {options.length > 0 ? (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionClick(option.value)}
                className={clsx(
                  "w-full px-4 py-2 text-sm text-left hover:bg-gray-50",
                  "border-b border-gray-100 last:border-b-0",
                  "transition-colors duration-150 focus:outline-none focus:bg-gray-50",
                  value === option.value && "bg-blue-50 text-[#131364] font-medium"
                )}
              >
                <span className="truncate block">{option.label}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-[#CDCDCD]">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectSearch;