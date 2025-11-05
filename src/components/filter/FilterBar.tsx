import React from "react";
import TableSearchInput from "@/layout/admin/tables/table-search-input";
import SelectSearch from "@/components/input/selectSearch";
import DateInput from "@/components/input/date";
import { Control } from "react-hook-form";

export type FilterForm = {
  date: Date | null;
};

export type FilterConfig = {
  search?:
    | {
        placeholder?: string;
        grow?: boolean; // if true, search takes remaining horizontal space
        className?: string;
      }
    | {
        fields: { placeholder: string; key: string }[];
      }
    | false;
  date?: {
    name?: string;
    placeholder?: string;
    dateFormat?: string;
  } | false;
  status?: {
    placeholder?: string;
    options?: { value: string; label: string }[];
  } | false;
  selects?: { placeholder?: string; options?: { value: string; label: string }[] }[];
  createButton?: { text?: string } | false;
  clear?: { text?: string } | false;
};

type FilterBarProps = {
  cfg: FilterConfig;
  activeTab: number;
  searchValues: Record<number, Record<string, string>>;
  onSearchChange: (tabIndex: number, key: string, value: string) => void;
  control: Control<FilterForm>;
  onClear: () => void;
};

export const FilterBar = React.memo(({ cfg, activeTab, searchValues, onSearchChange, control, onClear }: FilterBarProps) => {
  if (!cfg) return null;

  const renderSearchInputs = () => {
    if (!cfg.search) return null;

    if ("fields" in cfg.search) {
      return cfg.search.fields.map((field) => (
        <TableSearchInput
          key={field.key}
          placeholder={field.placeholder}
          searchTerm={searchValues[activeTab]?.[field.key] || ""}
          onSearchChange={(val) => onSearchChange(activeTab, field.key, val)}
          className="text-sm"
        />
      ));
    }

    const singleSearchExtraClass = `${cfg.search.grow ? "flex-1 min-w-0" : ""} ${cfg.search.className || ""}`.trim();
    return (
      <TableSearchInput
        placeholder={cfg.search.placeholder || "Search"}
        searchTerm={searchValues[activeTab]?.main || ""}
        onSearchChange={(val) => onSearchChange(activeTab, "main", val)}
        className={`text-sm  ${singleSearchExtraClass}`}
      />
    );
  };

  return (
    <div className="flex flex-wrap gap-3 items-center  ">
      {renderSearchInputs()}

      {cfg.date && (
        <DateInput
          name={cfg.date.name || "date"}
          placeholder={cfg.date.placeholder || "Select date"}
          control={control}
          dateFormat={cfg.date.dateFormat || "dd/MM/yyyy"}
          className="w-full"
        />
      )}

      {cfg.status && (
        <SelectSearch
          options={cfg.status.options || []}
          placeholder={cfg.status.placeholder || "Status"}
        />
      )}

      {Array.isArray(cfg.selects) && cfg.selects.map((sel, idx) => (
        <SelectSearch
          key={idx}
          options={sel.options || []}
          placeholder={sel.placeholder || "Select"}
        />
      ))}

      {cfg.createButton && (
        <button className="rounded-[8px] text-base px-4 py-3 cursor-pointer text-white font-medium bg-[#336AEA]">
          {cfg.createButton.text || "Create"}
        </button>
      )}

      {cfg.clear && (
        <button
          onClick={onClear}
          className="text-black hover:underline text-sm whitespace-nowrap"
        >
          {cfg.clear.text || "Clear"}
        </button>
      )}
    </div>
  );
});

export default FilterBar;


