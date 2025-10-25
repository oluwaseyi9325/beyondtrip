import Table from "@/components/table";
import { TApplications } from "../tables/applications";
import { useGetApplications } from "@/services/student.service";
import TableSkeleton from "@/components/skeleton";
import Empty from "../tables/applications/empty";
import { paymentColumns } from "../tables/applications/data";

export interface TPayment {
  name: string;
  description: string;
  course: string;
  amount: string;
  date: string;
}

const PaymentHistory = () => {
  const { data: applications, isLoading } = useGetApplications({
    Page: 1,
    PageSize: 10,
  });

  return (
    <section className="container min-h-[440px]">
      <div className="p-4">
        <p className="header">RECENT REGISTRATIONS</p>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : !applications?.data ||
        applications?.data?.length < 1 ||
        applications?.data?.totalCount < 1 ? (
        <Empty />
      ) : (
        <Table<TApplications>
          columns={paymentColumns}
          data={applications?.data?.items}
        />
      )}
    </section>
  );
};

export default PaymentHistory;
