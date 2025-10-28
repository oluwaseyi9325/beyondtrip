// import Button from '@/components/button';
import Container from '@/layout/advertiser/container';
import EarningTable from '@/layout/driver/tables/earnings';
import { earningData } from '@/data/earningData';
import InvoiceTable from '@/layout/advertiser/tables/invoice';
import { invoiceData } from '@/data/invoice';


function Earnings() {


    return (
        <Container active="Invoices">
            <section className="w-full px-4 py-6 flex flex-col gap-6">
                <div className="overflow-hidden">
                    {/* <EarningTable data={earningData} /> */}
                    <InvoiceTable data={invoiceData} />
                </div>
            </section>
        </Container>
    );
}

export default Earnings;