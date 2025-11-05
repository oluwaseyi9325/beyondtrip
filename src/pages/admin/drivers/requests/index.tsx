import React from "react";
import Tabs from "@/components/tab";
import Container from "@/layout/admin/container";
import BankRequestTable from "@/layout/driver/general/request/bank-request-table";
import PayoutRequestTable from "@/layout/driver/general/request/payout-request-table";
import HistoryRequestTable from "@/layout/driver/general/request/history-request-table";
// (inputs are handled inside the reusable FilterBar)
import { useForm } from "react-hook-form";
import FilterBar, { FilterConfig, FilterForm } from "@/components/filter/FilterBar";

const Security = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  // Store search values per tab (for both single and multi-field search)
  const [searchValues, setSearchValues] = React.useState<Record<number, Record<string, string>>>({
    0: { main: "" },
    1: { locationName: "", address: "" },
    2: { main: "" },
    3: { main: "" },
  });

  //  React Hook Form for date filters
  const { control, setValue } = useForm<FilterForm>({
    defaultValues: { date: null },
  });

  // Tabs and configuration data
  const tabsData = React.useMemo(
    () => [
      { title: "Bank Detail Update", content: <BankRequestTable /> },
      { title: "Payouts", content: <PayoutRequestTable /> },
      { title: "History of Payouts", content: <HistoryRequestTable /> },
    ],
    []
  );

  const headerTabs = React.useMemo(() => tabsData.map((t) => ({ title: t.title })), [tabsData]);

  const filtersByTab: Record<number, FilterConfig> = React.useMemo(() => ({
    0: {
      search: { placeholder: "Enter Driver Name", fullWidth: true },
      date: { name: "date", placeholder: "DD/MM/YYYY", dateFormat: "dd/MM/yyyy" },
      status: {
        placeholder: "Status",
        options: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ],
      },
      clear: { text: "Clear filters" },
    },
    1: {
      search: { placeholder: "Search driver’s name", fullWidth: true },
      selects: [
        {
          placeholder: "Status",
          options: [
            { value: "active", label: "Active" },
            { value: "closed", label: "Closed" },
          ],
        },
        {
          placeholder: "Select Format",
          options: [
            { value: "today", label: "Today" },
            { value: "this_week", label: "This Week" },
          ],
        },
      ],
      date: { name: "date", placeholder: "DD/MM/YYYY", dateFormat: "dd/MM/yyyy" },
      clear: { text: "Clear Filter" },
      createButton: [
        { text: "Download List" },
        { text: "Marked As Completed" },
      ],

    },
    2: {
      search: { placeholder: "Search driver’s name", fullWidth: true },
      date: { name: "distDate", placeholder: "YYYY-MM-DD", dateFormat: "yyyy-MM-dd" },
      clear: { text: "Clear Filters" },
    },
  }), []);

  //  Update search field value for each tab safely
  const handleSearchChange = (tabIndex: number, key: string, value: string) => {
    setSearchValues((prev) => ({
      ...prev,
      [tabIndex]: {
        ...prev[tabIndex],
        [key]: value,
      },
    }));
  };

  const handleClear = React.useCallback(() => {
    setSearchValues((prev) => ({
      ...prev,
      [activeTab]: Object.fromEntries(
        Object.keys(prev[activeTab] || {}).map((k) => [k, ""])
      ),
    }));
    setValue("date", null);
  }, [activeTab, setValue]);

  return (
    <Container title="Drivers - Requests" active="/admin/drivers/requests">
      <div className="py-6 h-full overflow-y-auto scrollbar-none">
        <div className="flex flex-col mb-9 rounded-[8px] bg-[#C5E4FF] p-[30px] sm:p-[42px]">
          <h1 className="text-2xl font-bold text-black">Manage Requests </h1>

          <div className="mt-6">
            <Tabs
              tabs={headerTabs}
              defaultTab={0}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* FilterBar with stable identity and props */}
          <FilterBar
            cfg={filtersByTab[activeTab]}
            activeTab={activeTab}
            searchValues={searchValues}
            onSearchChange={handleSearchChange}
            control={control}
            onClear={handleClear}
          />
        </div>

        {/* Tab Content */}
        <div>{tabsData[activeTab]?.content}</div>
      </div>
    </Container>
  );
};

export default Security;
