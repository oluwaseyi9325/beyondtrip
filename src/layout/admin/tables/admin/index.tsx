// import Table from "@/components/table";
// import { driverColumns, driverMockData, DriverRow } from "./data";

// const AdminTable = ({ data }: { data?: DriverRow[] }) => {
//   const rows = data ?? driverMockData;
//   return <Table columns={driverColumns} data={rows} />;
// };

// export default AdminTable;


// Update your AdminTable component
import Table from "@/components/table";
import { driverColumns, driverMockData, DriverRow } from "./data";

interface AdminTableProps {
  data?: DriverRow[];
  onViewDriver: (driver: DriverRow) => void;
}

const AdminTable = ({ data, onViewDriver }: AdminTableProps) => {
  const rows = data ?? driverMockData;
  const columnsWithAction = driverColumns.map(col => {
    if (col.name === "Action") {
      return {
        ...col,
        cell: (row: DriverRow) => (
          <button
            onClick={() => onViewDriver(row)}
            className="whitespace-nowrap inline-flex items-center justify-center border border-[#336AEA] text-[#336AEA] bg-white rounded-full px-6 py-1.5 text-sm font-medium hover:bg-[#2C4C9C]/5 active:bg-[#2C4C9C]/10 focus:outline-none"
          >
            View
          </button>
        )
      };
    }
    return col;
  });

  return <Table columns={columnsWithAction} data={rows} />;
};

export default AdminTable;