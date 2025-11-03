import Table from "@/components/table";
import { driverColumns, driverMockData, DriverRow } from "./data";

const AdminTable = ({ data }: { data?: DriverRow[] }) => {
  const rows = data ?? driverMockData;
  return <Table columns={driverColumns} data={rows} />;
};

export default AdminTable;
