
import React from "react";
import SelectSearch from "@/components/input/selectSearch";
import DateInput from "@/components/input/date";
import { useForm } from "react-hook-form";
import Table from "@/components/table";
import { columns as historyColumns, mockHistory, HistoryRow } from "./data";
import Pagination from "@/components/pagination";



type FilterForm = { historyDate: Date | null };

interface ViewTabProps {
    setActiveTab: (index: number) => void;
}
function ViewTab({ setActiveTab }: ViewTabProps) {

    const { control } = useForm<FilterForm>({ defaultValues: { historyDate: null } });

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 4;

    const totalPages = Math.ceil(mockHistory.length / itemsPerPage);

    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const currentHistory = mockHistory.slice(startIndex, endIndex);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-[#F7F7F7] max-w-[300px] sm:max-w-[600px]  overflow-x-auto ">
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-md p-4">
                    <p className="text-sm text-[#00000080] font-semibold mb-4">Company Details</p>
                    <div className="text-xs space-y-4">
                        <div>
                            <p className="text-[#00000080] ">Email Address:</p>
                            <p>abc@example.com</p>
                        </div>
                        <div>
                            <p className="text-[#00000080] "   >Phone No:</p>
                            <p>08034567823</p>
                        </div>
                        <div>
                            <p className="text-[#00000080] " >Address:</p>
                            <p>11, Allen Avenue, Ikeja, Lagos</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="bg-white rounded-md p-4 space-y-4" >
                        <p className="text-sm text-[#00000080] font-semibold mb-4">AD Campaign Type</p>
                        <p className="text-xs font-medium ">Magazine</p>
                    </div>
                    <div className="bg-white rounded-md p-4 ">
                        <p className="text-sm font-semibold mb-4 text-[#00000080]">Pricing Plan</p>
                        <p className="text-xs font-medium ">Essentials</p>
                        <p className="text-xs font-semibold text-[#00000080]">₦4,000/edition</p>

                    </div>
                </div>

                <div className="bg-white rounded-md p-4">
                    <p className="text-sm font-semibold text-[#00000080] mb-3">Analytics</p>
                    <div className="flex flex-col items-start space-y-2 mb-3">
                        <p className="text-xs text-[#444444]  ">(Active Campaigns – 4)</p>
                        <button className="rounded-full w-full my-3 border border-[#008000] text-[#008000] bg-white px-4 py-2 text-xs">Campaign 1</button>
                    </div>
                    <div className="border p-3 border-gray-100 rounded-[5px]  " >
                        <div className="text-xs text-[#5E5E5E] ">Total impressions</div>
                        <div className="mt-7 text-sm font-semibold">3,200</div>

                    </div>
                </div>

                <div className="bg-white rounded-md p-4">
                    <p className="text-sm font-semibold text-[#00000080] ">Pending Invoices</p>
                    <button onClick={() => setActiveTab(1)} className="text-sm cursor-pointer text-[#336AEA] font-semibold mb-10">View invoice history </button>

                    <div className="space-y-2 text-xs">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="flex border border-gray-100 p-2 rounded-[5px] items-center justify-between">
                                <span>INV-2025-00{n}</span>
                                <span>₦50,000</span>
                                <span className="inline-flex items-center justify-center rounded-full px-3 py-0.5 border border-orange-400 text-orange-500">Pending</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="my-6 ">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-3">
                    <p className="text-sm font-semibold mb-3">Campaign History</p>
                    <div className="flex gap-3  " >
                        <SelectSearch
                            options={[
                                { value: "all", label: "Status" },
                                { value: "active", label: "Active" },
                                { value: "paused", label: "Paused" },
                                { value: "completed", label: "Completed" },
                            ]}
                            placeholder="Status"
                        />
                        <DateInput name="historyDate" placeholder="DD/MM/YYYY" control={control} dateFormat="dd/MM/yyyy" />
                        <button className="text-sm">Clear filters</button>
                    </div>

                </div>

                <div className="">
                    <div className="overflow-x-auto  mt-4">
                        <div className=" min-w-[700px] ">
                            <Table<HistoryRow> columns={historyColumns} data={mockHistory} />
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={mockHistory.length}
                itemsPerPage={itemsPerPage}
            />
            <div className="p-6 flex justify-center items-center gap-3">
                <button className="px-6 py-3 max-w-[260px] w-full rounded-lg bg-[#336AEA] text-white font-medium">Cancel</button>
                <button className="px-6 py-3 rounded-lg max-w-[260px] w-full border border-[#FF0033] text-[#FF0033] font-medium">Suspend</button>
            </div>
        </div>
    );
}

export default ViewTab;

