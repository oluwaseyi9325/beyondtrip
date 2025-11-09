
import React from "react";
import SelectSearch from "@/components/input/selectSearch";
import DateInput from "@/components/input/date";
import { useForm } from "react-hook-form";
import Table from "@/components/table";
import {  mockHistory, } from "./data";
import Pagination from "@/components/pagination";
import { invoiceMockData } from "./data";
import { InvoiceRow } from "./data";
import { invoiceColumns } from "./data";

type FilterForm = { historyDate: Date | null };

function HistoryTab() {

    const { control } = useForm<FilterForm>({ defaultValues: { historyDate: null } });

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 4;

    const totalPages = Math.ceil(mockHistory.length / itemsPerPage);

    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const currentComments = mockHistory.slice(startIndex, endIndex);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-[#F7F7F7] max-w-[400px] sm:max-w-[600px]  overflow-x-auto ">
          
            <div>
                <div  className="flex flex-wrap space-y-2 items-center justify-between " >
                <h2 className="text-small font-semibold " >Invoice History</h2>
                <div className="flex items-center gap-3 mb-3">
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
              

                <div className="mt-4">
                    <div className="overflow-x-auto">
                        <div className="  ">
                            <Table<InvoiceRow> columns={invoiceColumns} data={invoiceMockData} />
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
            </div>
        </div>
    );
}

export default HistoryTab;



