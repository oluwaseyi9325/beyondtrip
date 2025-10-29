
import Table from "@/components/table";
import { useCohortColumns } from "./data";

export interface TCohort {
  id: string;
  note: string;
  startDate: string;
  endDate: string;
  cohort: number; // Add this if not already there
}

const CohortTable = ({ data, onEdit }: { data: TCohort[]; onEdit: (cohort: TCohort) => void }) => {
  const columns = useCohortColumns({
    handleClick: onEdit, // Pass onEdit directly
    total: data?.length,
  });

  return <Table<TCohort> columns={columns} data={data} />;
};

export default CohortTable;