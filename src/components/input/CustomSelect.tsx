import clsx from "clsx";
import { IoChevronDown } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";

interface Props<T = any> {
  value?: any;
  handleChange?: (value: any) => void;
  data?: T[]; // Array of any type
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  labelKey?: keyof T | ((item: T) => string); // Property key or function to get label
  valueKey?: keyof T | ((item: T) => any); // Property key or function to get value
  includeAll?: boolean; // Whether to include "All" option
  allLabel?: string; // Custom label for "All" option
  allValue?: any; // Custom value for "All" option (default: "")
}

const CustomSelect = <T = any,>({ 
  value, 
  handleChange, 
  data = [], 
  placeholder = "Select an option",
  className,
  disabled = false,
  labelKey,
  valueKey,
  includeAll = false,
  allLabel = "All",
  allValue = ""
}: Props<T>) => {
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

  // Helper function to get label from item
  const getLabel = (item: T): string => {
    if (!labelKey) {
      // If no labelKey provided, convert item to string
      return String(item);
    }
    
    if (typeof labelKey === 'function') {
      return labelKey(item);
    }
    
    return String(item[labelKey]);
  };

  // Helper function to get value from item
  const getValue = (item: T): any => {
    if (!valueKey) {
      // If no valueKey provided, use the item itself
      return item;
    }
    
    if (typeof valueKey === 'function') {
      return valueKey(item);
    }
    
    return item[valueKey];
  };

  // Create options array
  const options = [
    ...(includeAll ? [{ label: allLabel, value: allValue, isAll: true }] : []),
    ...data.map(item => ({
      label: getLabel(item),
      value: getValue(item),
      originalItem: item,
      isAll: false
    }))
  ];

  const handleOptionClick = (optionValue: any) => {
    if (handleChange) {
      handleChange(optionValue);
    }
    setIsOpen(false);
  };

  // Find selected option for display
  const selectedOption = options.find(option => {
    if (option.isAll && (value === allValue || value === "" || value === null || value === undefined)) {
      return true;
    }
    return option.value === value;
  });

  const displayLabel = selectedOption ? selectedOption.label : placeholder;

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
          {displayLabel}
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
            options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleOptionClick(option.value)}
                className={clsx(
                  "w-full px-4 py-2 text-sm text-left hover:bg-gray-50",
                  "border-b border-gray-100 last:border-b-0",
                  "transition-colors duration-150 focus:outline-none focus:bg-gray-50",
                  ((option.isAll && (value === allValue || value === "" || value === null || value === undefined)) || 
                   (!option.isAll && value === option.value)) && "bg-blue-50 text-[#131364] font-medium"
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

export default CustomSelect;