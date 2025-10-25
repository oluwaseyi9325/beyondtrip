import Table from "@/components/table";
import { adminColumns } from "./data";
// import Pagination from "@/components/pagination";

export interface TAdmin {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  date: string;
  accountStatus: string;
}

const AdminTable = ({ data }: { data: TAdmin[] }) => {
  return (
    <>
      <Table<TAdmin> columns={adminColumns} data={data} />
      {/* <Pagination /> */}
    </>
  );
};

export default AdminTable;
