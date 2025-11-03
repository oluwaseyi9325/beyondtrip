import Tabs from "@/components/tab"
import Container from "@/layout/admin/container"
import { useMemo, useState } from "react";
import BasicDetailsContent from "@/layout/general/profile-details";
import BankDetailsContent from "@/layout/driver/profile/bank-details-content";
import Ratings from "@/layout/driver/profile/ratings";
import Text from "@/components/typography";
import SelectSearch from "@/components/input/selectSearch";
import AdminTable from "@/layout/admin/tables/admin";
import { driverMockData } from "@/layout/admin/tables/admin/data";
import TableSearchInput from "@/layout/admin/tables/table-search-input";
import Pagination from "@/components/pagination";
const Security = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = 250;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return driverMockData.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);
  return (
    <>
      <Container title="Drivers - Overview " active="/admin/drivers/overview"  >
        <div className="py-3 h-full  overflow-y-auto scrollbar-none ">
          <Text className="text-2xl mb-6 " weight="700" color="black">
            Drivers Management
          </Text>

          <div className="flex items-center gap-4 rounded-[8px] bg-[#C5E4FF] p-[30px] sm:p-[42px]  ">
            <TableSearchInput
              placeholder="Search by name, ID, location"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onClearSearch={() => setSearchTerm("")}
            />
            <SelectSearch
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "inactive" },
              ]}
              placeholder="Status"
            />
            <button
              className="text-black hover:underline text-sm whitespace-nowrap"
            >
              Clear filters
            </button>
          </div>
          {/* Table */}
          <AdminTable data={pagedData} />
          {/* pagination */}
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setCurrentPage(p)}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </Container>


    </>
  )
}

export default Security