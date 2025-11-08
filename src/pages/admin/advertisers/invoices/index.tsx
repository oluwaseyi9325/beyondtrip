import Tabs from "@/components/tab"
import Container from "@/layout/admin/container"
import { useMemo, useState } from "react";
import Text from "@/components/typography";
import SelectSearch from "@/components/input/selectSearch";
import TableSearchInput from "@/layout/admin/tables/table-search-input";
import Pagination from "@/components/pagination";
import AdvertiserDrawer from "@/layout/admin/drawers/advertiser";
import AdminAdvertisersInvoicesTable from "@/layout/admin/tables/admin/admin-invoice";
import { InvoiceRow, invoiceMockData } from "@/layout/admin/tables/admin/admin-invoice/data";

const Security = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = 250;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return invoiceMockData.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const [open, setOpen] = useState(false);
  const [selectedAdvertiser, setSelectedAdvertiser] = useState<InvoiceRow | null>(null);

  const handleViewDriver = (driver: InvoiceRow) => {
    setSelectedAdvertiser(driver);
    setOpen(true);
  };

  return (
    <>
      <AdvertiserDrawer
        open={open}
        onClose={() => setOpen(false)}
        advertiser={selectedAdvertiser}
      />
      <Container title="Advertisers - Invoices" active="/admin/advertisers/invoices">
        <div className="py-3 h-full overflow-y-auto scrollbar-none">
          <Text className="text-2xl mb-6" weight="700" color="black">
            Invoice Management
          </Text>
         
         <div className="flex flex-col md:flex-row items-stretch sm:items-center gap-4 mb-9 rounded-lg bg-[#C5E4FF] p-[30px] sm:p-[42px]">
            <TableSearchInput
              placeholder="Search by invoice no, campaign or advertiser"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              className="w-full md:flex-1"
            />
            <SelectSearch
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "inactive" },
              ]}
              placeholder="Status"
              className="w-full md:w-auto"
            />
            <button className="text-black text-left hover:underline text-sm whitespace-nowrap w-full md:w-auto">
              Clear filters
            </button>
          </div>
          {/* Table */}
          <AdminAdvertisersInvoicesTable data={pagedData} onViewDriver={handleViewDriver} />
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