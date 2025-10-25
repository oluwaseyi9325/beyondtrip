import { useState, useMemo } from "react";

export interface SelectFilter {
  key: string;
  label: string;
  getValue: (item: any) => string;
  defaultValue?: string;
}

export interface UseSelectFiltersProps<T> {
  data: T[];
  filters: SelectFilter[];
}

export const useSelectFilters = <T,>({ data, filters }: UseSelectFiltersProps<T>) => {
  // Initialize filter states - all start with "All"
  const initialState = filters.reduce((acc, filter) => {
    acc[filter.key] = filter.defaultValue || "All";
    return acc;
  }, {} as Record<string, string>);

  const [selectedFilters, setSelectedFilters] = useState(initialState);

  // Generate options for each filter
  const filterOptions = useMemo(() => {
    const options: Record<string, string[]> = {};

    filters.forEach((filter) => {
      const uniqueValues = [
        ...new Set(
          data
            ?.map((item) => filter.getValue(item))
            .filter((value) => value && value.trim() !== "")
        ),
      ].sort(); // Sort alphabetically
      
      // Always put "All" at the top
      options[filter.key] = ["All", ...uniqueValues];
    });

    return options;
  }, [data, filters]);

  // Apply all filters to the data
  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      return filters.every((filter) => {
        const selectedValue = selectedFilters[filter.key];
        if (selectedValue === "All") return true;
        
        const itemValue = filter.getValue(item);
        return itemValue === selectedValue;
      });
    });
  }, [data, selectedFilters, filters]);

  // Update a specific filter
  const updateFilter = (filterKey: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedFilters(initialState);
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(selectedFilters).some(value => value !== "All");

  return {
    filteredData,
    selectedFilters,
    filterOptions,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
};