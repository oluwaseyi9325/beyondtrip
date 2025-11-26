import Container from '@/layout/advertiser/container';
import InvoiceTable from '@/layout/advertiser/tables/invoice';
import { invoiceData } from '@/data/invoice';
import { useState, useMemo } from 'react';
import Pagination from '@/components/pagination';

function Earnings() {
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage=10
  const totalItems = 250;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return invoiceData.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);


    return (
      <Container title="Invoices" active="Invoices">
        <section className="w-full py-6 flex flex-col gap-6">
          <div className="overflow-hidden">
            {/* <EarningTable data={earningData} /> */}
            <InvoiceTable data={invoiceData} />
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
        </section>
      </Container>
    );
}

export default Earnings;